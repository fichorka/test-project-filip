import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import M from 'materialize-css/dist/js/materialize.min.js';

@inject(stores => ({
  modifyStore: stores.rootStore.modifyModelStore
}))
@observer
class SelectField extends Component {
  
  
  componentDidMount() {
    const {listItems} = this.props;
    const {inputField} = this.props;
    if (listItems.length === 0) {
      document.getElementById(inputField).setAttribute('disabled', 'disabled');
    }
    
    //initialize Materialize select:
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }
  
  
  render() {
    
    const {modifyStore} = this.props;
    const {inputField} = this.props;
    const {inputValue} = this.props;
    
    let optionsList;
    if (modifyStore.makeExists) {
      const {listItems} = this.props;
      optionsList = listItems.map(elem =>
        <option value={elem.Id}>{elem.Id} {elem.Abrv}</option>
        );
    }
    
    return(
      <div className="row">
      <div className="input-field col l8 m6 s8">
      <select id={inputField} required="required" defaultValue={inputValue}>
      {optionsList}
      </select>
      <label htmlFor={inputField}>{inputField}</label>
      </div>
      <p id={inputField+"-status"} className="col l4 m6 s4"></p>
      </div>
      );
    
  }
}

export default SelectField;