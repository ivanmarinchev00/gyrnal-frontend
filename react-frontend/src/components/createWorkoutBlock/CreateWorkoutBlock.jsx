import React from "react";
import axios from "axios";
import { useState } from "react";

import "../createWorkoutBlock/createWorkoutBlock.css";

const CreateWorkoutBlock = ({ onCreateWorkout }) => {
  const journalHandler = e => {
    e.preventDefault();
    let id = JSON.parse(sessionStorage.getItem('customerId'));
    console.log(id);
    let config = {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem('jwt')}`,
        "content-type": "application/json"
      }
    }
    console.log(sessionStorage.getItem("jwt"))
    //let header = `Authorization : Bearer ${sessionStorage.getItem('jwt')}`;
    axios.post(`http://localhost:8080/api/v1/customers/journal/addjournal/${id}`, {}, config)
      .then(res => {
        //console.log(id);
        console.log("HEEEEREEEE" + res.data.toString());
        sessionStorage.setItem('journalId', res.data.id)
        window.location.reload();
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleValidation = event => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }


    //Email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  const [name, setName] = useState('')
  const [sets, setSets] = useState(0)
  const [reps, setReps] = useState(0)
  const [weight, setWeight] = useState(0)
  const [date, setDate] = useState(Date.now)
  const onSubmitHandler = event => {
    event.preventDefault();

    if (name === "") {
      console.log("INPUT A NAME!")
    }
    else if (sets < 1) {
      console.log("Sets cannot be less 1")
    }
    else if (reps < 1) {
      console.log("Reps cannot be less 1")
    }
    else if (weight < 0) {
      console.log("Weight cannot be less 0")
    }
    else if (date.length === undefined) {
      console.log("Please pick a date")
    }
    else {
      const stringDate = date.toString();
      const data = {
        name: name,
        sets: sets,
        reps: reps,
        weight: weight,
        date: stringDate
      }

      console.log("HEEEEEREEEEE" + data);


      let config = {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('jwt')}`,
          "content-type": "application/json"
        }
      }

      let id = JSON.parse(sessionStorage.getItem('journalId'));

      console.log("HEEEEEEEREEEEEE " + id)
      axios.post(`http://localhost:8080/api/v1/customers/journal/${id}/addexercise/`, data, config)
        .then(
          window.location.href = "/Workouts"
        )
    }




    // axios.post(`http://localhost:8080/api/v1/customers/journal/1/addexercise`, data, {
    //   headers: {
    //     Authorization: sessionStorage.getItem('jwt')
    //   }
    // });

    // name.value = "";
    // sets.value = "";
    // reps.value = "";
    // weight.value = "";
    // date.value = "";
  };
  let jid = JSON.parse(sessionStorage.getItem('journalId'));
  console.log(typeof jid)
  var myCurrentDate = new Date();
  var dateToday = myCurrentDate.getFullYear() + '-0' + (myCurrentDate.getMonth() + 1) + '-' + myCurrentDate.getDate();
  console.log(dateToday)
  if (jid !== -1) {
    return (
      <form className="createWorkout-block">
        <input type="text" placeholder="Name" name="name" onChange={e => setName(e.target.value)} />
        <input type="number" placeholder="Sets" name="sets" min="1" onChange={e => setSets(e.target.value)} />
        <input type="number" placeholder="Reps" name="reps" min="1" onChange={e => setReps(e.target.value)} />
        <input type="number" placeholder="Weight" name="weight" min="0" onChange={e => setWeight(e.target.value)} />
        <input type="date" name="date" min={dateToday} onChange={e => setDate(e.target.value)} />
        <button className="saveButton" onClick={onSubmitHandler}>Save</button>
      </form>
    )
  }
  else if (sessionStorage.getItem('role') === "ADMIN") {
    return (
      <button className="btnStart" onClick={journalHandler}>
        Start Now
      </button>
    )

  }
  else {
    console.log(sessionStorage.getItem('journalId'))
    return (
      <>
        <div className="journey">
          Your Journey Begins Here!
      </div>
        <button className="btnStart" onClick={journalHandler}>
          Start Now
      </button>
      </>

    )
  }

};

export default CreateWorkoutBlock;