import React from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="nav-container">
      <ul>
        <li>
          <NavLink to="/dashboardPage">Home</NavLink>
        </li>
        <li>
          <NavLink to="/traineesPage">Trainees</NavLink>
        </li>
        <li>
          <NavLink to="/sessionsPage">Sessions</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
