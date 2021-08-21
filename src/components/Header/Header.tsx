import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const location = useLocation();

  const links = [
    {
      title: "Home",
      pathname: "/home",
    },
    {
      title: "Movies",
      pathname: "/movies",
    },
    
  ];

  return (
    <div className="header-wrapper">
      <ul className="nav-panel">
        {links.map((link) => {
          return (
            <li
              key={link.title}
              className={`link ${
                link.pathname === location.pathname ? "active" : ""
              }`}
            >
              <Link to={link.pathname}>{link.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Header;
