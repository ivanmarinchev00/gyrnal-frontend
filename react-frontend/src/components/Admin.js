import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import './Admin.css'

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clients: []
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        let config = {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('jwt')}`,
                "content-type": "application/json"
            }
        }

        axios.get(`http://localhost:8080/api/v1/customers/getall`, config)
            .then(response => response.data)
            .then((data) => {
                console.log(data);
                this.setState({ clients: data })
            })
    }
    handleClick = (item) => {
        console.log(item);
        if(item.journal === null){
            sessionStorage.setItem('journalId', -1)
            sessionStorage.setItem('customerId', item.id)
        }
        else{
            sessionStorage.setItem('journalId', item.journal.id)
            sessionStorage.setItem('customerId', item.id)
        }
        
        console.log("I JUST GOT CLICKEEEEEEED " + sessionStorage.getItem('customerId'))

        window.location.href="/Workouts";
        window.location.href="/Workouts";
    }
    render() {
        return (
                <div>
                    {this.state.clients.map((item) =>
                        <div className="customers" key={item.id}>
                            <ul>
                                <li><button onClick={e => (this.handleClick(item))}>{item.firstName} {item.lastName}</button></li>
                            </ul>
                        </div>
                    )}
                </div>
        )
    }
}
export default Admin;