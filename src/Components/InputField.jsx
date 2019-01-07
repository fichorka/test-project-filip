import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';


@observer
class InputField extends Component {
 
  render() {
    const {inputField} = this.props;
    const {inputType} = this.props;
    const {inputValue} = this.props;
    const {parameterError} = this.props;
   
    return(
      
      <div className="input-field">
        <label className="active" htmlFor={inputField} >{inputField}</label>
        <div className="row">
        <input type={inputType} id={inputField} defaultValue={inputValue} required="required" className="col l8 m6 s8" />
        <p id={inputField+"-status"} className="col l4 m6 s4"></p>
        </div>
      </div>
      
      
      );
    
  }
}

export default InputField;