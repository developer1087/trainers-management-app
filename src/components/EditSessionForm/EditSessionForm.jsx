import React, { useState } from "react";
import { useEffect } from "react";
import { traineesList } from "../../API/api";
import "./EditSessionForm.css";
import { Select, SelectItem } from "../../components/ui/Select";

const EditSessionForm = ({
  setIsEditSession,
  updateSession,
  date,
  time,
  id,
  name,
  price,
  traineeId,
  description,
}) => {
  const [trainees, setTrainees] = useState([]);
  const [sessionDate, setSessionDate] = useState(date);
  const [sessionTime, setSessionTime] = useState(time);
  const [sessionName, setSessionName] = useState(name);
  const [sessionPrice, setSessionPrice] = useState(price);
  const [sessionDescription, setSessionDescription] = useState(description || "");
  const [sessionTraineeId, setSessionTraineeId] = useState(traineeId || "");

  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        const traineesListData = await traineesList();
        setTrainees(traineesListData);
      } catch (error) {
        console.error("Error fetching trainees data:", error);
      }
    };
    fetchTrainees();
  }, []);

 

  const handleEditSessionSubmit = (e) => {
    e.preventDefault();
    const updatedSession = {
      date: sessionDate,
      time: sessionTime,
      name: sessionName,
      description: sessionDescription,
      price: sessionPrice,
      traineeId: sessionTraineeId,
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
        <Select
          onValueChange={(value) => setSessionTraineeId(value)}
          value={sessionTraineeId}
        >
                      <SelectItem value="">בחר מתאמן</SelectItem>
                      {trainees.map((trainee) => (
                        <SelectItem key={trainee.id} value={trainee.id}>
                          {trainee.fname} {trainee.lname}
                        </SelectItem>
                      ))}
                    </Select>
        <button type="submit" className="btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditSessionForm;
