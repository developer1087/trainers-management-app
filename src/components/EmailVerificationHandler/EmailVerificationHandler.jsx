import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../../config/config";
import { applyActionCode, signInWithEmailLink, updateEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const EmailVerificationHandler = () => {
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const newEmail = urlParams.get('newEmail');
        const oobCode = urlParams.get('oobCode');

        console.log("Verification params:", { newEmail, oobCode });

        if (!oobCode || !newEmail) {
          console.error("Missing verification parameters");
          setVerificationStatus("error");
          return;
        }

        // Apply the action code
        await applyActionCode(auth, oobCode);
        console.log("Action code applied successfully");
        
        // Get the current user
        const user = auth.currentUser;
        console.log("Current user:", user?.email);

        if (user) {
          try {
            // Update email in Firebase Auth
            await updateEmail(user, newEmail);
            console.log("Email updated in Firebase Auth");

            // Update email in Firestore
            const userRef = doc(db, `users/${user.uid}`);
            await setDoc(userRef, { email: newEmail }, { merge: true });
            console.log("Email updated in Firestore");
            
            setVerificationStatus("success");
            setTimeout(() => {
              navigate('/profile');
            }, 2000);
          } catch (updateError) {
            console.error("Error updating email:", updateError);
            setVerificationStatus("error");
          }
        } else {
          console.log("No user found, attempting to sign in");
          try {
            await signInWithEmailLink(auth, newEmail, window.location.href);
            console.log("Sign in successful");
            setVerificationStatus("success");
            setTimeout(() => {
              navigate('/profile');
            }, 2000);
          } catch (signInError) {
            console.error("Error signing in:", signInError);
            setVerificationStatus("error");
          }
        }
      } catch (error) {
        console.error("Error in verification process:", error);
        setVerificationStatus("error");
      }
    };

    handleEmailVerification();
  }, [navigate, location]);

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
