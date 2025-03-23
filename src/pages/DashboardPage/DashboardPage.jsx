import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  TraineesContext,
  TraineesProvider,
} from "../../context/TraineesContext";
import { PaymentsProvider, usePayments } from "../../context/PaymentsContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/config";
import AddTrainee from "../../components/AddTrainee/AddTrainee";
import AddSessionForm from "../../components/AddSessionForm/AddSessionForm";
import { Link } from "react-router-dom";
import "./DashboardPage.css";
import {
  SessionsContext,
  SessionsProvider,
} from "../../context/SessionsContext";
import { addSession, addPayment, traineesList, fetchPayments, sessionsList } from "../../API/api";
import traineesSectionImg from "../../assets/images/bruce-mars-WGN6ZEFEZbs-unsplash.jpg";
import sessionSectionImg from "../../assets/images/victor-freitas-vqDAUejnwKw-unsplash.jpg";
import Tasks from "../../components/Tasks/Tasks";
import { fetchTrainerData } from "../../API/api";

const DashboardPage = () => {
  const { traineesData, setTraineesData, addNewTrainee, addNew, setAddNew } =
    useContext(TraineesContext);
  const { openSessionForm, setOpenSessionForm, sessionsData, setSessionsData } =
    useContext(SessionsContext);
  const [userData, setUserData] = useState(null);
  const { paymentsData, setPaymentsData, loading: paymentsLoading} = usePayments();
  const { user } = useContext(AuthContext);

  const totalRevenue = paymentsData.reduce((sum, p) => sum + (p.amount || 0), 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [traineesListData, paymentsListData, sessionsListData] = await Promise.all([
          traineesList(user.uid),
          fetchPayments(user.uid),
          sessionsList(user.uid),
        ]);

        setTraineesData(traineesListData); // Update Trainees Context
        setPaymentsData(paymentsListData);
        setSessionsData(sessionsListData); // Update Sessions Context
      } catch (error) {
        console.error("שגיאה בטעינת הנתונים:", error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, setPaymentsData, setTraineesData, setSessionsData]); 

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
            <Tasks />
          </div>
          <div className="single-stat" id="sessions-stat">
            <h3>Sessions</h3>
            <p>{sessionsData.length}</p>
          </div>
          <div className="single-stat" id="trainees-stat">
            <h3>Trainees</h3>
            <p>{traineesData.length}</p>
          </div>
          <div className="single-stat" id="balance-stat">
          <h3>Balance</h3>
            {paymentsLoading ? <p>Loading...</p> : <p>{totalRevenue}</p>} {/* Display loading indicator */}
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
        {openSessionForm && traineesData && traineesData.length > 0 && ( // Added checks here
          <AddSessionForm
            key="addSessionForm" 
            traineesData={traineesData}
            addSession={addSession}
            setOpenSessionForm={setOpenSessionForm}
          />
        )}
        <Link to="/sessionsPage" className="full-width no-margin">
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