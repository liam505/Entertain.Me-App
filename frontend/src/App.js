import React from 'react';

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// Containers
import NavBar from './Containers/NavBar';
import HomePage from './Containers/HomePage';

class App extends React.Component {
  render() {
    return (
      <div className="App">
          <Router>
            <NavBar />
            <HomePage />
          </Router>
      </div>
    );
  }
}

export default App;
