import { useEffect } from "react";
import { getAuth } from "firebase/auth";

const ProfilePage = () => {
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const reloadUser = async () => {
      try {
        await currentUser.reload(); // Refresh user state
        console.log(`Updated Email: ${currentUser.email}`);
        alert(`Your email has been successfully updated.`);
      } catch (error) {
        console.error("Error reloading user:", error);
        alert("Failed to update email. Please try again.");
      }
    };

    reloadUser();
  }, []);

  return <div>Your profile page content here...</div>;
};

export default ProfilePage;
