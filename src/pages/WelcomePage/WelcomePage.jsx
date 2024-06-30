import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./WelcomePage.css";
import { AuthContext } from "../../context/AuthContext";

const WelcomePage = () => {
  const { setIsNew } = useContext(AuthContext);

  const handleLogin = () => {
    setIsNew(false);
  };

  return (
    <div className="welcome-container">
      <h1>Welcome To The AI Fitness App!</h1>
      <p>Here you can manage your trainees, fitness sessions and payments!</p>
      <label htmlFor="">New Here?</label>
      <Link to="authPage">
        <button>Register</button>
      </Link>
      <label htmlFor="">Already have an account?</label>
      <Link to="authPage">
        <button onClick={handleLogin}>Log in</button>
      </Link>
    </div>
  );
};

export default WelcomePage;
