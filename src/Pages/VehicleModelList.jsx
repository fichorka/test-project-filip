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
      <FilterComponent />
      <List url={this.props.match.url} />
      </div>
      );
  }
}

export default VehicleModelList;