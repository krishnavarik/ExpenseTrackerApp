import { Link } from "react-router-dom";
import React from "react";
import "./Header.css";
function Header() {
  const clearToken = () => {
    localStorage.removeItem("idToken");
  };
  return (
    <header className="header">
      <nav>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <button className="clear" onClick={clearToken}>
            <Link to="/login">Logout</Link>
          </button>
        </li>
      </nav>
    </header>
  );
}

export default Header;
