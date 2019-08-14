import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';
import POSContainer from './components/POSContainer'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={POSContainer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
