import React, { createContext, useEffect, useState, useMemo } from "react";
import {
  traineesList,
  addTrainee,
  changeTrainee,
  removeTrainee,
} from "../API/api";

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

  const updateTrainee = async (updatedTrainee, traineeId) => {
    try {
      await changeTrainee(updatedTrainee, traineeId);
      setTraineesData((prevTrainees) =>
        prevTrainees.map((trainee) =>
          trainee.id === traineeId
            ? { id: traineeId, ...updatedTrainee }
            : trainee
        )
      );
    } catch (error) {
      setError(error);
    }
  };

  const deleteTrainee = async (traineeId) => {
    try {
      await removeTrainee(traineeId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TraineesContext.Provider
      value={{
        traineesData,
        loading,
        error,
        addNewTrainee,
        addNew,
        setAddNew,
        updateTrainee,
        deleteTrainee,
      }}
    >
      {children}
    </TraineesContext.Provider>
  );
};

export { TraineesContext, TraineesProvider };
