import React from "react";

import "./SingleSession.css";
import { Link } from "react-router-dom";

const SingleSession = ({ session, traineesData }) => {
  const trainee = traineesData.find((trainee) => {
    return trainee.id === session.traineeId;
  });
  console.log(trainee);
  return (
    <Link to="/singleSessionPage" state={session}>
      <div className="single-session-container">
        <p>Date: {session.date}</p>
        <p>Time: {session.time}</p>
        <p>Session: {session.name}</p>
        <p>Price: {session.price}</p>
        {/* <p>
          Trainee: {trainee.fname} {trainee.lname}
        </p> */}
      </div>
    </Link>
  );
};

export default SingleSession;
