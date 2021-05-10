import React from "react";

import "../workoutList/workoutList.css";

const WorkoutList = ({ children }) => (
  <div className="workout-list">{children}</div>
);

export default WorkoutList;