import { dynamoDbConfig } from "@/lib/aws/config";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const dynamoDBClientApi = new DynamoDBClient({
    region: dynamoDbConfig.region,
    credentials: {
        accessKeyId: process.env.AWS_PUBLIC_ACCESSKEY!,
        secretAccessKey: process.env.AWS_PUBLIC_SECRET_ACCESSKEY!,
    }
});