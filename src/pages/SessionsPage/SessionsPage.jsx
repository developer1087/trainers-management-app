import React, { useContext } from "react";
import {
  SessionsContext,
  SessionsProvider,
} from "../../context/SessionsContext";
import {
  TraineesContext,
  TraineesProvider,
} from "../../context/TraineesContext";
import SingleSession from "../../components/SingleSession/SingleSession";

import "./SessionsPage.css";

const SessionsPage = () => {
  const { sessionsData } = useContext(SessionsContext);
  const { traineesData } = useContext(TraineesContext);

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
