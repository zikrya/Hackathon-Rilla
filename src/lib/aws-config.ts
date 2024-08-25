import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
  credentials: new AWS.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }),
});

export const s3 = new AWS.S3();
export const dynamoDb = new AWS.DynamoDB.DocumentClient();
export const lambda = new AWS.Lambda();
