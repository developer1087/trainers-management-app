import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../../config/config";
import { applyActionCode, updateEmail, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./WelcomePage.css";
import { AuthContext } from "../../context/AuthContext";

const WelcomePage = () => {
  const { setIsNew, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState(null);

  useEffect(() => {
    const handleEmailVerification = async () => {
      const urlParams = new URLSearchParams(location.search);
      const newEmail = urlParams.get('newEmail');
      const oobCode = urlParams.get('oobCode');

      console.log("URL Parameters:", { newEmail, oobCode });
      console.log("Current user:", auth.currentUser?.email);

      if (oobCode && newEmail) {
        setIsVerifying(true);
        setVerificationError(null);
        
        try {
          console.log("Starting email verification process");
          
          // Apply the action code
          await applyActionCode(auth, oobCode);
          console.log("Action code applied successfully");

          // Get the current user
          const currentUser = auth.currentUser;
          console.log("User after action code:", currentUser?.email);

          if (currentUser) {
            try {
              // First update Firebase Auth
              await updateEmail(currentUser, newEmail);
              console.log("Email updated in Firebase Auth");

              // Then update Firestore
              const userRef = doc(db, `users/${currentUser.uid}`);
              await setDoc(userRef, { email: newEmail }, { merge: true });
              console.log("Email updated in Firestore");

              alert("Email successfully updated!");
              navigate('/profile');
              return;
            } catch (updateError) {
              console.error("Error updating email:", updateError);
              setVerificationError(updateError.message);
              alert(`Error updating email: ${updateError.message}`);
            }
          } else {
            console.error("No user found after verification");
            setVerificationError("No user found after verification");
            alert("Error: No user found after verification");
          }
        } catch (error) {
          console.error("Error in verification process:", error);
          setVerificationError(error.message);
          alert(`Error verifying email: ${error.message}`);
        } finally {
          setIsVerifying(false);
        }
      }

      // Only redirect if we're not verifying and we have a user
      if (user && !isVerifying) {
        navigate("/dashboardPage");
      }
    };

    handleEmailVerification();
  }, [user, navigate, location, isVerifying]);

  const handleLogin = () => {
    setIsNew(false);
  };

  if (isVerifying) {
    return (
      <div className="welcome-container">
        <div className="content-container">
          <h2>Verifying your email...</h2>
          <p>Please wait while we process your email verification.</p>
          {verificationError && (
            <p className="text-red-600 mt-4">Error: {verificationError}</p>
          )}
        </div>
      </div>
    );
  }

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
