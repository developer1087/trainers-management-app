import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "./WelcomePage.css";
import { AuthContext } from "../../context/AuthContext";

const WelcomePage = () => {
  const { setIsNew, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Don't redirect if we're on the verification page
    if (user && !location.pathname.includes('verify-email')) {
      navigate("/dashboardPage");
    }
  }, [user, navigate, location]);

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
