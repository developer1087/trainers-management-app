import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/config";
import { getAuth } from "firebase/auth";

export const fetchTrainerData = async (userId) => {
  const userRef = doc(db, `users/${userId}`);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    console.error("User not found");
    return null;
  }
};

export const updateTrainerData = async (userId, updatedData) => {
  const userRef = doc(db, `users/${userId}`);
  await updateDoc(userRef, updatedData);
};


export const traineesList = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const traineesCollection = collection(db, `users/${user.uid}/trainees`);
    const traineesSnapshot = await getDocs(traineesCollection);
    const trainees = traineesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Optional: Log the trainees
    // trainees.forEach((trainee) => {
    //   console.log(`${trainee.id} => `, trainee);
    // });

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

export const changeTrainee = async (updatedTrainee, traineeId) => {
  const auth = getAuth();
  const user = auth.currentUser;
  try {
    const traineeRef = doc(db, `users/${user.uid}/trainees`, traineeId); // Create a document reference
    await setDoc(traineeRef, updatedTrainee); // Set the document with the updated data
    console.log("Trainee updated successfully");
  } catch (error) {
    console.error("Error updating trainee:", error);
  }
};

export const removeTrainee = async (traineeId) => {
  const auth = getAuth();
  const user = auth.currentUser;
  try {
    const traineeRef = doc(db, `users/${user.uid}/trainees`, traineeId); // Create a document reference
    await deleteDoc(traineeRef);
  } catch (error) {
    console.log(error);
  }
};

// export const updateTrainee = async();

export const sessionsList = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const sessionsCollection = collection(db, `users/${user.uid}/sessions`);
    const sessionsSnapshot = await getDocs(sessionsCollection);
    const sessions = sessionsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // Optional: Log the sessions
    // sessions.forEach((session) => {
    //   console.log(`${session.id} => `, session);
    // });

    return sessions;
  } else {
    throw new Error("User not authenticated");
  }
};
export const addSession = async (sessionData) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/sessions`),
        sessionData
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

export const changeSession = async (updatedSession, sessionId) => {
  const auth = getAuth();
  const user = auth.currentUser;
  try {
    const sessionRef = doc(db, `users/${user.uid}/sessions`, sessionId); // Create a document reference
    await setDoc(sessionRef, updatedSession); // Set the document with the updated data
    console.log("Session updated successfully");
  } catch (error) {
    console.error("Error updating session:", error);
  }
};

export const removeSession = async (sessionId) => {
  const auth = getAuth();
  const user = auth.currentUser;
  try {
    const sessionRef = doc(db, `users/${user.uid}/sessions`, sessionId); // Create a document reference
    await deleteDoc(sessionRef);
  } catch (error) {
    console.log(error);
  }
};
