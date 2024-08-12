import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/aiflogo4@600x.png";

import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="nav-container">
      <ul>
        <div className="logo-container">
          <NavLink to="/dashboardPage">
            <img src={logo} alt="" />
          </NavLink>
        </div>
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
