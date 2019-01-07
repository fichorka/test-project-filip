import { observable } from 'mobx';

class VehicleModelStore {
  
  @observable data = [];
  @observable filteredData = [];
  @observable nextId = 1;
  @observable sorted;
  
}

const vehicleModelStore = new VehicleModelStore();
export default vehicleModelStore;