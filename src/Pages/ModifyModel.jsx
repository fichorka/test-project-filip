import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import InputField from '../Components/InputField';
import SelectField from '../Components/SelectField';


@inject(stores => ({
  store: stores.rootStore.vehicleStore,
  modifyStore: stores.rootStore.modifyModelStore
}))
@observer
class ModifyModel extends Component {
  
  constructor(props) {
    console.log('constructor');
    super(props);
    
    const {store} = this.props;
    store.targetStore = 'vehicleModelStore';
    const {modifyStore} = this.props;
    const {urlParameter} = this.props.match.params;
    modifyStore.setStore(urlParameter);
    const {isActionCreate} = modifyStore;
    
    this.updateAbrvList();
    if (isActionCreate) {
      modifyStore.element.Id = Number(store.nextId);
    } else {
      const requestedElement = store.getById(modifyStore.element.Id);
      if (requestedElement[0]) {
        modifyStore.element = Object.assign({}, requestedElement[1]);
        modifyStore.specId = modifyStore.element.MakeId;
      } else {
        modifyStore.parameterError = true;
      }
    }
  }
  
  updateAbrvList() {
    const {store} = this.props;
    const {modifyStore} = this.props;
    if (store.makeCount > 0) {
      modifyStore.makeExists = true;
      modifyStore.abrvList = store.getAllAbrv();
    } else {
      modifyStore.makeExists = false;
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
  
  componentDidUpdate() {
    this.updateAbrvList();
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const {store} = this.props;
    const {modifyStore} = this.props;
    
    const makeId = Number(e.target.MakeId.value);
    modifyStore.specId = makeId;
    const {specId} = modifyStore;
    const name = e.target.Name;
    modifyStore.NameStatus = store.validate(name, specId);
    
    if (modifyStore.isValid) {
      modifyStore.element.Name = name.value;
      modifyStore.element.MakeId = makeId;
      modifyStore.setAbrv();
      const element = Object.assign({}, modifyStore.element);
      if (modifyStore.isActionCreate) {
        store.addElement(element);
        modifyStore.element.Id = store.nextId;
      } else {
        store.updateElement(element);
      }
    } else {
      console.log('submit error');
      modifyStore.submitError = true;
    }
    modifyStore.NameStatus = store.validate(name, specId);
    modifyStore.validateMakeId(Number(e.target.MakeId.value));
    modifyStore.updateStatus();
  }
  
  handleChange(e) {
    console.log('handleChange');
    const {store} = this.props;
    const {modifyStore} = this.props;
    const field = e.target.id;
    const newValue = e.target.value;
    const {specId} = modifyStore;
    
    if (newValue === '') {
      modifyStore.clearStatus(field);
      modifyStore[field+'Status'] = false;
    } else {
      if (field === 'Name') {
        modifyStore.element.Name = newValue
        modifyStore.NameStatus = store.validate(e.target, specId);
        modifyStore.updateStatus(field);
      } else {
        modifyStore.specId = Number(newValue);
        modifyStore.element.MakeId = Number(newValue);
        modifyStore.setAbrv();
        const target = {};
        target.id = "Name";
        target.value = modifyStore.element.Name;
        modifyStore.NameStatus = store.validate(target, modifyStore.specId);
      }
      modifyStore.updateStatus(field);
    }
    modifyStore.submitError = false;
  }
  
  render() {
    
    const {urlParameter} = this.props.match.params;
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
      <h3>{functionInfo} an element in VehicleModelStore</h3>
      
      <p className="error">{parameterInfo}</p>
      <div className="card-panel">
      <p>Id: {id}</p>
      <p>{originalName}</p>
      <p>{originalAbrv}</p>

      <form onSubmit={(e) => this.handleSubmit(e)} id="formz" onChange={e => this.handleChange(e)}>
      
      <InputField inputField="Name" inputType="text" inputValue={element.Name} />
      
      <SelectField listItems={modifyStore.abrvList}
      inputField="MakeId" inputValue={element.MakeId}/>
      
      <button type="Submit" id="submit-button" className="waves-effect waves-light btn">Submit</button>
      <p className="error">{submitInfo}</p>
      </form>

      </div>
      </div>
      );
  }
}

export default ModifyModel;