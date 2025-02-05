import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Product } from "../interfaces/products";

interface Customer {
  customerId: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  basket: Product[];
}

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const newCustomer: Customer = {
      customerId: Math.floor(Math.random() * 1000), // Generate a random customerId
      firstName,
      lastName,
      userName: username,
      email,
      password,
      basket: [],
    };

    try {
      const response = await fetch("http://localhost:3000/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      });

      if (response.ok) {
        const createdCustomer = await response.json();

        // Create an empty basket for the new customer
        const basketResponse = await fetch(
          `http://localhost:3000/customers/${createdCustomer.customerId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ basket: [] }),
          }
        );

        if (basketResponse.ok) {
          // Successfully registered and created an empty basket, redirect to login
          navigate("/login");
        } else {
          // Handle server errors for basket creation
          const errorData = await basketResponse.json();
          alert(`Failed to create basket: ${errorData.message}`);
        }
      } else {
        // Handle server errors for registration
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      // Handle network errors
      if (error instanceof Error) {
        alert(`Registration failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="top-text">Register</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>First name: </label>
          <input
            type="text"
            id="firstNameInput"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last name: </label>
          <input
            type="text"
            id="lastNameInput"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Username: </label>
          <input
            type="text"
            id="usernameInput"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>E-mail: </label>
          <input
            type="email"
            id="emailInput"
            placeholder="E-mail address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            id="passwordInput"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Register</button>
        <b>Already a user?</b>
        <u onClick={handleLoginClick}>Sign in</u>
      </form>
    </div>
  );
};
