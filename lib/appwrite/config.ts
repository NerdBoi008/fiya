export const AppWriteConfig = {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
    apiKey: process.env.NEXT_APPWRITE_KEY!,
    database: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    usersCollection: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION!,
}