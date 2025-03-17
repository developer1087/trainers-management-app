import React, { useState } from "react";

import "./EditSessionForm.css";

const EditSessionForm = ({
  setIsEditSession,
  updateSession,
  date,
  time,
  id,
  name,
  price,
  description,
}) => {
  const [sessionDate, setSessionDate] = useState(date);
  const [sessionTime, setSessionTime] = useState(time);
  const [sessionName, setSessionName] = useState(name);
  const [sessionPrice, setSessionPrice] = useState(price);
  const [sessionDescription, setSessionDescription] = useState(description);

  const handleEditSessionSubmit = (e) => {
    e.preventDefault();
    const updatedSession = {
      date: sessionDate,
      time: sessionTime,
      name: sessionName,
      description: sessionDescription,
    };
    updateSession(updatedSession, id);
    setIsEditSession(false);
  };

  return (
    <div className="edit-session-container">
      <form onSubmit={handleEditSessionSubmit}>
        <p>{id}</p>
        <label htmlFor="">Edit Session Date</label>
        <input
          type="date"
          placeholder={date}
          name="date"
          value={sessionDate}
          onChange={(e) => setSessionDate(e.target.value)}
          className="input-field"
        />
        <label htmlFor="">Edit Session Time</label>
        <input
          type="time"
          placeholder={time}
          name="time"
          value={sessionTime}
          onChange={(e) => setSessionTime(e.target.value)}
          className="input-field"
        />
        <label htmlFor="">Edit Session Name</label>
        <input
          type="text"
          placeholder={name}
          name="name"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          className="input-field"
        />
        <label htmlFor="">Edit Session Price</label>
        <input
          type="number"
          placeholder={price}
          name="price"
          value={sessionPrice}
          onChange={(e) => setSessionPrice(e.target.value)}
          className="input-field"
        />
        <label htmlFor="">Edit Session Description</label>
        <input
          type="text"
          placeholder="Write description here..."
          name="description"
          value={sessionDescription}
          onChange={(e) => setSessionDescription(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditSessionForm;
