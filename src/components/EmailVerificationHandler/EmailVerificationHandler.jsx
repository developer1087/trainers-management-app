import { useEffect } from "react";
import { isSignInWithEmailLink, applyActionCode } from "firebase/auth";
import { auth } from "../../config/config"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";

const EmailVerificationHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleVerification = async () => {
      try {
        if (isSignInWithEmailLink(auth, window.location.href)) {
          const urlParams = new URLSearchParams(window.location.search);
          const oobCode = urlParams.get("oobCode");
          if (oobCode) {
            await applyActionCode(auth, oobCode);
            alert("Email successfully verified!");
            navigate("/profile");
          } else {
            alert("Invalid verification link.");
            navigate("/");
          }
        }
      } catch (error) {
        alert("Failed to verify email: " + error.message);
        navigate("/");
      }
    };
    handleVerification();
  }, [navigate]);

  return <div>Verifying your email...</div>;
};

export default EmailVerificationHandler;
