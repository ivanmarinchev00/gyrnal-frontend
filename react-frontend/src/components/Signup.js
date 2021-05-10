import React, {Component} from 'react';
import "./Signup.css";
import { useState } from "react";
import { useSpring, animated } from "react-spring";
import axios from 'axios';
import {Link, BrowserRouter as Router} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useStorageState } from "react-storage-hooks";

function Signup(){
const [registrationFormStatus, setRegistartionFormStatus] = useState(false);
  const loginProps = useSpring({ 
    left: registrationFormStatus ? -500 : 0, // Login form sliding positions
  });
  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 500, // Register form sliding positions 
  });

  const loginBtnProps = useSpring({
    borderBottom: registrationFormStatus 
      ? "solid 0px transparent"
      : "solid 2px #1059FF",  //Animate bottom border of login button
  });
  const registerBtnProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 2px #1059FF"
      : "solid 0px transparent", //Animate bottom border of register button
  });

  function registerClicked() {
    setRegistartionFormStatus(true);
  }
  function loginClicked() {
    setRegistartionFormStatus(false);
  }

  return (
    <div className="login-register-wrapper">
      <div className="nav-buttons">
        <animated.button
          onClick={loginClicked}
          id="loginBtn"
          style={loginBtnProps}
        >
          Login
        </animated.button>
        <animated.button
          onClick={registerClicked}
          id="registerBtn"
          style={registerBtnProps}
        >
          Register
        </animated.button>
      </div>
      <div className="form-group">
        <animated.form action="" id="loginform" style={loginProps}>
          <LoginForm/>
        </animated.form>
        <animated.form action="" id="registerform" style={registerProps}>
          <RegisterForm/>
        </animated.form>
      </div>
    </div>
  );
}


function LoginForm() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const history = useHistory();
const[display, setDisplay] = useStorageState(window.sessionStorage, 'display')

const handleSubmit = async (e) => {
  e.preventDefault()
  const data = {
    email:email,
    password:password
  }
  console.log(data)
  
  axios.post("http://localhost:8080/api/v1/auth/signin", data)
  .then(res => {
    console.log(res);
    sessionStorage.setItem('jwt', res.data.jwt)
    sessionStorage.setItem('role', res.data.role)
    sessionStorage.setItem('customerId', res.data.customerId)
    sessionStorage.setItem('journalId', res.data.journalId)
    console.log(sessionStorage.getItem('customerId'))
    console.log(sessionStorage.getItem('journalId'))
    //console.log("display in login is " + display);
    setDisplay(true);
    //console.log("display in login is " + display);
    if(sessionStorage.getItem('role') === "ADMIN"){
      window.location.href="/Admin";
      history.push("/Admin")
    }
    else{
      window.location.href="/Workouts";
      history.push("/Workouts")
    }
  } )
    
    .catch(err =>{
      console.log(err)
    })
}
  return (
    <React.Fragment>
      <label for="username">EMAIL</label>
      <input type="text" id="email"  onChange={e =>setEmail(e.target.value)}/>
      <label for="password">PASSWORD</label>
      <input type="password" id="password"  onChange={e =>setPassword(e.target.value)} />
      <input type="submit" value="submit" className="submit" onClick = {(e) => {handleSubmit(e)}} />
    </React.Fragment>
  );
}


function RegisterForm() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [firstName, setFirstname] = useState('')
const [lastName, setLastname] = useState('')
const[display, setDisplay] = useStorageState(window.sessionStorage, 'display')

const history = useHistory();
  const handleSubmit = e => {
    e.preventDefault()
    const data = {
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:password
    }
    console.log(data)
    axios.post("http://localhost:8080/api/v1/auth/signup", data)
    .then(res => {
      console.log(res)
      sessionStorage.setItem('jwt', res.data.jwt)
      sessionStorage.setItem('role', res.data.role)
      sessionStorage.setItem('customerId', res.data.customerId)
      sessionStorage.setItem('journalId', -1)
      setDisplay(true)
      window.location.href="/Workouts";
      history.push('/Workouts') 
    } )
      
      .catch(err =>{
        console.log(err)
      })
  }
  return (
    <React.Fragment>
      <label for="firstname">first name</label>
      <input type="text" id="fullname" onChange={e => setFirstname(e.target.value)} />
      <label for="lastname">last name</label>
      <input type="text" id="fullname" onChange={e => setLastname(e.target.value)} />
      <label for="email">email</label>
      <input type="text" id="email" onChange={e =>setEmail(e.target.value)}/>
      <label for="password">password</label>
      <input type="password" id="password" />
      <label for="confirmpassword">confirm password</label>
      <input type="password" id="confirmpassword" onChange={e =>setPassword(e.target.value)}/>
      <input type="submit" value="submit" class="submit" onClick={handleSubmit}/>
    </React.Fragment>
  );
}

export default Signup;