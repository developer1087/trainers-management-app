import React, { useContext, useEffect, useState } from "react";

import "./SingleTraineePage.css";
import { useLocation } from "react-router-dom";
import EditForm from "../../components/EditForm/EditForm";
import {
  TraineesContext,
  TraineesProvider,
} from "../../context/TraineesContext";

const SingleTraineePage = () => {
  const location = useLocation();
  console.log(location);
  const [isEdit, setIsEdit] = useState(false);

  const { state } = location;
  useEffect(() => {}, [state]);
  const { updateTrainee, traineesData } = useContext(TraineesContext);

  if (!state) {
    return (
      <div className="main-container">
        <h1>Manage Trainee</h1>
        <p>No trainee data found.</p>
      </div>
    );
  }

  const { fname, lname, id } = state;

  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleDelete = () => {};
  return (
    <div className="main-container">
      <h1>Manage Trainee</h1>
      <p>
        {fname} {lname}
      </p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      {isEdit && (
        <EditForm
          setIsEdit={setIsEdit}
          updateTrainee={updateTrainee}
          fname={fname}
          lname={lname}
          id={id}
        />
      )}
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
