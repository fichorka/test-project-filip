import { observable, action } from 'mobx';
import vehicleMakeStore from './VehicleMakeStore.jsx';
import vehicleModelStore from './VehicleModelStore';

class RootStore {
  @observable vehicleMakeStore = vehicleMakeStore;
  @observable vehicleModelStore = vehicleModelStore;
  
  @action getAbrv = () => {
    console.log('getAbrv()');
    const makeStore = this.vehicleMakeStore;
    for ( let i = 0; i < this.vehicleModelStore.data.length; i++ ) {
      const model = this.vehicleModelStore.data[i];
      const id = model.MakeId;
        model['Abrv'] = makeStore.getItemById(id).Abrv;
      
    }
  }
}

const rootStore = new RootStore();
export default rootStore;