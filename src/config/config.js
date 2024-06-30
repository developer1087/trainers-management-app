// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP6glbrjpS7fWBFV6VOZ2ScjXQps8YXoA",
  authDomain: "fitness-management-app-8c3f2.firebaseapp.com",
  projectId: "fitness-management-app-8c3f2",
  storageBucket: "fitness-management-app-8c3f2.appspot.com",
  messagingSenderId: "693133926752",
  appId: "1:693133926752:web:ced70e1dc78ccfa1b33e05",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
