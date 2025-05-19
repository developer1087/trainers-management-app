import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../config/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { reauthenticateWithCredential, EmailAuthProvider, verifyBeforeUpdateEmail } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

const EditTrainerProfile = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    
    setValue("email", user.email || "");

    const fetchData = async () => {
      const userRef = doc(db, `users/${user.uid}`);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        console.log("Fetched user data:", data);
        setUserData(data);
        setValue("name", data.name || "");
        setValue("phone", data.phone || "");
      }
    };
    fetchData();
  }, [user, setValue]);

  const onSubmit = async (data) => {
    if (!user) return;
    setLoading(true);
    try {
      console.log("Submitting data:", data);
      const userRef = doc(db, `users/${user.uid}`);
      
      if (data.email !== user.email) {
        const password = prompt("Enter your password to confirm email change:");
        if (!password) throw new Error("Password is required for email change.");
        
        // Reauthenticate
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
        
        // Send verification to NEW email
        const actionCodeSettings = {
          url: `${window.location.origin}/verify-email?newEmail=${encodeURIComponent(data.email)}`,
          handleCodeInApp: true,
        };
        
        await verifyBeforeUpdateEmail(user, data.email, actionCodeSettings);
        alert("A verification email has been sent to your new email address. Please check your inbox and click the verification link to complete the process.");
        return;
      }

      // Update Firestore (if no email change)
      const updateData = { 
        name: data.name, 
        phone: data.phone,
        email: data.email 
      };
      console.log("Updating Firestore with:", updateData);
      await setDoc(userRef, updateData, { merge: true });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Full name</label>
            <Input
              placeholder={userData?.name || "Full name"}
              {...register("name")}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              placeholder={user?.email || "Email"}
              type="email"
              {...register("email")}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone</label>
            <Input
              placeholder={userData?.phone || "Phone"}
              type="tel"
              {...register("phone")}
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditTrainerProfile;