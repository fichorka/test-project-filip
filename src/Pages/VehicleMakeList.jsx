import React, { Component } from 'react';
import { inject } from 'mobx-react';
import List from '../Components/List';
import FilterComponent from '../Components/FilterComponent';
import 'react-table/react-table.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


@inject((stores) => ({
  store: stores.rootStore.vehicleStore
}))
class VehicleMakeList extends Component {
  
  componentDidMount() {
    this.props.store.setTargetStore('vehicleMakeStore');
    this.props.store.resetStore()
  }
  
  render() {
    return (
      <div>
      <h3>VehicleMakeStore</h3>
      <FilterComponent />
      <List baseUrl='/vehicle-make' />
      </div>
      );
  }
}

export default VehicleMakeList;