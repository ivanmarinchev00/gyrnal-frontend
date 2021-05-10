import React from 'react';
import { useHistory } from "react-router-dom";

function Logout() {
    console.log("in lo0000000gout");
    //const history = useHistory();
    sessionStorage.removeItem('jwt')
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('customerId')
    sessionStorage.setItem('display', false)
    console.log("display in login is " + sessionStorage.getItem('display'));
    //history.push('/');
}

export default Logout;