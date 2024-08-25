"use client";
import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../../Userpool";
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    user.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log("Login successful:", result);
        router.push("/dashboard"); // Redirect to a protected route after successful login
      },
      onFailure: (err) => {
        console.error("Login error:", err);
        // Display specific error messages
        if (err.code === 'UserNotConfirmedException') {
          setError("Your account has not been confirmed. Please check your email for the confirmation code.");
           // Redirect to the confirmation page
        } else if (err.code === 'NotAuthorizedException') {
          setError("Invalid email or password. Please try again.");
        } else {
          setError("An error occurred. Please try again.");
        }
      },
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(event.target.value)
          }
        />

        <button type="submit">Login</button>

        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
};

export default Login;
