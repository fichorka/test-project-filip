import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import InputField from '../Components/InputField';


@inject(stores => ({
  store: stores.rootStore.vehicleStore
}))
@observer
class EditElement extends Component {
  
  render() {
    const {store} = this.props;
    const element = store.getById(this.props.match.params.id);
    const id = Number(this.props.match.params.id);
    
    const specialValue = () => {
      if ( store.targetStore === 'vehicleMakeStore' ) {
        return ['Abrv', 'text'];
      } else {
        return ['MakeId', 'number'];
      }
    }
    
    return (
      <div>
      <p>Id: {element.Id}</p>
      <p>Name: {element.Name}</p>
      <p>{specialValue()[0]}: {element[specialValue()[0]]}</p>
      <div className="row">
      
      <form onSubmit={(e) => store.updateData(id, e)} className="col l4 m6 s10">
        <InputField inputField="Name" inputType="text" value={element.Name} />
        <InputField inputField={specialValue()[0]} inputType={specialValue()[1]} value={element[specialValue()[0]]} />
        <button type="Submit" className="waves-effect waves-light btn">Edit</button>
      </form>
      
      </div>
      </div>     
      );
  }
}

export default EditElement;