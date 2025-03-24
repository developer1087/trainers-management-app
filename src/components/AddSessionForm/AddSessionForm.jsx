import React, { useEffect, useState } from "react";
import "./AddSessionForm.css";
import { Select, SelectItem } from "../ui/Select";

const AddSessionForm = ({ traineesData, addSession, setOpenSessionForm }) => {
  console.log(traineesData);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [trainee, setTrainee] = useState("");
  const [price, setPrice] = useState(""); // Add price state

  const [sessionData, setSessionData] = useState({
    date: "",
    time: "",
    name: "",
    traineeId: "",
    price: "", // Add price to sessionData
  });

  useEffect(() => {
    setSessionData({
      date: date,
      time: time,
      name: name,
      traineeId: trainee,
      price: price, // Update sessionData with price
    });
  }, [date, time, name, trainee, price]);

  const handleSessionSubmit = (e) => {
    e.preventDefault();
    addSession(sessionData);
    setOpenSessionForm(false);
  };

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
        <label htmlFor="">Enter Session Price:</label> {/* Add price input */}
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input-field session-input"
          placeholder="Session Price"
        />
        <label htmlFor="">Choose Trainee:</label>
        <Select
                      onValueChange={(value) => setTrainee(value)} 
                      value={trainee}
                    >
                      <SelectItem value="">בחר מתאמן</SelectItem>
                      {traineesData && traineesData.length > 0 ? (
                        traineesData.map((trainee) => (
                        <SelectItem key={trainee.id} value={trainee.id}>
                          {trainee.fname} {trainee.lname}
                        </SelectItem>
                        ))) : (
                        <SelectItem value="">No Trainees</SelectItem>
                      )}
                    </Select>
        <button type="submit" className="input-submit session-submit">
          Save Session
        </button>
      </form>
    </div>
  );
};

export default AddSessionForm;