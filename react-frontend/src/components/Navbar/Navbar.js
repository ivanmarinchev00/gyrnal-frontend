import React, {Component} from 'react';
import { Button } from '../Button';
import { MenuItems } from "./MenuItems";
import logo from './640dc7ee-70ef-482f-80b2-33429986fc59_200x200.png';
import './Navbar.css';
import {Link, BrowserRouter as Router} from "react-router-dom";
import {Route, Switch} from "react-router-dom";
import Logout from '../Logout';
import { useStorageState } from "react-storage-hooks";

class Navbar extends Component{
    state = { clicked: false}
    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

render(){
    console.log("display in navbar is " + this.props.display);
    if(!this.props.display){
        return(<div></div>)
    }
    return(
        <nav className="NavbarItems">
            <h1 className="navbar-logo"><img src={logo} alt="A Gym Journal" /></h1>
            <div className="menu-icon" onClick={this.handleClick}>
                <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index)=> {
                    return(
                    <li key={index}>
                        <a className={item.cName} href={item.url}>
                        {item.title}
                        </a>
                    </li>
                    )
                })}    
            </ul>
            <LogoutButton/>
            {/* <Link to="./Signup">Sign Up</Link> */}
        </nav>
    )
    }
}

const LogoutButton = () => {
    const [display, setDisplay] = useStorageState(window.sessionStorage, 'display');
    return(
            <Button onClick={() => {
                sessionStorage.removeItem('jwt');
                sessionStorage.removeItem('role');
                sessionStorage.removeItem('customerId');
                sessionStorage.removeItem('journalId');
                setDisplay(false);
                window.location.href="/"
                //sessionStorage.setItem('display', false);
            }}>Log out</Button>
            
    );

}
export default Navbar
