import React from "react";

import "./SingleSession.css";

const SingleSession = ({ session, traineesData }) => {
  const trainee = traineesData.find((trainee) => {
    return trainee.id === session.traineeId;
  });
  console.log(trainee);
  return (
    <div className="single-session-container">
      <p>Date: {session.date}</p>
      <p>Time: {session.time}</p>
      <p>Session: {session.name}</p>
      {/* <p>
        Trainee: {trainee.fname} {trainee.lname}
      </p> */}
    </div>
  );
};

export default SingleSession;
