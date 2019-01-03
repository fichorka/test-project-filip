import { observable } from 'mobx';

class VehicleMakeStore {
  
  @observable data = [];
  @observable filteredData = [];
  @observable nextId = 1;
  @observable sorted;
  
}

const vehicleMakeStore = new VehicleMakeStore();
export default vehicleMakeStore;