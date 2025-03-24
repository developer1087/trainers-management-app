import { useState, createContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/config";

const AuthContext = createContext({
  user: null,
  totalDebt: 0,
  totalIncome: 0,
  setTotalDebt: () => {},
  setTotalIncome: () => {},
});

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [user, setUser] = useState(null);
  const [totalDebt, setTotalDebt] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

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
    <AuthContext.Provider value={{ isLoading, isNew, setIsNew, user, setUser, totalDebt, setTotalDebt, totalIncome, setTotalIncome }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
