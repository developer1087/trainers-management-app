import React from "react";
import { Link } from "react-router-dom";

import "./SingleTrainee.css";
const SingleTrainee = ({ trainee }) => {
  return (
    <Link
      to="/singleTraineePage"
      state={trainee}
      className="single-trainee-link"
    >
      <div className="single-trainee-container">
        <p>
          {trainee.fname} {trainee.lname}
        </p>
      </div>
    </Link>
  );
};

export default SingleTrainee;
