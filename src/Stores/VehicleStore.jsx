import { observable, action, computed } from 'mobx';

class VehicleStore {
  @observable VehicleMake =[];
  @observable VehicleModel =[];
  
  @action addMake = (name, abrv) => {
    const id = this.makesCount + 1;
    this.VehicleMake.push({
      Id: id,
      Name: name,
      Abrv: abrv
    });
  }
  
  @action addModel = (name, abrv, makeId) => {
    const id = this.modelsCount + 1;
    this.VehicleModel.push({
      Id: id,
      MakeId: makeId,
      Name: name,
      Abrv: abrv
    });
  }
  
  @computed get makesCount() {
    return this.VehicleMake.length;
  }
  
  @computed get modelsCount() {
    return this.VehicleModel.length;
  }
}

const store = new VehicleStore();
export default store;