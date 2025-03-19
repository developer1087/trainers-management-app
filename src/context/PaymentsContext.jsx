import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { AuthContext } from "./AuthContext";

const PaymentsContext = createContext();

export const PaymentsProvider = ({ children }) => {
  const [paymentsData, setPaymentsData] = useState([]);
    const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user) return;

    const paymentsRef = collection(db, "users", user.uid, "payments");
    const q = query(paymentsRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const paymentsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPaymentsData(paymentsList);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <PaymentsContext.Provider value={{ paymentsData, setPaymentsData }}>
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
