import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import InputField from '../Components/InputField';
import StoreSelection from '../Components/StoreSelection';


@inject(stores => ({
  store: stores.rootStore.vehicleStore,
  createStore: stores.rootStore.createStore
}))
@observer
class Create extends Component {
  
  
  render() {
    
    const {store} = this.props;
    const {targetStore} = store;
    const {createStore} = this.props;
    const inputProps = createStore.inputProps(targetStore);
    const inputField = inputProps[0];
    const inputType = inputProps[1]
    const {nextId} = store;
    
    return (
      <div>
      <h3>Add to {targetStore}</h3>
      <StoreSelection />
      <p>Id: {nextId}</p>
      
      <div className="row">
      <form onSubmit={(e) => store.addElement(e)} className="col l4 m6 s10">
        
        <InputField inputField={'Name'} inputType={'text'}  />
        
        <InputField inputField={inputField} inputType={inputType} />
        
        <button type="Submit" className="waves-effect waves-light btn">Create</button>
        
      </form>
      </div>
      
      </div>     
      
      );
  }
}

export default Create;