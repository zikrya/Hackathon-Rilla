"use client";
import React, { useState } from "react";
import UserPool from "../../Userpool"; // Adjust this import path as needed
import { CognitoUser } from "amazon-cognito-identity-js";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    UserPool.signUp(email, password, [], [], (err, data) => {
      if (err) {
        console.error(err);
        setErrorMessage(err.message);
      } else {
        console.log("User signed up successfully:", data);
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
      }
    });
  };

  return (
    <div>
      {isConfirmed ? (
        <div>
          <p>User confirmed successfully! You can now log in.</p>
        </div>
      ) : (
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

          <button type="submit">Sign Up</button>
        </form>
      )}

      {!isConfirmed && (
        <div>
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
            />

            <button type="submit">Confirm Email</button>
          </form>
        </div>
      )}

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Signup;