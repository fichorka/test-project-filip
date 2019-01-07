import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import InputField from '../Components/InputField';


@inject(stores => ({
  store: stores.rootStore.vehicleStore,
  modifyStore: stores.rootStore.modifyMakeStore
}))
@observer
class ModifyMake extends Component {
  
  constructor(props) {
    super(props);
    
    const {store} = this.props;
    store.targetStore = 'vehicleMakeStore';//change this!
    const {modifyStore} = this.props;
    const {urlParameter} = this.props.match.params;
    modifyStore.setStore(urlParameter);
    const {isActionCreate} = modifyStore;
    const {Id} = modifyStore.element;
    
    if (isActionCreate) {
      console.log('create setting');
      modifyStore.element.Id = Number(store.nextId);
    } else {
      console.log('edit setting');
      const requestedElement = store.getById(Id);
      if (requestedElement[0]) {
        modifyStore.element = Object.assign({}, requestedElement[1]);
      } else {
        modifyStore.parameterError = true;
      }
    }
  }
  
  componentDidMount() {
    console.log('componentDidMount');
    if (this.props.modifyStore.parameterError) {
      document.getElementById('submit-button').setAttribute('disabled', 'disabled');
      document.getElementsByTagName('input')[0].setAttribute('disabled', 'disabled');
      document.getElementsByTagName('input')[1].setAttribute('disabled', 'disabled');
    }
  }
  
  componentWillUnmount() {
    this.props.modifyStore.resetStore();
  }
  
  handleSubmit(e) {
    console.log('handleSubmit');
    e.preventDefault();
    const {store} = this.props;
    const {modifyStore} = this.props;
    const {idToSkip} = modifyStore;
    modifyStore.NameStatus = store.validate(e.target.Name, idToSkip);
    modifyStore.AbrvStatus = store.validate(e.target.Abrv, idToSkip);
    const element = Object.assign({}, modifyStore.element);
    
    if (modifyStore.isValid) {
      console.log('valid');
      if (modifyStore.isActionCreate) {
        store.addElement(element);
        modifyStore.element.Id = store.nextId;
      } else {
        console.log('update');
        store.updateElement(element);
      }
    } else {
      modifyStore.submitError = true;//not applying. y?
    }
    modifyStore.NameStatus = store.validate(e.target.Name, idToSkip);
    modifyStore.AbrvStatus = store.validate(e.target.Abrv, idToSkip);
    modifyStore.updateStatus();
  }
  
  handleChange(e) {
    console.log('handleChange');
    const {store} = this.props;
    const {modifyStore} = this.props;
    const field = e.target.id;
    const newValue = e.target.value;
    const {idToSkip} = modifyStore;
    
    modifyStore.element[field] = newValue;
    if (newValue === '') {
      modifyStore.clearStatus(field);
      modifyStore[field+'Status'] = false;
    } else {
      modifyStore[field+'Status'] = store.validate(e.target, idToSkip);
      modifyStore.updateStatus(field);
    }
    modifyStore.submitError = false;
  }
  
  render() {
    
    const {urlParameter} = this.props.match.params;
    const {store} = this.props;
    const {modifyStore} = this.props;
    const {isActionCreate} = modifyStore;
    const {element} = modifyStore;
    const {submitError} = modifyStore;
    const {parameterError} = modifyStore;
    
    const functionInfo = isActionCreate ? 'Create' : 'Edit';
    const id = modifyStore.element.Id;
    const originalName = !isActionCreate ? 'Original name: ' + element.Name : '';
    const originalAbrv = !isActionCreate ? 'Original abrv: ' + element.Abrv : '';
    
    const parameterInfo = parameterError ? `Invalid parameter: ${urlParameter}` : '';
    const submitInfo = submitError ? 'Unable to submit, invalid input' : '';
    
    return (
      <div>
      <h3>{functionInfo} an element in VehicleMakeStore</h3>
      
      <p className="error">{parameterInfo}</p>
      <div className="card-panel">
      <p>Id: {id}</p>
      <p>{originalName}</p>
      <p>{originalAbrv}</p>

        <form onSubmit={(e) => this.handleSubmit(e)} id="formz" onChange={e => this.handleChange(e)}>
        
          <InputField inputField="Name" inputType="text" inputValue={element.Name} />
          <InputField inputField="Abrv" inputType="text" inputValue={element.Abrv} />
          <button type="Submit" id="submit-button" className="waves-effect waves-light btn">Submit</button>
          <p className="error">{submitInfo}</p>
        </form>

        </div>
      </div>
      );
  }
}

export default ModifyMake;