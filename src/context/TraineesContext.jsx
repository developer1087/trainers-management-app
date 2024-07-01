import React, { createContext, useEffect, useState, useMemo } from "react";
import { traineesList, addTrainee } from "../API/api";

const TraineesContext = createContext();

const TraineesProvider = ({ children }) => {
  const [traineesData, setTraineesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addNew, setAddNew] = useState(false);

  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        const trainees = await traineesList();
        setTraineesData(trainees);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainees();
  }, []);

  const addNewTrainee = async (traineeData) => {
    try {
      await addTrainee(traineeData);
      setTraineesData(await traineesList());
    } catch (error) {
      setError(error);
    }
  };

  return (
    <TraineesContext.Provider
      value={{ traineesData, loading, error, addNewTrainee, addNew, setAddNew }}
    >
      {children}
    </TraineesContext.Provider>
  );
};

export { TraineesContext, TraineesProvider };
