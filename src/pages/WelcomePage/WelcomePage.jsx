import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./WelcomePage.css";
import { AuthContext } from "../../context/AuthContext";

const WelcomePage = () => {
  const { setIsNew, user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    navigate("/dashboardPage");
  }

  const handleLogin = () => {
    setIsNew(false);
  };

  return (
    <div className="welcome-container">
      <div className="img-container"></div>
      <div className="gradient-container"></div>
      <div className="content-container">
        <h1>Welcome To The AI Fitness App!</h1>
        <p>Here you can manage your trainees, fitness sessions and payments!</p>
        <br />
        <hr />
        <label htmlFor="">New Here?</label>
        <Link to="authPage">
          <button className="btn">Register</button>
        </Link>
        <label htmlFor="">Already have an account?</label>
        <Link to="authPage">
          <button className="btn" onClick={handleLogin}>
            Log in
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
