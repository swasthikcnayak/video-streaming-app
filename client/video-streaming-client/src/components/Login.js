import React, { useState, useContext } from "react";
import "../css/login.css";

import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../config";
import { AuthContext } from "../AuthContext";

function LoginForm() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(BASE_URL + "api/v1/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        login(data.accessToken, data);
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Login failed, please check your usename & password");
    }
  };

  if (user) {
    return <p className="message"> Please logout before logging in again</p>;
  }

  return (
    <div className="login-page">
      <div className="form">
        <h2 className="header">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button type="submit">login</button>
          <p className="message">
            Not registered? <NavLink to="/register"> Register </NavLink>
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
export default LoginForm;
