import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import POSContainer from './components/POSContainer'
import Admin from './components/Admin'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={POSContainer} />
          <Route path='/admin' component={Admin}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
