import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';


@observer
class Create extends Component {
  
  
  handleSubmit(e) {
    e.preventDefault();
    const name = String(e.target.name.value);
    let specInput;
    
    if ( name !== '' ) {
      if ( this.props.store.storeName() ===  'vehicleMakeStore') {
        specInput = String(e.target.abrv.value);
        if ( specInput === '' ) {
          return;
        }
      } else {
        specInput = parseInt(e.target.makeId.value);
        if ( !Number.isInteger(specInput) ) {
          return;
        }
      }
      this.props.store.addData(name, specInput);
      return;
    } else {
      return;
    }
  }
  
  
  inputElement() {
    if (this.props.store.storeName() === 'vehicleMakeStore') {
      return (
        <div className="input-area">
        <label htmlFor="abrv">Abbrevation:</label>
        <input type="text" id="abrv" placeholder="Abrv" />
        </div>
        );
    } else {
      return (
        <div className="input-area">
        <label htmlFor="makeId">MakeId:</label>
        <input type="text" id="makeId" placeholder="Make Id" />
        </div>
        );
    }
  }
  
  
  render() {
    
    const type = this.props.store.storeName() === 'vehicleMakeStore' ? 'make' : 'model';
    
    return (
      
      <div className="create-form">
      <div className="description">
      Create new vehicle {type}:
      </div>
      
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="input-area">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" placeholder="Name" />
          </div>
          
          {this.inputElement()}
          
          <button type="submit"> Add {type} </button>
        </form>
      </div>     
      
      );
  }
}

export default Create;