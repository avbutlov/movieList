import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {


  return (
    <div className="header-wrapper">
      <ul className="nav-panel">
        <li><Link to='/home'>Home</Link></li>
        <li><Link to='/movies'>Movies</Link></li>
      </ul>
    </div>
  );
}

export default Header;
