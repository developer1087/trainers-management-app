import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { TraineesContext } from "../../context/TraineesContext";
import SingleTrainee from "../../components/SingleTrainee/SingleTrainee";

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const { traineesData } = useContext(TraineesContext);

  console.log(user);

  const handleAddTrainee = () => {};

  return (
    <div>
      <h1>Welcome!</h1>
      <p>Let's get things done</p>
      <div className="add-trainee">
        <p>Add your first trainee</p>
        <button onClick={handleAddTrainee}>+</button>
      </div>
      {traineesData.map((trainee) => {
        return <SingleTrainee key={trainee.id} trainee={trainee} />;
      })}
    </div>
  );
};

export default DashboardPage;
