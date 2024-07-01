import React, { useState } from "react";

import "./EditForm.css";

const EditForm = ({ setIsEdit }) => {
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setIsEdit(false);
  };
  return (
    <div className="edit-container">
      <form onSubmit={handleEditSubmit}>
        <label htmlFor="">Edit First Name</label>
        <input
          type="text"
          name="fname"
          value={fName}
          onChange={(e) => setFname(e.target.value)}
        />
        <label htmlFor="">Edit Last Name</label>
        <input
          type="text"
          name="lname"
          value={lName}
          onChange={(e) => setLname(e.target.value)}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditForm;
