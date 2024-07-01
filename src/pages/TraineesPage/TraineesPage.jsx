import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { TraineesContext, TraineesProvider } from "../../context/TraineesContext";
import SingleTrainee from "../../components/SingleTrainee/SingleTrainee";
import AddTrainee from "../../components/AddTrainee/AddTrainee";

import "./TraineesPage.css";

const TraineesPage = () => {
  const { user } = useContext(AuthContext);
  const { traineesData, addNewTrainee, addNew, setAddNew } =
    useContext(TraineesContext);
  const handleAddTrainee = () => {
    addNewTrainee;
    setAddNew(true);
  };
  return (
    <div className="main-trainees-container">
      <h2>All trainees:</h2>
      <div className="trainees-list">
        {traineesData.map((trainee) => {
          return <SingleTrainee key={trainee.id} trainee={trainee} />;
        })}
      </div>
      <div className="add-trainee">
        <p>Add A New Trainee:</p>
        <button onClick={handleAddTrainee}>+</button>
      </div>
      {addNew && <AddTrainee addNewTrainee={addNewTrainee} />}
    </div>
  );
};

const TraineesWrapper = () => {
  return <TraineesProvider>
    <TraineesPage />
  </TraineesProvider>
}


export default TraineesWrapper;
