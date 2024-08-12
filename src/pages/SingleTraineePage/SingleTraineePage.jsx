import React, { useContext, useEffect, useState } from "react";

import "./SingleTraineePage.css";
import { useNavigate, useLocation } from "react-router-dom";
import EditForm from "../../components/EditForm/EditForm";
import {
  SessionsContext,
  SessionsProvider,
} from "../../context/SessionsContext";
import {
  TraineesContext,
  TraineesProvider,
} from "../../context/TraineesContext";

const SingleTraineePage = () => {
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const [trainee, setTrainee] = useState(location.state);
  // const { state } = location;
  const { updateTrainee, deleteTrainee } = useContext(TraineesContext);
  const navigate = useNavigate();
  const { fname, lname, id, phone, email } = trainee;
  const { sessionsData } = useContext(SessionsContext);

  if (!trainee) {
    return (
      <div className="main-container">
        <h1>Manage Trainee</h1>
        <p>No trainee data found.</p>
      </div>
    );
  }

  const getTraineesSessions = () => {
    if (!sessionsData || sessionsData.length === 0) {
      return "Loading sessions...";
    }
    const traineesSessionsArr = [];
    for (const session of sessionsData) {
      if (session.traineeId === trainee.id) {
        traineesSessionsArr.push(session);
      }
    }
    return traineesSessionsArr;
  };

  const traineesSessions = getTraineesSessions();

  const handleUpdateTrainee = async (updatedTrainee) => {
    await updateTrainee(updatedTrainee, id);
    setTrainee((prev) => ({ ...prev, ...updatedTrainee }));
    setIsEdit(false);
  };
  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleDelete = () => {
    deleteTrainee(id);
    alert("Trainee Removed.");
    navigate("/traineesPage");
  };
  return (
    <div className="main-container">
      <h1>Manage Trainee</h1>
      <div className="trainee-details">
        <h3>Trainee's info</h3>
        <p>
          {fname} {lname}
        </p>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
      <div className="trainee-sessions">
        <h3>Trainee's Sessions</h3>
        {Array.isArray(traineesSessions) && traineesSessions.length > 0 ? (
          <ul>
            {traineesSessions.map((session) => (
              <li key={session.id}>
                <p>Date: {session.date}</p>
                <p>Time: {session.time}</p>
                <p>Session: {session.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>{traineesSessions}</p>
        )}
      </div>

      <div className="trainee-actions">
        <button onClick={handleEdit} className="btn trainee-action-btn">
          Edit
        </button>
        {isEdit && (
          <EditForm
            setIsEdit={setIsEdit}
            updateTrainee={handleUpdateTrainee}
            fname={fname}
            lname={lname}
            id={id}
          />
        )}
        <button onClick={handleDelete} className="btn trainee-action-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

const SingleTraineeWrapper = () => {
  return (
    <SessionsProvider>
      <TraineesProvider>
        <SingleTraineePage />
      </TraineesProvider>
    </SessionsProvider>
  );
};

export default SingleTraineeWrapper;
