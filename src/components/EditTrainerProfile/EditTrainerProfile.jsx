import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../config/config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Button, Input } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./EditTrainerProfile.css"; 

const EditTrainerProfile = ({ userId }) => {

  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const userRef = doc(db, `users/${user.uid}`);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        console.log(userData);
        setValue("name", userData.name || "");
        setValue("email", userData.email || "");
        setValue("phone", userData.phone || "");
      }
    };
    fetchData();
  }, [user, setValue]);
  
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userRef = doc(db, `users`, user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
        });
      } else {
        await updateDoc(userRef, {
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
      }
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-title">Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="edit-profile-form">
        <Input label="Full Name" placeholder="Full name" {...register("name")} />
        <Input label="Email" placeholder="Email" type="email" {...register("email")} />
        <Input label="Phone" placeholder="Phone" type="tel" {...register("phone")} />
        <button 
          type="submit" 
          disabled={loading} 
          variant="contained" 
          className="secondary-btn btn"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditTrainerProfile;
