import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/config";
import { collection, onSnapshot } from "firebase/firestore";
import { AuthContext } from "./AuthContext";

const PaymentsContext = createContext();

export const PaymentsProvider = ({ children }) => {
  const [paymentsData, setPaymentsData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    setLoading(true); // Set loading to true before fetching data

    const paymentsRef = collection(db, "users", user.uid, "payments");

    const unsubscribe = onSnapshot(paymentsRef, (snapshot) => {
      const paymentsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPaymentsData(paymentsList);
      setLoading(false); // Set loading to false after data is fetched
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <PaymentsContext.Provider value={{ paymentsData, setPaymentsData, loading }}>
      {children}
    </PaymentsContext.Provider>
  );
};

export const usePayments = () => {
  const context = useContext(PaymentsContext);
  if (!context) {
    throw new Error("usePayments must be used within a PaymentsProvider");
  }
  return context;
};