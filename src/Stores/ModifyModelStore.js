import { observable, computed, action } from 'mobx';

class ModifyModelStore {
  @observable isActionCreate = '';
  specId = 'none';
  @observable NameStatus = false;
  @observable submitError = false;
  @observable parameterError = false;
  abrvList = [];
  @observable element = {
    Id: '',
    Name: '',
    MakeId: '',
    Abrv: ''
  };
  
  @action validateMakeId = (makeId) => {
      this.specId = makeId;
  }
  
  @action setAbrv(makeId) {
    const abrvCount = this.abrvList.length;
    for (let i=0; i < abrvCount; i++) {
      const makeList = Object.assign({}, this.abrvList[i]);
      if (makeId === makeList.Id) {
        this.element.Abrv =  makeList.Abrv;
      }
    }
  }
  
  @action setStore = (parameter) => {
    this.parameter = parameter;
    if (parameter === 'new' ) {
      this.isActionCreate = true;
      this.specId = 'none';
      this.parameterError = false;
    } else if (Number.isInteger(Number(parameter))) {
      this.isActionCreate = false;
      this.element.Id = Number(parameter);
      this.parameterError = false;
    } else {
      this.isActionCreate = false;
      this.parameterError = true;
    }
  }
  
  resetStore() {
    this.element.Name = '';
    this.element.MakeId = '';
    this.element.Abrv = '';
    this.submitError = false;
    this.parameterError = false;
    this.NameStatus = false;
    this.storeAction = '';
  }
  
  validateInternal(e) {
    const field = e.target.id;
    const value = e.target.value;
    if (value = '') {
      this[field+'Status'] = false;
    } else {
      this[field+'Status'] = true;
    }
  }
  
  @computed get isValid() {
    if(this.NameStatus && !this.parameterError) {
      return true;
    } else {
      return false
    }
  }
  
  updateStatus(id) {
      const element = document.getElementById('Name-status');
      if (this.NameStatus) {
        this.fillStatus(element, 'VALID INPUT', 'good-input col l4 m6 s4');
      } else {
        this.fillStatus(element, 'VALUE ALREADY TAKEN', 'bad-input col l4 m6 s4');
      }
    }

  
  clearStatus(id) {
      const field = ['Name', 'MakeId'];
      const element = document.getElementById(id+'-status');
      this.fillStatus(element, '', ' ');

  }
  
  fillStatus(element, content, classType) {
    element.innerHTML = content;
    element.className= classType;
  }
  
}

const modifyModelStore = new ModifyModelStore();
export default modifyModelStore;