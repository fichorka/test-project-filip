import { observable, action, computed } from 'mobx';

class VehicleMakeStore {
  
  @observable data = [];
  @observable searchedData = [];
  @observable renderState = {
    activeData: 'data',
    searchTerm: '',
    page: 1,
    quantity: 10,
    sortedBy: "Id",
    order: 'asc',
  };
  
  
  storeName() {
    return 'vehicleMakeStore';
  }
  
  
  pageCount() {
    console.log('pageCount');
    if ( this[this.renderState.activeData].length === 0 || this.renderState.quantity === 'all') {
      return 1;
    } else {
      return Math.ceil(this[this.renderState.activeData].length / this.renderState.quantity);
    }
  }
  
  
  captionText(target) {
    if (this.renderState.sortedBy === target) {
      return target + ' ' + this.renderState.order;
    }
    return target;
  }
  
  
  @computed get startIndex() {
    console.log('startIndex');
    if (this.renderState.quantity === 'all') {
      return 0;
    } else {
      return (this.renderState.page - 1) * this.renderState.quantity;
    }
  }
  
  
  @computed get lastIndex() {
    console.log('lastIndex');
    if (this.renderState.quantity === 'all') {
      return this[this.renderState.activeData].length;
    } else {
      return this.renderState.page * this.renderState.quantity;
    }
  }
  
  
  @computed get displayedItems() {
    console.log('displayedItems');
    return this[this.renderState.activeData].slice(this.startIndex, this.lastIndex).length;
  }
  
  
  @computed get count() {
    console.log('count');
    return this[this.renderState.activeData].length;
  }
  
  
  @action quantitySetter = (newQuantity) => {
    console.log('quantitySetter');
    if (newQuantity === 'all') {
      this.renderState.quantity = 'all';
    } else {
      this.renderState.quantity = newQuantity;
    }
    this.renderState.page = 1;
  }
  
  
  @action addData = (name, abrv) => {
    console.log('addData');
    const id = this.data.length;
    this.data.push({
      Id: id,
      Name: name,
      Abrv: abrv
    });
    this.sortData('re-sort');
  }
  
  
  @action sortData = (newSortKey) => {
    console.log('sortData');
    
    let previousSortKey = this.renderState.sortedBy;
    let previousOrder = this.renderState.order;
    let newOrder;
    
    if (newSortKey === 're-sort') {
      newSortKey = previousSortKey;
      newOrder = previousOrder;
    } else if (newSortKey !== previousSortKey) {
      newOrder = 'asc';
    } else if (previousOrder === 'asc') {
      newOrder = 'desc';
    } else {
      newOrder = 'asc'
    }
    
    if (newSortKey === 'Id') {
      if (newOrder === 'desc') {
        this.data.replace(this.data.slice().sort((a, b) => b[newSortKey] - a[newSortKey] ));
      } else {
        this.data.replace(this.data.slice().sort((a, b) => a[newSortKey] - b[newSortKey] ));
      }
    } else {
      let factor = 1;
      if ( newOrder === 'desc' ) {
        factor = -1;
      }
      
      this.data.replace(this.data.slice().sort((a, b) => {
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
    
    this.renderState.order = newOrder;
    this.renderState.sortedBy = newSortKey;
    if (this.renderState.searchTerm !== '') {
      this.searchData();
    }
    return [previousSortKey, this.renderState.order, newSortKey];
  }
  
  
  @action searchData = (term) => {
    console.log('searchData('+term+')');
    if (term !== undefined) {
      term = term.toString().toUpperCase();
      this.renderState.searchTerm = term;
    } else {
      term = this.renderState.searchTerm;
    }
    
    if (term === '') {
      this.searchedData = [];
      this.renderState.activeData = 'data';
    } else {
      let result = [];
      for (let i = 0; i < this.data.length; i++) {
        for (let key in this.data[i]) {
          if (this.data[i][key].toString().toUpperCase().indexOf(term) > -1) {
            result.push(this.data[i]);
            break;
          }
        }
      }
      this.renderState.activeData = 'searchedData';
      this.searchedData = result;
    }
    this.renderState.page = 1;
  }
  
  
  getItems = () => {
    console.log('getData');
    return this[this.renderState.activeData].slice(this.startIndex, this.lastIndex);
  }

}

const vehicleMakeStore = new VehicleMakeStore();
export default vehicleMakeStore;