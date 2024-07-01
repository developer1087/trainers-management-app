import React, { useState } from "react";

import "./SingleTraineePage.css";
import { useLocation } from "react-router-dom";
import EditForm from "../../components/EditForm/EditForm";

const SingleTraineePage = () => {
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const { state } = location;
  console.log("Location state:", state); // Debugging line

  if (!state) {
    return (
      <div className="main-container">
        <h1>Manage Trainee</h1>
        <p>No trainee data found.</p>
      </div>
    );
  }

  const { fname, lname } = state;
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
      {isEdit && <EditForm setIsEdit={setIsEdit} />}
    </div>
  );
};

export default SingleTraineePage;
