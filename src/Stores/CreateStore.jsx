class CreateStore {
  inputProps(store) {
    if (store === 'vehicleMakeStore') {
      return ['Abrv', 'text'];
    } else {
      return ['MakeId', 'number'];
    }
  }
}

const createStore = new CreateStore();
export default createStore;