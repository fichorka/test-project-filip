import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import VehicleMakeList from './Pages/VehicleMakeList';
import VehicleModelList from './Pages/VehicleModelList';
import ModifyMake from './Pages/ModifyMake';
import ModifyModel from './Pages/ModifyModel';
import AddNewSelect from './Pages/AddNewSelect';


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
        
        <Route exact path="/vehicle-make/list" component={VehicleMakeList} />
        <Route exact path="/add-new" component={AddNewSelect} />
        <Route exact path="/vehicle-make/edit-create-:urlParameter" component={ModifyMake} />
        
        <Route exact path="/vehicle-model/list" component={VehicleModelList} />
        <Route exact path="/vehicle-model/edit-create-:urlParameter" component={ModifyModel} />
        
        </div>
        
      </div>
      </Router>
    );
  }
}

export default App;
