import { NavLink } from "react-router-dom";
import React, { useContext } from "react";
import Logout from "./Logout";
import { AuthContext } from "../AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-elements active">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/upload">Upload</NavLink>
            </li>
            {!user && (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
