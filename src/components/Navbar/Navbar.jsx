import { NavLink } from "react-router-dom";
import logo from "../../assets/images/aiflogo4@600x.png";

import "./Navbar.css";
import firebase from "firebase/compat/app";

const Navbar = () => {
  const handleLogoutBtn = () => {
    firebase.auth().signOut();
  };

  return (
    <div className="nav-container">
      <ul>
        <div className="logo-container">
          <NavLink to="/dashboardPage">
            <img src={logo} alt="" />
          </NavLink>
        </div>

        <li>
          <NavLink to="/traineesPage">Trainees</NavLink>
        </li>
        <li>
          <NavLink to="/sessionsPage">Sessions</NavLink>
        </li>
        <li className="logout-btn">
          <button
            onClick={handleLogoutBtn}
            className="secondary-btn logout-btn"
          >
            Log Out{" "}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
