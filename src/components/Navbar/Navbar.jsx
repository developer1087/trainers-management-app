import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/aiflogo4@600x.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate(); // Use the useNavigate hook to get the navigate function

  const handleLogoutBtn = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("User signed out");
      navigate("/"); // Redirect to the login page
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  return (
    <div className="nav-container">
      <ul>
        <div className="logo-container">
          <NavLink to="/dashboardPage">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>
        <li>
          <NavLink to="/traineesPage" >Trainees</NavLink>
        </li>
        <li>
          <NavLink to="/calendarPage">Calendar</NavLink>
        </li>
        <li>
          <NavLink to="/sessionsPage">Sessions</NavLink>
        </li>
        <li>
          <NavLink to="/paymentsPage">Payments</NavLink>
        </li>
        <li className="logout-btn">
          <NavLink to="/edit-profile" className="no-hover"><FontAwesomeIcon icon={faUser} id="user-icon" /></NavLink>
          <button
            onClick={handleLogoutBtn}
            style={{background: "none", border: "none"}}
          >
           <FontAwesomeIcon icon={faRightFromBracket} id="user-icon"/>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
