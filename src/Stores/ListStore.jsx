import { observable, action, computed } from 'mobx';

class ListStore {
  
  @observable pageIndex = 0;
  @observable pageSize = 10;
  @observable specialVal = {
    Header: "MakeId",
    accessor: "MakeId",
    minWidth: 60
  };
  
  
  setSpecialVal(url) {
    if (url === '/vehicle-model-list' ) {
      this.specialVal.show = true;
    } else {
      this.specialVal.show = false;
    }
  }
  
  
  //PAGER:
  
  @action resetStore = () => {
    this.pageIndex = 0;
    this.pageSize = 10;
  }
  
  pageCount(elementCount) {
    return Math.ceil(elementCount / this.pageSize);
  }
  
  
  @computed get startIndex() {
    return ((this.pageIndex) * this.pageSize);
  }
  
  @action setPage = (newPageIndex) => {
    this.pageIndex = newPageIndex;
  }
  
  @action setPageSize = (newPageSize, newPageIndex) => {
    this.pageSize = newPageSize;
    this.pageIndex = newPageIndex;
  }
  
}

const listStore = new ListStore();
export default listStore;