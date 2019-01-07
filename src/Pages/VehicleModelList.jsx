import React, { Component } from 'react';
import { inject } from 'mobx-react';
import List from '../Components/List';
import FilterComponent from '../Components/FilterComponent';
import 'react-table/react-table.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


@inject((stores) => ({
  store: stores.rootStore.vehicleStore
}))
class VehicleModelList extends Component {
  
  componentDidMount() {
    this.props.store.setTargetStore('vehicleModelStore');
    this.props.store.resetStore();
  }
  
  render() {
    return (
      <div>
      <h3>VehicleModelStore</h3>
      <FilterComponent />
      <List baseUrl='/vehicle-model' />
      </div>
      );
  }
}

export default VehicleModelList;