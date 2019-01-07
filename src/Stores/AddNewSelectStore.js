import { observable } from 'mobx';

class AddNewSelectStore {
  @observable heading = 'Select a store';
  @observable button1 = 'Vehicle Make';
  @observable button2 = 'Vehicle Model';
}

const addNewSelectStore = new AddNewSelectStore();
export default addNewSelectStore;