import React, { Component } from 'react';
import SockJS from 'sockjs-client';
import SockJsClient from 'react-stomp';

class Socket extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages: []
          }
    }
    componentDidMount(){

      let headers = {
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpdmFubWFyaW5jaGV2MDBAZ21haWwuY29tIiwiZXhwIjoxNjExMzcyNTc2LCJpYXQiOjE2MTEzMzY1NzZ9.80aPGTi2rbEJthuDj69_3_JYBsYuBzjSypBpOtBIkEM`,
        "content-type": "application/json"
    }
      const sock = new WebSocket('ws://localhost:8080/notification'); 
      sock.onopen = () => {
        console.log('connection to server open');
      };
  
      sock.onmessage = e => {
        this.setState( { messages: [e.data, ...this.state.messages] });
      };
  
      sock.onclose = () => {
        console.log('close');
      };
  
      this.sock = sock;
    }
    
    render(){
      return(
        <div>
          {this.messages}
        </div>
      )
    }
}
export default Socket;