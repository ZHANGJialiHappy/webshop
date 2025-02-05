import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLoginClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          password: password,
        }),
      });

      const data = await response.text();

      if (response.ok) {
        if (data.startsWith("Hi,")) {
          login(username); // Set the user in the context

          navigate("/");
        } else {
          setErrorMessage(data);
        }
      } else {
        setErrorMessage("An error occurred during login. Please try again.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="container">
      <h1 className="top-text">Login</h1>
      <form className="form">
        <div>
          <label htmlFor="usernameInput">Username: </label>
          <input
            value={username}
            type="text"
            id="usernameInput"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="passwordInput">Password: </label>
          <input
            value={password}
            type="password"
            id="passwordInput"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLoginClick}>Log in</button>
        {errorMessage && <p style={{ display: "block" }}>{errorMessage}</p>}
        <b>Not a user? </b>
        <u onClick={handleRegisterClick}>Sign up</u>
      </form>
    </div>
  );
};
