import React, { useState } from "react";
import "../css/login.css";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../config";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(BASE_URL + "api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setError("Registration success");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Login failed, please check your usename & password");
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <h2 className="header">Register</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button type="submit">Register</button>
          <p className="message">
            Already registered? <NavLink to="/login"> Login </NavLink>
          </p>
          {error && (
            <p className="message" style={{ color: "red" }}>
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
