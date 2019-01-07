import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { inject } from 'mobx-react';

@inject(stores => ({
  store: stores.rootStore.addNewSelectStore
}))
class AddNewSelect extends Component {
  
  render() {
    const {store} = this.props;
    
    return (
      <div className="home">
      <div className="section">
      <div className="card-panel">
      <h5 className="center-align">{store.heading}</h5>
      <div className="section">
        
        <div className="row">
        <Link to="/vehicle-make/edit-create-new" className="btn-large blue-grey col s6 m4 l3 offset-m1 offset-l2">{store.button1}</Link>
        <Link to="/vehicle-model/edit-create-new" className="btn-large blue-grey col s6 m4 l3 offset-m2 offset-l2">{store.button2}</Link>
        </div>
      
      </div>
      </div>
      </div>
      </div>

      );
  }
}

export default AddNewSelect;