import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Home extends Component {
  
  render() {
    
    return (
      <div className="home">
      <div className="section">
      <div className="card-panel">
      <h5 className="center-align">Select a store to list</h5>
      <div className="section">
        
        <div className="row">
        <Link to="/vehicle-make-list" className="btn-large blue-grey col s6 m4 l3 offset-m1 offset-l2">Vehicle Make</Link>
        <Link to="/vehicle-model-list" className="btn-large blue-grey col s6 m4 l3 offset-m2 offset-l2">Vehicle Model</Link>
        </div>
      
      </div>
      </div>
      </div>
      </div>

      );
  }
}

export default Home;