'use server'

import { Account, Client, Databases, Users } from "node-appwrite"
import { cookies } from "next/headers"
import { AppWriteConfig } from "../config"

export async function createSessionClient() {
    const client = new Client()
        .setEndpoint(AppWriteConfig.endpoint)
        .setProject(AppWriteConfig.projectId)
    
    const session = (await cookies()).get('register-session')

    if (!session || !session.value) {
        throw new Error('No Session')
    }

    client.setSession(session.value)

    return {
        get account() {
            return new Account(client)
        },
    }
}

export async function createAdminClient() {
    const client = new Client()
        .setEndpoint(AppWriteConfig.endpoint)
        .setProject(AppWriteConfig.projectId)
        .setKey(AppWriteConfig.apiKey)
    
    return {
        get account() {
            return new Account(client)
        },
        get databases() {            
            return new Databases(client)
        },
        get users() {
            return new Users(client)
        }
    }
}
