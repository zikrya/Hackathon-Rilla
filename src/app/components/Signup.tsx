"use client";
import React, { useState } from "react";
import UserPool from "../../Userpool";
import { CognitoUser } from "amazon-cognito-identity-js";
import './signup.css';

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    UserPool.signUp(email, password, [], [], (err, data) => {
      if (err) {
        console.error(err);
        setErrorMessage(err.message);
      } else {
        console.log("User signed up successfully:", data);
        setIsSignupSuccessful(true);
        setIsConfirmed(false);
      }
    });
  };

  const onConfirm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    user.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        console.error(err);
        setErrorMessage(err.message);
      } else {
        console.log("User confirmed successfully:", result);
        setIsConfirmed(true);
        setIsSignupSuccessful(false); // Reset signup state
      }
    });
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        {isSignupSuccessful ? (
          <div className="confirmation-container">
            <h3>Confirm Your Email</h3>
            <form onSubmit={onConfirm}>
              <label htmlFor="confirmationCode">Confirmation Code</label>
              <input
                type="text"
                id="confirmationCode"
                value={confirmationCode}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmationCode(event.target.value)
                }
                required
              />
              <button type="submit">Confirm Email</button>
            </form>
          </div>
        ) : (
          <>
            <h1 className="signup-title">Sign Up</h1>
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

              <button type="submit">Sign Up</button>
            </form>
          </>
        )}
        
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {!isSignupSuccessful && (
          <div className="signup-link">
            <p>Already have an account? <a href="/login">Log In</a></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
