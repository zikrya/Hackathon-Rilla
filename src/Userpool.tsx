// src/Userpool.tsx

import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!
};

if (!poolData.UserPoolId || !poolData.ClientId) {
  throw new Error("Both UserPoolId and ClientId are required.");
}

export default new CognitoUserPool(poolData);
