import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  TraineesContext,
  TraineesProvider,
} from "../../context/TraineesContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/config"

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
import Tasks from "../../components/Tasks/Tasks";
import { fetchTrainerData } from "../../API/api";
import { PaymentsProvider } from "../../context/PaymentsContext";

const DashboardPage = () => {
  const { traineesData, addNewTrainee, addNew, setAddNew } =
    useContext(TraineesContext);
  const { openSessionForm, setOpenSessionForm, sessionsData } = useContext(SessionsContext);
  const [userData, setUserData] = useState(null);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const userRef = doc(db, `users/${user.uid}`);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          console.error("User document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [user]);

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
      <h1>Welcome {userData?.name || "Trainer"}</h1>
      <p>Let's get things done!</p>
        <div className="stats-container">
          <div className="single-stat" id="tasks-stat">
            <Tasks/>
          </div>
          <div className="single-stat"  id="sessions-stat">
            <h3>Sessions</h3>
            <p>{sessionsData.length}</p>
          </div>
          <div className="single-stat" id="trainees-stat">
            <h3>Trainees</h3>
            <p>{traineesData.length}</p>
          </div>
          <div className="single-stat" id="balance-stat">
            <h3>Balance</h3>
            <p>{sessionsData.length}</p>
          </div>
        </div>
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
        <PaymentsProvider>
         <DashboardPage />
        </PaymentsProvider>
      </SessionsProvider>
    </TraineesProvider>
  );
};

export default DashboardWrapper;
