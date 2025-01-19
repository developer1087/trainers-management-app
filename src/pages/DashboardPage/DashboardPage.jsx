import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  TraineesContext,
  TraineesProvider,
} from "../../context/TraineesContext";
import SingleTrainee from "../../components/SingleTrainee/SingleTrainee";
import AddTrainee from "../../components/AddTrainee/AddTrainee";
import AddSessionForm from "../../components/AddSessionForm/AddSessionForm";
import { Link } from "react-router-dom";

import "./DashboardPage.css";
import {
  SessionsContext,
  SessionsProvider,
} from "../../context/SessionsContext";
import { addSession } from "../../API/api";
import traineesSectionImg from "../../assets/images/bruce-mars-WGN6ZEFEZbs-unsplash.jpg";
import sessionSectionImg from "../../assets/images/victor-freitas-vqDAUejnwKw-unsplash.jpg";

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const { traineesData, addNewTrainee, addNew, setAddNew } =
    useContext(TraineesContext);
  const { openSessionForm, setOpenSessionForm } = useContext(SessionsContext);

  console.log(user);

  const handleAddTrainee = () => {
    addNewTrainee;
    setAddNew(true);
  };

  const handleAddSession = () => {
    setOpenSessionForm(true);
  };

  return (
    <div className="main-dash-container">
      <div className="top-container">
        <h1>Welcome</h1>
        <p>Let's get things done!</p>
      </div>
      <div className="trainees-container">
        <h2>Trainees</h2>
        <img src={traineesSectionImg} alt="" />
        
        <button onClick={handleAddTrainee} className="secondary-btn">
            Add A New Trainee
        </button>
        
        {addNew && <AddTrainee addNewTrainee={addNewTrainee} />}
        <Link to="/traineesPage" className="full-width no-margin">
          <button className="secondary-btn">Manage Trainees</button>
        </Link>
      </div>
      <div className="sessions-container">
        <h2>Sessions</h2>
        <img src={sessionSectionImg} alt="" />
        <button className="secondary-btn" onClick={handleAddSession}>
          Add a new Session
        </button>
        {openSessionForm && (
          <AddSessionForm
            traineesData={traineesData}
            addSession={addSession}
            setOpenSessionForm={setOpenSessionForm}
          />
        )}
        <Link to="/sessionsPage"  className="full-width no-margin">
          <button className="secondary-btn">See All Sessions</button>
        </Link>
      </div>
    </div>
  );
};
const DashboardWrapper = () => {
  return (
    <TraineesProvider>
      <SessionsProvider>
        <DashboardPage />
      </SessionsProvider>
    </TraineesProvider>
  );
};

export default DashboardWrapper;
