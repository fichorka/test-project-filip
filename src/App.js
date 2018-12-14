import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import VehicleMake from './VehicleMake';
import VehicleModel from './VehicleModel';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";


@inject('rootStore')
@observer
class App extends Component {
  
  render() {
    
    
    return (
      <Router>
      <div className="App">
      
      
        <nav className="navbar">
          
            <NavLink to="/vehicle-makes/" activeClassName="selected">Vehicle Makes</NavLink>
            <NavLink to="/vehicle-models/" activeClassName="selected">Vehicle Models</NavLink>
          
        </nav>
        
        
        <Route path="/vehicle-makes/" component={VehicleMake} />
        <Route path="/vehicle-models/" component={VehicleModel} />
        
        
      </div>
      </Router>
    );
  }
}

export default App;
