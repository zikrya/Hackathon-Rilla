"use client";

import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../../Userpool";
import { useRouter } from 'next/navigation';
import "./Login.css";
import Link from "next/link";

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
        router.push("/upload");
      },
      onFailure: (err) => {
        console.error("Login error:", err);
        if (err.code === 'UserNotConfirmedException') {
          setError("Your account has not been confirmed. Please check your email for the confirmation code.");
        } else if (err.code === 'NotAuthorizedException') {
          setError("Invalid email or password. Please try again.");
        } else {
          setError("An error occurred. Please try again.");
        }
      },
    });
  };
  
  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Login</h1>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
            required
          />

          <button type="submit">Sign In</button>

          {error && <p className="error-message">{error}</p>}

          <p className="signup-link">
            Already have an account? <Link href="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;