import React, { useContext, useEffect, useState } from "react";
import { TraineesContext } from "../../context/TraineesContext";

import "./AddTrainee.css";

const AddTrainee = ({ addNewTrainee }) => {
  const { addNew, setAddNew } = useContext(TraineesContext);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [traineeData, setTraineeData] = useState({
    fname: "",
    lname: "",
  });
  useEffect(() => {
    setTraineeData({
      fname: fname,
      lname: lname,
    });
  }, [fname, lname]);
  const handleSubmit = (e) => {
    e.preventDefault();

    addNewTrainee(traineeData);
    setAddNew(false);
  };

  return (
    <div className="add-trainee-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fname"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          className="input-field add-trainee-input"
          placeholder="First Name"
        />

        <input
          type="text"
          name="lname"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          className="input-field add-trainee-input"
          placeholder="Last Name"
        />
        <button type="submit" className="input-submit add-trainee-submit">
          Add Trainee
        </button>
      </form>
    </div>
  );
};

export default AddTrainee;
