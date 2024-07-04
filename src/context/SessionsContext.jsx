import React, { createContext, useEffect, useState } from "react";
import {
  sessionsList,
  addSession,
  // changeSession,
  // removeSession,
} from "../API/api";

const SessionsContext = createContext();

const SessionsProvider = ({ children }) => {
  const [sessionsData, setSessionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSessionForm, setOpenSessionForm] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessions = await sessionsList();
        setSessionsData(sessions);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const addNewSession = async (sessionData) => {
    try {
      await addSession(sessionData);
      setSessionsData(await sessionsList());
    } catch (error) {
      setError(error);
    }
  };

  const updateSession = async (updatedSession, sessionId) => {
    try {
      await changeSession(updatedSession, sessionId);
      setSessionsData((prevSessions) =>
        prevSessions.map((session) =>
          session.id === sessionId
            ? { id: sessionId, ...updatedSession }
            : session
        )
      );
    } catch (error) {
      setError(error);
    }
  };

  const deleteSession = async (sessionId) => {
    try {
      await removeSession(sessionId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SessionsContext.Provider
      value={{
        sessionsData,
        loading,
        error,
        addNewSession,
        openSessionForm,
        setOpenSessionForm,
        updateSession,
        deleteSession,
      }}
    >
      {children}
    </SessionsContext.Provider>
  );
};

export { SessionsContext, SessionsProvider };
