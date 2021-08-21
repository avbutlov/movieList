import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

const Header: React.FC = () => {
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
    <div className={styles.headerWrapper}>
      <ul className={styles.navPanel}>
        {links.map((link) => {
          return (
            <li
              key={link.title}
              className={`${styles.link} ${
                link.pathname === location.pathname ? styles.active : ""
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
