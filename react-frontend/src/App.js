import React, { useState } from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/Signup";
import ListExercisesComponent from './components/ListExercisesComponent';
import {Route, BrowserRouter as Router} from "react-router-dom";
import DatePick from "./components/DatePicker";
import WorkoutList from "./components/workoutList/WorkoutList.jsx";
import WorkoutItem from "./components/workoutList/WorkoutItem";
import CreateWorkoutBlock from "./components/createWorkoutBlock/CreateWorkoutBlock";
import axios from "axios";
import { useStorageState } from "react-storage-hooks";
import Admin from "./components/Admin";
import Socket from "./components/websocket";

const App = () => {
  const[display, setDisplay] = useStorageState(window.sessionStorage, 'display')
  //var display = sessionStorage.getItem('display') ? true : false;
  console.log("display in app is " + display);

  return (
    <div className="container">
      <Router>
        {display ? 
        <Navbar 
      display={display}
      setDisplay={setDisplay}/> : <></>}
      <Route path ="/" exact strict>{Signup()}</Route>
      <Route path ="/Workouts" exact strict><CreateWorkoutBlock/></Route>
      <Route path ="/Workouts"><ListExercisesComponent/></Route>
      <Route path ="/Admin"><Admin/></Route>
      <Socket/>
      </Router>
    </div>
  );
}

export default App;
