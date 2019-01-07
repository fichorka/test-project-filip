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
  
  @action addElement = (element) => {
    this[this.targetStore].data.push(element);
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
  
  @computed get makeCount() {
    return this.vehicleMakeStore.data.length;
  }
  
  getAllAbrv() {
    const count = this.makeCount;
    let result = [];
    for (let i=0; i < count; i++) {
      let field = this.vehicleMakeStore.data[i];
      result.push({Id: field.Id, Abrv: field.Abrv});
    }
    return result;
  }
  
  getById(targetId) {
    const index = this.idToIndex(targetId);
    if (this[this.targetStore].data[index]) {
      return [true, this[this.targetStore].data.slice(index, index+1)[0]];
    } else {
      return [false];
    }
  }
  
  
  @action updateElement = (newElement) => {
    const id = Number(newElement.Id);
    const index = this.idToIndex(id);
    this[this.targetStore].data[index] = newElement;
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
  
  validate(target, targetId) {
    const field = target.id;
    let targetElement;
    const value = target.value;
    let isMake;
    if (this.targetStore === 'vehicleMakeStore') {
      isMake = true;
    } else {
      isMake = false;
    }
    for(let i=0; i < this.dataCount; i++) {
      targetElement = this[this.targetStore].data[i];
      if (targetId !== 'none') {
        if (isMake && targetId === targetElement.Id) {
          continue;
        } else if (!isMake && targetId !== targetElement.MakeId) {
          console.log('makeId skip ' + targetId);
          continue;
        }
      }
      if (targetElement[field] === value) {
        console.log('duplicate Element: ' + field);
        return false;
      }
    }
    return true
  }
  
  @computed get nextId() {
    return Number(this[this.targetStore].nextId);
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
    return false;
  }
  
  @computed get dataCount() {
    return this[this.targetStore].data.length;
  }
  
  
  @computed get targetCount() {
    return this[this.targetStore][this.targetData].length;
    
  }
}

const vehicleStore = new VehicleStore();
export default vehicleStore;