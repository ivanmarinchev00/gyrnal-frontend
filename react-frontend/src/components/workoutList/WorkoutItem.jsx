import React from "react";

import "../workoutList/workoutItem.css";

const WorkoutItem = ({ name, sets,  reps, weight, id, date, onDelete }) => (
  <li>
    <div className="workout-item">
      <span className="workout-item__name">{name}</span>
      <span className="workout-item__count">{sets} sets</span>
      <span className="workout-item__count">{reps} reps</span>
      <span className="workout-item__count">{weight} kg</span>
      <span className="workout-item__date">{date}</span>
      <span className="cross" onClick={() => onDelete(id)}>
        X
      </span>
    </div>
  </li>
);

export default WorkoutItem;