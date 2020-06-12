import React from 'react';

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Recommendations from './Components/Recommendations';
import MoodSelector from './Components/MoodSelector';

// Containers
import NavBar from './Containers/NavBar';
import HomePage from './Containers/HomePage';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      userId:null
    }
    this.resetId = this.resetId.bind(this)
  }
  componentDidMount = () =>{
    this.getUserId()
  }

  getUserId = () =>{

    fetch('/user_confirm')
    .then(response => response.json())
    .then(data => {
      this.setState({userId: data})
    })
  }

  resetId = (e) => {

    e.preventDefault();
    this.setState({userId: null})
  }

  deleteMyAccount = () =>{
    this.setState({userId: null});
    fetch('/users/deleteMyAccount', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.userId) //works???
    })

  }
  

  render() {
    return (
      <div className="App">
          
           
            <NavBar deleteMyAccount = {this.deleteMyAccount} userId={this.state.userId} resetId={this.resetId} />
            <HomePage userId={this.state.userId} />
           
      </div>
    );
  }
}

export default App;
