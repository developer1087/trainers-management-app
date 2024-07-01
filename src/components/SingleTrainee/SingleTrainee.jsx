import React from "react";
import { Link } from "react-router-dom";

import "./SingleTrainee.css";
const SingleTrainee = ({ trainee }) => {
  return (
    <div className="single-trainee-container">
      <Link to="/singleTraineePage" state={trainee}>
        <p>
          {trainee.fname} {trainee.lname}
        </p>
      </Link>
    </div>
  );
};

export default SingleTrainee;
