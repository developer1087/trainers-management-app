import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  SessionsContext,
  SessionsProvider,
} from "../../context/SessionsContext";
import {
  TraineesContext,
  TraineesProvider,
} from "../../context/TraineesContext";
import SingleSession from "../../components/SingleSession/SingleSession";
import { traineesList } from "../../API/api";
import "./SessionsPage.css";
import { use } from "react";

const SessionsPage = () => {
  const { user } = useContext(AuthContext);
  const { sessionsData } = useContext(SessionsContext);
  const { traineesData, setTraineesData } = useContext(TraineesContext);

  useEffect(() => {
    if (!user) return; // Exit early if no user

    const fetchTrainees = async () => {
      try {
      const [traineesListData] = await Promise.all([traineesList(user.uid)]);
      setTraineesData(traineesListData);
    } catch (error) {
      console.error("Error fetching trainees data:", error);
    }
  };
  if (user) {
    fetchTrainees();
  }
} ,[user, setTraineesData]);


  return (
    <div className="main-sessions-container">
      <h2>All Sessions</h2>
      <div className="sessions-list-container">
        {sessionsData.map((session) => {
          return (
            <SingleSession
              key={session.id}
              session={session}
              traineesData={traineesData}
            />
          );
        })}
      </div>
    </div>
  );
};

const DashboardWrapper = () => {
  return (
    <TraineesProvider>
      <SessionsProvider>
        <SessionsPage />
      </SessionsProvider>
    </TraineesProvider>
  );
};

export default DashboardWrapper;
