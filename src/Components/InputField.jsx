import React, { Component } from 'react';
import { observer } from 'mobx-react';


@observer
class InputField extends Component {
  
  render() {
    const {inputField} = this.props;
    const {inputType} = this.props;
    const {value} = this.props;
    return(
      
      <div className="input-field">
        <label className="active" htmlFor={inputField} >{inputField}</label>
        <input type={inputType} id={inputField} defaultValue={value} required="required" />
      </div>
      
      );
    
  }
}

export default InputField;