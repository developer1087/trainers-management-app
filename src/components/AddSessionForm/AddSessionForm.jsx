import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { SessionsContext } from "../../context/SessionsContext";

import "./AddSessionForm.css";

const AddSessionForm = ({ traineesData, addSession, setOpenSessionForm }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [trainee, setTrainee] = useState("");

  const [sessionData, setSessionData] = useState({
    date: "",
    time: "",
    name: "",
    traineeId: "",
  });
  useEffect(() => {
    setSessionData({
      date: date,
      time: time,
      name: name,
      traineeId: trainee,
    });
  }, [date, time, name, trainee]);
  const handleSessionSubmit = (e) => {
    e.preventDefault();
    addSession(sessionData);
    setOpenSessionForm(false);
  };
  console.log(sessionData);

  return (
    <div className="session-form">
      <form onSubmit={handleSessionSubmit}>
        <label htmlFor="">Enter Session Date:</label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input-field session-input"
        />
        <label htmlFor="">Enter Session Time:</label>
        <input
          type="time"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="input-field session-input"
        />
        <label htmlFor="">Enter Session Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field session-input"
          placeholder="E.g 'Private session'"
        />
        <label htmlFor="">Choose Trainee:</label>
        <select
          name="trainees"
          id="trainees"
          onChange={(e) => setTrainee(e.target.value)}
          className="input-field session-input"
        >
          {traineesData.map((trainee) => {
            return (
              <option value={trainee.id} key={trainee.id}>
                {trainee.fname} {trainee.lname}
              </option>
            );
          })}
        </select>
        <button type="submit" className="input-submit session-submit">
          Save Session
        </button>
      </form>
    </div>
  );
};

export default AddSessionForm;
