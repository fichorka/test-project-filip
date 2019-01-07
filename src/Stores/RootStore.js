import { observable } from 'mobx';
import vehicleStore from './VehicleStore';
import modifyMakeStore from './ModifyMakeStore';
import modifyModelStore from './ModifyModelStore';
import listStore from './ListStore';
import homeStore from './HomeStore';
import addNewSelectStore from './AddNewSelectStore';

class RootStore {
  @observable vehicleStore = vehicleStore;
  @observable listStore = listStore;
  @observable modifyMakeStore = modifyMakeStore;
  @observable modifyModelStore = modifyModelStore;
  @observable homeStore = homeStore;
  @observable addNewSelectStore = addNewSelectStore;
}

const rootStore = new RootStore();
export default rootStore;