import { observable } from 'mobx';
import vehicleStore from './VehicleStore.jsx';
import listStore from './ListStore';
import createStore from './CreateStore';


class RootStore {
  @observable vehicleStore = vehicleStore;
  @observable listStore = listStore;
  @observable createStore = createStore;
}

const rootStore = new RootStore();
export default rootStore;