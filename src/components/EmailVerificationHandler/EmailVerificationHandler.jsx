import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../config/config";
import { applyActionCode, isSignInWithEmailLink } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const EmailVerificationHandler = () => {
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const navigate = useNavigate();

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const newEmail = urlParams.get('newEmail');
        const oobCode = urlParams.get('oobCode');

        if (!oobCode || !newEmail) {
          setVerificationStatus("error");
          return;
        }

        // Apply the action code
        await applyActionCode(auth, oobCode);
        
        // Get the current user
        const user = auth.currentUser;
        if (user) {
          // Update email in Firestore
          const userRef = doc(db, `users/${user.uid}`);
          await setDoc(userRef, { email: newEmail }, { merge: true });
        }
        
        setVerificationStatus("success");
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } catch (error) {
        console.error("Error verifying email:", error);
        setVerificationStatus("error");
      }
    };

    handleEmailVerification();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {verificationStatus === "verifying" && (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Verifying your email...</h2>
          <p>Please wait while we process your email verification.</p>
        </div>
      )}
      
      {verificationStatus === "success" && (
        <div className="text-center text-green-600">
          <h2 className="text-xl font-semibold mb-2">Email Successfully Verified!</h2>
          <p>Your email has been updated. Redirecting to profile...</p>
        </div>
      )}
      
      {verificationStatus === "error" && (
        <div className="text-center text-red-600">
          <h2 className="text-xl font-semibold mb-2">Verification Failed</h2>
          <p>There was an error verifying your email. Please try again.</p>
          <button 
            onClick={() => navigate('/profile')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Return to Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailVerificationHandler;
