import { useEffect } from "react";
import { getAuth, applyActionCode } from "firebase/auth";
    
const ProfilePage = () => {
  useEffect(() => {
    const handleVerification = async () => {
      const auth = getAuth();
      const queryParams = new URLSearchParams(window.location.search);
      const oobCode = queryParams.get("oobCode");

      if (!oobCode) {
        alert("Invalid verification link.");
        return;
      }

      try {
        // Apply action code to confirm email change
        await applyActionCode(auth, oobCode);

        // Reload user object to reflect changes
        await auth.currentUser.reload();

        alert(`Your email has been successfully updated to ${auth.currentUser.email}.`);
      } catch (error) {
        console.error("Error verifying email:", error);
        alert(error.message);
      }
    };

    handleVerification();
  }, []);

  return <div>Email verification in progress...</div>;
};

export default ProfilePage;
