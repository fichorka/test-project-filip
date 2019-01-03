import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';


@inject(stores => ({
  store: stores.rootStore.vehicleStore,
}))
@observer
class StoreSelection extends Component {
  
  componentDidMount() {
    if (this.props.store.targetStore === 'vehicleMakeStore') {
      document.getElementById('make').setAttribute('checked', 'checked'); 
    } else {
      document.getElementById('model').setAttribute('checked', 'checked');
    }
  }
  
  render() {
    
    const {store} = this.props;
    
    return(
      <form value={store.targetStore} onChange={(e) => {store.targetStore = e.target.value}}>
        <p>
        <label htmlFor="make">
        <input name="group1" id="make" value="vehicleMakeStore" type="radio"  />
        <span>Vehicle make</span>
        </label>
        </p>
        <p>
        <label htmlFor="model">
        <input name="group1" id="model" value="vehicleModelStore" type="radio"  />
        <span>Vehicle model</span>
        </label>
        </p>
      </form>
      );
    
  }
}

export default StoreSelection;