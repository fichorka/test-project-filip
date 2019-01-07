import { observable, computed, action } from 'mobx';

class ModifyMakeStore {
  isActionCreate = '';
  idToSkip = 'none';
  @observable NameStatus;
  @observable AbrvStatus;
  @observable element = {
    Id: '',
    Name: '',
    Abrv: ''
  };
  @observable submitError = false;
  @observable parameterError = false;
  
  @action setStore = (parameter) => {
    this.parameter = parameter;
    if (parameter === 'new' ) {
      this.isActionCreate = true;
      this.idToSkip = 'none';
      this.parameterError = false;
    } else if (Number.isInteger(Number(parameter))) {
      this.isActionCreate = false;
      this.idToSkip = Number(parameter);
      this.element.Id = Number(parameter);
      this.parameterError = false;
    } else {
      this.isActionCreate = false;
      this.parameterError = true;
    }
  }
  
  resetStore() {
    this.element.Name = '';
    this.element.Abrv = '';
    this.submitError = false;
    this.parameterError = false;
    this.NameStatus = false;
    this.AbrvStatus = false;
    this.storeAction = '';
  }
  
  @computed get isValid() {
    if(this.NameStatus && this.AbrvStatus) {
      return true;
    } else {
      return false;
    }
  }
  
  updateStatus(id) {
    let i = 0;
    let field = ['Name', 'Abrv'];
    if (id) {
      field[1] = id;
      i = 1;
    }
    for (i ; i < 2; i++) {
      
      const element = document.getElementById(field[i]+'-status');
      if (this[field[i]+'Status']) {
        this.fillStatus(element, 'VALID INPUT', 'good-input col l4 m6 s4');
      } else {
        this.fillStatus(element, 'VALUE ALREADY TAKEN', 'bad-input col l4 m6 s4');
      }
    }
  }
  
  clearStatus(id) {
    const field = ['Name', 'Abrv'];
    const element = document.getElementById(id+'-status');
    this.fillStatus(element, '', ' ');

  }
  
  fillStatus(element, content, classType) {
    element.innerHTML = content;
    element.className= classType;
  }
  
}

const modifyMakeStore = new ModifyMakeStore();
export default modifyMakeStore;