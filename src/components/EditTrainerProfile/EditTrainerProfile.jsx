import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../config/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateEmail, reauthenticateWithCredential, EmailAuthProvider, sendEmailVerification } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";

const EditTrainerProfile = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    
    setValue("email", user.email || "");

    const fetchData = async () => {
      const userRef = doc(db, `users/${user.uid}`);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        setValue("name", userData.name || "");
        setValue("phone", userData.phone || "");
      }
    };
    fetchData();
  }, [user, setValue]);

  const onSubmit = async (data) => {
    if (!user) return;
    setLoading(true);
  
    try {
      const userRef = doc(db, `users/${user.uid}`);
  
      if (data.email !== user.email) {
        const password = prompt("Enter your password to confirm email change:");
        if (!password) throw new Error("Password is required for email change.");
  
        // Reauthenticate
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
  
        // Update the email first
        await updateEmail(user, data.email);
  
        // Send verification email to the NEW email
        await sendEmailVerification(user);
  
        alert("A verification email has been sent to your new email. Please verify before changes take effect.");
        return; // Exit early
      }
  
      // Update Firestore if no email change
      await updateDoc(userRef, { name: data.name, phone: data.phone });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-title">Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="edit-profile-form">
        <input placeholder="Full name" {...register("name")} />
        <input placeholder="Email" type="email" {...register("email")} />
        <input placeholder="Phone" type="tel" {...register("phone")} />
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditTrainerProfile;
