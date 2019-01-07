import { observable } from 'mobx';

class HomeStore {
  @observable heading = 'Select a store';
  @observable button1 = 'Vehicle Make';
  @observable button2 = 'VehicleModel';
  @observable button1Link = '/vehicle-make/list';
  @observable button2Link = '/vehicle-model/list';
  
}

const homeStore = new HomeStore();
export default homeStore;