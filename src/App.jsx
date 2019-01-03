import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Create from './Pages/Create';
import EditElement from './Pages/EditElement';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import VehicleMakeList from './Pages/VehicleMakeList';
import VehicleModelList from './Pages/VehicleModelList';


@inject('rootStore')
@observer
class App extends Component {
  
  
  render() {
    
    
    return (
      <Router>
      <div className="App">
      <Navbar match={this.props.match} />
      
        <div className="container">
        <Route exact path="/" component={Home} />
        <Route exact path="/vehicle-make-list" component={VehicleMakeList} />
        <Route exact path="/vehicle-model-list" component={VehicleModelList} />
        <Route path="/create" component={Create} />
        <Route exact strict path="/vehicle-make-list/edit-element/:id" component={EditElement} />
        <Route exact strict path="/vehicle-model-list/edit-element/:id" component={EditElement} />
        </div>
        
      </div>
      </Router>
    );
  }
}

export default App;
