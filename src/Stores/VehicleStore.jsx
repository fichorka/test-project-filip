import { observable, action, computed } from 'mobx';
import vehicleMakeStore from './VehicleMakeStore';
import vehicleModelStore from './VehicleModelStore';

class VehicleStore {
  @observable vehicleMakeStore = vehicleMakeStore;
  @observable vehicleModelStore = vehicleModelStore;
  @observable targetStore = 'vehicleMakeStore';
  @observable targetData = 'data';
  @observable previousTerm = '';
  

  @action resetStore = () => {
    this.targetData = 'data';
    this.previousTerm = '';
  }
  
  
  @action filterData = (term) => {
    let result = [];
    for (let i = 0; i < this.dataCount; i++) {
      for (let key in this[this.targetStore].data[i]) {
        if (this[this.targetStore].data[i][key].toString().toUpperCase().indexOf(term) > -1) {
          result.push(this[this.targetStore].data[i]);
          break;
        }
      }
    }
    this[this.targetStore].filteredData = result;
    this.targetData = 'filteredData';
    this.previousTerm = term;
  }

  
  
  
  @action sortData = (sortData) => {
    const newSortKey = sortData[0].id;
    const newOrder = sortData[0].desc ? 'desc' : 'asc';
    const {data} = this[this.targetStore];
    
    if (newSortKey === 'Id') {
      if (newOrder === 'desc') {
        data.replace(data.slice().sort((a, b) => b[newSortKey] - a[newSortKey] ));
      } else {
        data.replace(data.slice().sort((a, b) => a[newSortKey] - b[newSortKey] ));
      }
    } else {
      let factor = 1;
      if ( newOrder === 'desc' ) {
        factor = -1;
      }
      data.replace(data.slice().sort((a, b) => {
        if (a[newSortKey] > b[newSortKey]) {
          return factor;
        } 
        else if (a[newSortKey] < b[newSortKey]) {
          return -factor;
        } 
        else {
          return 0;
        }
      }));
    }
    
    this[this.targetStore].sorted = sortData;
    if (this.targetData === 'filteredData') {
      this.filterData(this.previousTerm);
    }
  }
  
  
  
  @action syncData = () => {
    const makeLength = this.vehicleMakeStore.data.length;
    const modelLength = this.vehicleModelStore.data.length;
    for ( let i=0; i < modelLength; i++ ) {
      let match = false;
      const makeId = this.vehicleModelStore.data[i].MakeId;
      for (let j=0; j < makeLength; j++) {
        if ( makeId === this.vehicleMakeStore.data[j].Id) {
          this.vehicleModelStore.data[i].Abrv = this.vehicleMakeStore.data[j].Abrv;
          match = true;
        }
      }
      if (!match) {
        this.vehicleModelStore.data[i].Abrv = '';
      }
    }
  }
  
  //ˇˇCRUD
  
  @action addElement = (e) => {
    e.preventDefault();
    const newElement = {};
    newElement.Id = this.nextId;
    newElement.Name = e.target.Name.value;
    if (this.targetStore === 'vehicleMakeStore') {
      newElement.Abrv = e.target.Abrv.value;
    } else {
      newElement.MakeId = Number(e.target.MakeId.value);
    }
    this[this.targetStore].data.push(newElement);
    this[this.targetStore].nextId++;
    this.syncData();
    this.sortData([{
      id: 'Id',
      desc: false
    }]);
  }
  
  
  getByRange(startIndex, range) {
    return this[this.targetStore][this.targetData].slice(startIndex, (startIndex + range));
  }
  
  getById(targetId) {
    const index = this.idToIndex(targetId);
    return this[this.targetStore].data[index];
  }
  
  
  @action updateData = (targetId, e) => {
    e.preventDefault();
    const index = this.idToIndex(targetId);
    const updatedElement = {};
    updatedElement.Id = Number(targetId);
    updatedElement.Name = e.target.Name.value;
    if( this.targetStore === 'vehicleMakeStore') {
      updatedElement.Abrv = e.target.Abrv.value;
    } else {
      updatedElement.MakeId = Number(e.target.MakeId.value);
    }
    this[this.targetStore].data[index] = updatedElement;
    this.syncData();
  }
  
  @action deleteById = (targetId) => {
    if( window.confirm('Delete item with Id ' + targetId + '?') ) {
      const index = this.idToIndex(targetId);
      this[this.targetStore].data.splice(index, 1);
      this.syncData();
    }
  }
  
  //^^CRUD
  
  //Helpers:
  
  @computed get nextId() {
    return this[this.targetStore].nextId;
  }
  
  @action setTargetStore = (target) => {
    this.targetStore = target;
  }
  
  idToIndex(targetId) {
    const id = Number(targetId);
    let i = 0;
    for ( i = 0; i < this.dataCount; i++ ) {
      if (Number(this[this.targetStore].data[i].Id) === id) {
        return i;
      }
    }
  }
  
  @computed get dataCount() {
    return this[this.targetStore].data.length;
  }
  
  
  @computed get targetCount() {
    return this[this.targetStore][this.targetData].length;
    
  }
  
  
  //^^Helpers
  
  
  
}

const vehicleStore = new VehicleStore();
export default vehicleStore;