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

  render() {
    return (
      <div className="App">
          <Router>
           
            <NavBar userId={this.state.userId} resetId={this.resetId} />
            <HomePage userId={this.state.userId} />
            <Switch>
             <Route path='/mood' component={MoodSelector}/>
             <Route path='/reccom'  component={Recommendations}/>
             
            </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
