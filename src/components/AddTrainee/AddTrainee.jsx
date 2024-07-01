import React, { useContext, useEffect, useState } from "react";
import { TraineesContext } from "../../context/TraineesContext";

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
        <label htmlFor="">First Name</label>
        <input
          type="text"
          name="fname"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <label htmlFor="">Last Name</label>
        <input
          type="text"
          name="lname"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
        <button type="submit">Add Trainee</button>
      </form>
    </div>
  );
};

export default AddTrainee;
