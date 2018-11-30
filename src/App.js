import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx';


@inject('store')
@observer
class App extends Component {
  
  @observable isMake = true;
  
  handleSubmit = (e) => {
    e.preventDefault();
    const name = this.name.value;
    const abrv = this.abrv.value;
    this.name.value = '';
    this.abrv.value = '';
    if(this.isMake) {
      this.props.store.addMake(name, abrv);
    } else {
      const makeId = this.makeId.value;
      this.props.store.addModel(name, abrv, makeId);
      this.makeId.value = '';
    }
  }
  
  @action handleChange = () => {
    this.isMake = !this.isMake;
    this.name.value = '';
    this.abrv.value = '';
    this.makeId.value = '';
  }
  
  render() {
    const {store} = this.props;
    return (
      <div className="App">
        <h2>Number of objects:</h2>
        <p>{store.makesCount + store.modelsCount} in total</p>
        <p>{store.makesCount} in VehicleMake</p>
        <p>{store.modelsCount} in VehicleModel</p>
        
        {/*To do: make separate component from .object-creation*/}
        <div className="object-creation">
          <h1>Create a new object</h1>
          <form onSubmit={e => this.handleSubmit(e)}>
            <div className="input-area">
              <label htmlFor="type2">Select object type:</label>
              <select value={this.isMake} id="type2" onChange={this.handleChange}>
                <option value={true}>VehicleMake</option>
                <option value={false}>VehicleModel</option>
              </select>
            </div>
            <div className="input-area">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" placeholder="Name" ref={input => this.name = input}/>
            </div>
            <div className="input-area">
              <label htmlFor="abrv">Abrevation:</label>
              <input type="text" id="abrv" placeholder="Abrv" ref={input => this.abrv = input}/>
            </div>
            <div className="input-area">
              <label htmlFor="makeId">MakeId:</label>
              <input type="text" id="makeId" placeholder="MakeId" disabled={this.isMake} ref={input => this.makeId = input}/>
            </div>
            <button> Add Make </button>
          </form>
        </div>
        
        {/* To do: make a separate component from .list-objects*/}
        <div className="list-objects">
          <div className="object-collection">
            <h2>VehicleMake</h2>
            <div className="object-list-group">
              {store.VehicleMake.map(element => (
                <ul className="object-list">
                  <li>
                    Id: {element.Id}
                  </li>
                  <li>
                    Name: {element.Name}
                  </li>
                  <li>
                    Abrv: {element.Abrv}
                  </li>
                </ul>
              ))}
            </div>
          </div>
          
          <div className="object-collection">
            <h2>VehicleModel</h2>
            <div className="object-list-group">
              {store.VehicleModel.map(element => (
                <ul className="object-list">
                  <li>
                    Id: {element.Id}
                  </li>
                  <li>
                    MakeId: {element.MakeId}
                  </li>
                  <li>
                    Name: {element.Name}
                  </li>
                  <li>
                    Abrv: {element.Abrv}
                  </li>
                </ul>
              ))}
              </div>
            </div>
          </div>
         
        
      </div>
    );
  }
}

export default App;
