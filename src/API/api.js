import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../config/config";

export const traineesList = async () => {
  const trainees = await getDocs(collection(db, "trainees"));
  traineesList.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });

  return trainees;
};

try {
  const docRef = await addDoc(collection(db, "trainees"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815,
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
