import React, { useContext, useState, useEffect } from "react";
import "./SingleSessionPage.css";
import { useLocation, useNavigate } from "react-router";
import {
  SessionsContext,
  SessionsProvider,
} from "../../context/SessionsContext";
import EditSessionForm from "../../components/EditSessionForm/EditSessionForm";
import {
  TraineesContext,
  TraineesProvider,
} from "../../context/TraineesContext";

const SingleSessionPage = () => {
  const location = useLocation();
  const [session, setSession] = useState(location.state);
  const [isEditSession, setIsEditSession] = useState(false);
  const navigate = useNavigate();
  const { traineesData } = useContext(TraineesContext);
  const { updateSession, deleteSession } = useContext(SessionsContext);

  const handleUpdateSession = async (updatedSession) => {
    await updateSession(updatedSession, session.id);
    setSession((prev) => ({ ...prev, ...setIsEditSession(false) }));
  };

  const handleEditSession = () => {
    setIsEditSession(true);
  };
  const handleDeleteSession = () => {
    deleteSession(session.id);
    alert("Session Removed.");
    navigate("/sessionsPage");
  };

  const getTraineeName = () => {
    if (!traineesData || traineesData.length === 0) {
      return "Loading trainees...";
    }
    const trainee = traineesData.find((t) => t.id === session.traineeId);
    return trainee ? `${trainee.fname} ${trainee.lname}` : "Unknown Trainee";
  };

  return (
    <div className="single-session-page-container">
      <div className="session-info">
        <h3>Session Info:</h3>
        <p>Date: {session.date}</p>
        <p>Time: {session.time}</p>
        <p>Session: {session.name}</p>
        <p>Price: {session.price}</p>
        <p>Description: {session.description}</p>
        <p>Name: {getTraineeName()}</p>
      </div>
      <div className="session-actions">
        <button className="btn" onClick={handleEditSession}>
          Edit Session
        </button>
        {isEditSession && (
          <EditSessionForm
            setIsEditSession={setIsEditSession}
            updateSession={handleUpdateSession}
            date={session.date}
            time={session.time}
            id={session.id}
            name={session.name}
            price={session.price}
            description={session.description}
            traineeId={session.traineeId}
          />
        )}
        <button className="btn" onClick={handleDeleteSession}>
          Delete Session
        </button>
      </div>
    </div>
  );
};

const SingleSessionWrapper = () => {
  return (
    <TraineesProvider>
      <SessionsProvider>
        <SingleSessionPage />
      </SessionsProvider>
    </TraineesProvider>
  );
};

export default SingleSessionWrapper;
