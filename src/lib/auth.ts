import { cognito } from './aws-config';

export async function signUpUser(username: string, password: string, email: string) {
  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID!,  // Replace with your Cognito App Client ID
    Username: username,
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  };

  try {
    const result = await cognito.signUp(params).promise();
    console.log('User sign-up successful:', result);
    return result;
  } catch (error) {
    console.error('Error during sign-up:', error);
    throw error;
  }
}
