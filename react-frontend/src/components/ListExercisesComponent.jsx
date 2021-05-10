import axios from 'axios';
import React, { Component } from 'react';
import CustomerService from '../services/CustomerService';


class ListExercisesComponent extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            exercises: []
        }
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
    }

    componentDidMount() {
        let id = JSON.parse(sessionStorage.getItem('journalId'));
        console.log(id)
        axios.get(`http://localhost:8080/api/v1/customers/journal/${id}/getallforjournal`)
            .then(response => response.data)
            .then((data) => {
                this.setState({ exercises: data })
                
            })
            
    }

    onDeleteHandler = (exid, e) =>{
        console.log("WHYYYYYYYYYYYY")
        let id = JSON.parse(sessionStorage.getItem('journalId'));
        let execId = exid;
        axios.delete(`http://localhost:8080/api/v1/customers/journal/${id}/deleteexercise/${execId}`)
        .then(response => response.data)
            .then((data) => {
                this.setState({ exercises: data })
                window.location.reload()
            })
      }


    render() {
        console.log(this.state.exercises)
        if(this.state.exercises != []){
        return (
            <div>
                {this.state.exercises.map((item) =>
                    <div className="workout-item" key={item.id}>
                    <span className="workout-item__name">{item.name}</span>
                    <span className="workout-item__count">{item.sets} sets</span>
                    <span className="workout-item__count">{item.reps} reps</span>
                    <span className="workout-item__count">{item.weight} kg</span>
                    <span className="workout-item__date">{item.date}</span>
                    <button className="cross" onClick={e => (this.onDeleteHandler(item.id, e))}>
                        X
                    </button>
                  </div>
                )}
            </div>
        );
                }
                else{
                    return (<div>Loading</div>)
                }
    }
}

export default ListExercisesComponent;