import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { TraineesContext, TraineesProvider } from "../../context/TraineesContext";
import SingleTrainee from "../../components/SingleTrainee/SingleTrainee";
import AddTrainee from "../../components/AddTrainee/AddTrainee";
import { Link } from "react-router-dom";

import "./DashboardPage.css";

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const { traineesData, addNewTrainee, addNew, setAddNew } =
    useContext(TraineesContext);


  const handleAddTrainee = () => {
    addNewTrainee;
    setAddNew(true);
  };

  return (
    <div className="main-dash-container">
      <h1>Welcome!</h1>
      <p>Let's get things done!</p>
      <div className="add-trainee">
        <p>Add A New Trainee:</p>
        <button onClick={handleAddTrainee}>+</button>
      </div>
      {addNew && <AddTrainee addNewTrainee={addNewTrainee} />}
      <Link to="/traineesPage">
        <button>Manage Trainees</button>
      </Link>
    </div>
  );
};
const DashboardWrapper = () => {
  return <TraineesProvider>
    <DashboardPage/> 
  </TraineesProvider>
}

export default DashboardWrapper;
