import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';


@inject((stores) => ({
  store: stores.rootStore.vehicleStore,
  listStore: stores.rootStore.listStore
}))
@observer
class FilterComponent extends Component {
  
  
  handleSubmit = (e) => {
    e.preventDefault();
    const term = String(e.target.searchinput.value).toUpperCase();
    if (term !== '' && term !== undefined && term !== null) {
      this.props.store.filterData(term);
      this.props.listStore.resetStore();
    } else {
      this.props.store.resetStore();
      this.props.listStore.resetStore();
    }
  }
  
  
  render() {
    
    const {store} = this.props;
    
    return (
      
      <div className="row">
      <p>Active search term: {store.previousTerm}</p>
      <form onSubmit={this.handleSubmit}>
      
        <div className="input-field col l7 m8 s10">
          <input type="text" className="validate col l5 m7 s9 active" id="searchinput" />
          <label className="active" htmlFor="searchinput">search</label>
          
          <button type="submit" value="Submit" className="waves-effect waves-light btn"><i className="material-icons">search</i></button>
        </div>
        
      </form>
      </div>
      
      );
  }
}

export default FilterComponent;