import { useState, createContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [user, setUser] = useState(null);
  console.log(user);

  return (
    <AuthContext.Provider value={{ isLoading, isNew, setIsNew, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
