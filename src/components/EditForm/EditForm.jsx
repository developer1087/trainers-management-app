import React, { useState } from "react";

import "./EditForm.css";

const EditForm = ({ updateTrainee, setIsEdit, fname, lname, id }) => {
  const [fName, setFname] = useState(fname);
  const [lName, setLname] = useState(lname);
  const [phone, setPhone] = useState("0501234567");
  const [email, setEmail] = useState("mail@email.com");
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedTrainee = {
      fname: fName,
      lname: lName,
      phone: phone,
      email: email,
    };
    updateTrainee(updatedTrainee, id);
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
          className="input-field"
        />
        <label htmlFor="">Edit Last Name</label>
        <input
          type="text"
          name="lname"
          value={lName}
          onChange={(e) => setLname(e.target.value)}
          className="input-field"
        />
        <label htmlFor="">Edit Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input-field"
        />
        <label htmlFor="">Edit Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="input-submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditForm;
