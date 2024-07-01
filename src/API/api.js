import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../config/config";
import { getAuth } from "firebase/auth";

export const traineesList = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);
  if (user) {
    const traineesCollection = collection(db, `users/${user.uid}/trainees`);
    const traineesSnapshot = await getDocs(traineesCollection);
    const trainees = traineesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Optional: Log the trainees
    trainees.forEach((trainee) => {
      console.log(`${trainee.id} => `, trainee);
    });

    return trainees;
  } else {
    throw new Error("User not authenticated");
  }
};

export const addTrainee = async (traineeData) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/trainees`),
        traineeData
      );
      console.log("Document written with ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  } else {
    throw new Error("User not authenticated");
  }
};

// export const updateTrainee = async();
