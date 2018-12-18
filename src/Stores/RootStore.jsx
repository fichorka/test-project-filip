import { observable, action } from 'mobx';
import vehicleMakeStore from './VehicleMakeStore.jsx';
import vehicleModelStore from './VehicleModelStore';


class RootStore {
  
  
  @observable vehicleMakeStore = vehicleMakeStore;
  @observable vehicleModelStore = vehicleModelStore;
  
  
  @action getAbrv = () => {
    console.log('getAbrv()');
    const makeStore = this.vehicleMakeStore;
    const modelStore = this.vehicleModelStore;
    
    for ( let i=0; i < modelStore.data.length; i++ ) {
      const makeId = modelStore.data[i].MakeId;
      
      for (let j=0; j < makeStore.data.length; j++) {
        if ( makeId === makeStore.data[j].Id ) {
          
          modelStore.data[i].Abrv = makeStore.data[j].Abrv;
        }
      }
    }
  }
  
  
}

const rootStore = new RootStore();
export default rootStore;