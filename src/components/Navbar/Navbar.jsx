import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "../../assets/images/aiflogo4@600x.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faRightFromBracket, 
  faUser, 
  faBars, 
  faXmark 
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);

  // בדיקה אם המסך במצב מובייל
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // בדיקה ראשונית
    checkIfMobile();

    // מאזין לשינוי גודל המסך
    window.addEventListener('resize', checkIfMobile);

    // ניקוי המאזין
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // מאזין ללחיצות מחוץ לתפריט
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogoutBtn = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("User signed out");
      navigate("/");
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="nav-container">
      <ul>
        <div className="logo-container">
          <NavLink to="/dashboardPage">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>

        {isMobile ? (
          <>
            <div onClick={toggleMenu}>
              <FontAwesomeIcon icon={faBars} className="hamburger-icon" />
            </div>

            {isMenuOpen && (
              <>
                <div className="overlay" onClick={closeMenu}></div>
                <div className="mobile-menu" ref={menuRef}>
                  <div className="menu-header">
                    <div className="close-icon" onClick={closeMenu}>
                      <FontAwesomeIcon icon={faXmark} />
                    </div>
                  </div>
                  <div className="menu-items">
                    <NavLink to="/traineesPage" onClick={closeMenu}>Trainees</NavLink>
                    <NavLink to="/calendarPage" onClick={closeMenu}>Calendar</NavLink>
                    <NavLink to="/sessionsPage" onClick={closeMenu}>Sessions</NavLink>
                    <NavLink to="/paymentsPage" onClick={closeMenu}>Payments</NavLink>
                    <NavLink to="/edit-profile" onClick={closeMenu}>Profile</NavLink>
                    <button onClick={() => { handleLogoutBtn(); closeMenu(); }}>
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <li>
              <NavLink to="/traineesPage">Trainees</NavLink>
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
          </>
        )}

        <li className="logout-btn">
          {!isMobile && (
            <NavLink to="/edit-profile" className="no-hover">
              <FontAwesomeIcon icon={faUser} id="user-icon" />
            </NavLink>
          )}
          {!isMobile && (
            <button onClick={handleLogoutBtn} style={{ background: "none", border: "none" }}>
              <FontAwesomeIcon icon={faRightFromBracket} id="user-icon" />
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;