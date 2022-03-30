import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">SPORT GAMING </Link>
      </div>
      <ul>
        {/* <li>
          <button className="btn">
            <FaSignOutAlt /> Logout
          </button>
        </li> */}

        <li>
          <Link to="/login">
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaUser /> Register
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
