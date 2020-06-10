import React from 'react';

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

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

    fetch('/userConfirm')
    .then(response => response.json())
    .then(data => {
      this.setState({userId: data})
    })
  }

  resetId = () => {
    this.setState({userId: null})
  }

  render() {
    return (
      <div className="App">
          <Router>
            <NavBar userId={this.state.userId} />
            <HomePage resetId={this.resetId} />
          </Router>
      </div>
    );
  }
}

export default App;
