import React, { useContext, useEffect, useState } from "react";

import "./SingleTraineePage.css";
import { useNavigate, redirect, useLocation } from "react-router-dom";
import EditForm from "../../components/EditForm/EditForm";
import {
  TraineesContext,
  TraineesProvider,
} from "../../context/TraineesContext";

const SingleTraineePage = () => {
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const [trainee, setTrainee] = useState(location.state);
  // const { state } = location;
  const { updateTrainee, deleteTrainee } = useContext(TraineesContext);
  const navigate = useNavigate();
  const { fname, lname, id } = trainee;

  if (!trainee) {
    return (
      <div className="main-container">
        <h1>Manage Trainee</h1>
        <p>No trainee data found.</p>
      </div>
    );
  }

  const handleUpdateTrainee = async (updatedTrainee) => {
    await updateTrainee(updatedTrainee, id);
    setTrainee((prev) => ({ ...prev, ...updatedTrainee }));
    setIsEdit(false);
  };
  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleDelete = () => {
    deleteTrainee(id);
    alert("Trainee Removed.");
    navigate("/traineesPage");
  };
  return (
    <div className="main-container">
      <h1>Manage Trainee</h1>
      <div className="trainee-details">
        <h3>Trainee's info</h3>
        <p>
          {fname} {lname}
        </p>
      </div>
      <div className="trainee-actions">
        <button onClick={handleEdit} className="btn trainee-action-btn">
          Edit
        </button>
        {isEdit && (
          <EditForm
            setIsEdit={setIsEdit}
            updateTrainee={handleUpdateTrainee}
            fname={fname}
            lname={lname}
            id={id}
          />
        )}
        <button onClick={handleDelete} className="btn trainee-action-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

const SingleTraineeWrapper = () => {
  return (
    <TraineesProvider>
      <SingleTraineePage />
    </TraineesProvider>
  );
};

export default SingleTraineeWrapper;
