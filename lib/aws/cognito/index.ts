'use server'

import {
    CognitoIdentityProviderClient,
    GetUserCommand,
    GetUserCommandInput,
    InitiateAuthCommand,
    InitiateAuthCommandInput,
    SignUpCommand,
    SignUpCommandInput
} from '@aws-sdk/client-cognito-identity-provider';
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { congitoConfig } from '../config';
import { cookies } from 'next/headers';
import { User } from '@/types/index.types';

const cognitoClient = new CognitoIdentityProviderClient({
    region: congitoConfig.region,
});

/**
 * Retrieves a user from AWS Cognito based on the provided user ID.
 * 
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise<User | null>} The user object or null if not found.
 * @throws Will throw an error if fetching the user fails.
 */
export async function getCognitoUser(userId: string): Promise<User | null> {
    const session = (await cookies()).get('aws-auth-session');

    if (!session) {
        return null;
    }
    
    const params: GetUserCommandInput = {
        AccessToken: session.value,
    }

    try {
        const command = new GetUserCommand(params);
        const user = await cognitoClient.send(command);

        if (!user) {
            return null;
        }

        console.log({
            file: 'lib/aws/config.ts',
            output: user.UserAttributes,
        });

        return {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            cart: [],
            phone: '',
            receiveUpdates: false,
            profileImgSrc: '',
            address: '',
        }
    } catch (error) {
        console.error('Failed fetching user', error);
        throw error;
    }
}

/**
 * Signs in a user with AWS Cognito using their email and password.
 * 
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @param {boolean} rememberMe - Whether to remember the user for future sessions.
 * @returns {Promise<boolean>} True if sign-in was successful, otherwise false.
 * @throws Will throw an error if sign-in fails.
 */
export async function signInWithCognito(
    email: string,
    password: string,
    rememberMe: boolean
): Promise<boolean> {
    const params: InitiateAuthCommandInput = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: congitoConfig.clientId,
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
        }
    };

    try {
        const command = new InitiateAuthCommand(params);       
        const { AuthenticationResult } = await cognitoClient.send(command);

        if (AuthenticationResult) {
            const authCookie = await cookies();

            if (AuthenticationResult.IdToken) {
                authCookie.set(
                    'aws-auth-session',
                    AuthenticationResult.IdToken,
                    {
                        path: '/',
                        httpOnly: true,
                        sameSite: 'strict',
                        secure: true,
                        expires: rememberMe ? new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) : undefined, // 5 days or session cookie
                    }
                );
            }
            
        }

        return true;
    } catch (error) {
        console.error('Error signing in', error);
        throw error;
    }
}

/**
 * Signs up a new user with AWS Cognito.
 * 
 * @param {string} firstName - The user's first name.
 * @param {string} lastName - The user's last name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @param {string} phone - The user's phone number.
 * @param {boolean} receiveUpdates - Whether the user wants to receive updates.
 * @param {boolean} rememberMe - Whether to remember the user for future sessions.
 * @param {string} address - The user's address.
 * @returns {Promise<boolean>} True if sign-up was successful, otherwise false.
 * @throws Will throw an error if sign-up fails.
 */
export async function signUpWithCognito(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    receiveUpdates: boolean,
    rememberMe: boolean,
    address: string,
): Promise<boolean> {
    console.log({
        file: 'lib/aws/cognito/actions.ts',
        output: phone,
    });

    const params: SignUpCommandInput = {
        ClientId: congitoConfig.clientId,
        Username: email,
        Password: password,
        UserAttributes: [
            { Name: 'email', Value: email },
            { Name: 'phone_number', Value: `+${phone}` },
            { Name: 'name', Value: `${firstName} ${lastName}` },
            { Name: 'address', Value: address },
            { Name: 'custom:receiveUpdates', Value: receiveUpdates.toString() },
        ],
    };

    try {
        const command = new SignUpCommand(params);
        const user = await cognitoClient.send(command);

        if (user) {
            await signInWithCognito(email, password, rememberMe);
        }

        return true;
    } catch (error) {
        console.error('Error creating user.', error);
        throw error;
    }
}

/**
 * Retrieves guest user credentials from AWS Cognito Identity Pool.
 * 
 * @returns {Promise<any>} The credentials for the guest user.
 */
export async function getGuestUserCredentials() {
    return fromCognitoIdentityPool({
        clientConfig: {
            region: congitoConfig.region,
        },
        identityPoolId: congitoConfig.identityPoolId,
    });
}