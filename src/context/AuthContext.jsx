import { useState, createContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [user, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading, isNew, setIsNew, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
