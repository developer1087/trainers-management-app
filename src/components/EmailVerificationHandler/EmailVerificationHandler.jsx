import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../../config/config";
import { applyActionCode, updateEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const EmailVerificationHandler = () => {
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleVerification = async () => {
      try {
        // Get the verification code from the URL
        const urlParams = new URLSearchParams(location.search);
        const oobCode = urlParams.get('oobCode');
        
        // Get the new email from localStorage
        const newEmail = localStorage.getItem('pendingEmailChange');

        console.log("Starting verification process");
        console.log("URL params:", { oobCode });
        console.log("New email from storage:", newEmail);

        if (!oobCode || !newEmail) {
          throw new Error("Missing verification parameters");
        }

        // Apply the action code
        console.log("Applying action code...");
        await applyActionCode(auth, oobCode);
        console.log("Action code applied successfully");

        // Get the current user
        const user = auth.currentUser;
        console.log("Current user:", user?.email);

        if (!user) {
          throw new Error("No authenticated user found");
        }

        // Update the email
        console.log("Updating email to:", newEmail);
        await updateEmail(user, newEmail);
        console.log("Email updated in Firebase Auth");

        // Update Firestore
        console.log("Updating Firestore...");
        const userRef = doc(db, `users/${user.uid}`);
        await setDoc(userRef, { email: newEmail }, { merge: true });
        console.log("Firestore updated successfully");

        // Clear the stored email
        localStorage.removeItem('pendingEmailChange');

        setVerificationStatus("success");
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } catch (error) {
        console.error("Verification error:", error);
        setError(error.message);
        setVerificationStatus("error");
      }
    };

    handleVerification();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {verificationStatus === "verifying" && (
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Verifying your email...
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please wait while we process your email verification.
            </p>
          </div>
        )}

        {verificationStatus === "success" && (
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-green-600">
              Email Successfully Verified!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Your email has been updated. Redirecting to profile...
            </p>
          </div>
        )}

        {verificationStatus === "error" && (
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-red-600">
              Verification Failed
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {error || "There was an error verifying your email. Please try again."}
            </p>
            <button
              onClick={() => navigate('/profile')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Return to Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationHandler;
