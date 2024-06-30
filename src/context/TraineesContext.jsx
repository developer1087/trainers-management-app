import { createContext, useEffect, useState } from "react";
import { traineesList } from "../API/api";

const TraineesContext = createContext();

const TraineesProvider = ({ children }) => {
  const [traineesData, setTraineesData] = useState([]);

  useEffect(() => {
    async function fetchTrainees() {
      setTraineesData(await traineesList());
    }
    fetchTrainees();
  }, []);

  return (
    <TraineesContext.Provider
      value={{
        traineesData,
      }}
    >
      {children}
    </TraineesContext.Provider>
  );
};

export { TraineesContext, TraineesProvider };
