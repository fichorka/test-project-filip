import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Create from './Create';
import Pager from './Pager';


@inject(stores => ({
  store: stores.rootStore.vehicleModelStore,
  rootStore: stores.rootStore
}))
@observer
class VehicleMake extends Component {
  
  
  renderItems(store) {
    const list = store.getItems();
    let result = [];
    
    for( let i=0; i < list.length; i++ ) {
      result[i] = [];
      for ( let key in list[i] ) {
        result[i].push(<td key={i+key} className={"item " + key.toLowerCase()}>{list[i][key]}</td>);
      }
    }
    
    for ( let i=0; i < result.length; i++) {
      result[i] = <tr key={i} className="list">{result[i]}</tr>;
    }
    return result;
  }
  
  
  handleSearch(e) {
    this.props.store.searchData(e.target.value);
  }
  
  
  handleSortData(field) {  
    const sortInfo = this.props.store.sortData(field);
    if (sortInfo[0] !== '') {
      document.getElementById(sortInfo[0].toLowerCase()+'-caption').innerHTML = sortInfo[0];
    }

    document.getElementById(sortInfo[2].toLowerCase()+'-caption').innerHTML=sortInfo[2] + ' ' + sortInfo[1];
  }
  
  
  render() {
    const store = this.props.store;
    this.props.rootStore.getAbrv();
    
    //decalaring variables:
    const itemCount = store.count;
    const pageCount = store.pageCount();
    const currentPage = store.renderState.page;
    const displayedItems = store.displayedItems;
    const startIndex = store.startIndex;
    const lastIndex = store.lastIndex;
    const searchTerm = store.renderState.searchTerm;
    
    return (
      <div className="model-list">
      
      <Create store={this.props.store} />
      
      <div className="store-info">
      
      Matched items: <span className="info-value">{itemCount}</span><br />
      Current page: <span className="info-value">{currentPage}</span><br />
      Displayed Items: <span className="info-value">{displayedItems}</span><br />
      Start index: <span className="info-value">{startIndex}</span><br />
      Last index: <span className="info-value">{lastIndex}</span><br />
      Search term: <span className="info-value">{searchTerm}</span><br />
      </div>
      
      <div className="search-input">
      search for vehicle model:
      <input type="text" id="searchInput" onChange={(event) => {this.handleSearch(event)}} placeholder="Type search term here" />
      </div>
      
      <Pager store={this.props.store} />
      
      <div className="list-caption"><p id="id-caption" className="caption id" onClick={() => {this.handleSortData('Id')}}>{store.captionText('Id')}</p><p id="name-caption" className="caption name" onClick={() => {this.handleSortData('Name')}}>{store.captionText('Name')}</p><p id="makeid-caption" className="caption makeid" onClick={() => {this.handleSortData('MakeId')}}>{store.captionText('MakeId')}</p><p id="abrv-caption" className="caption abrv" onClick={() => {this.handleSortData('Abrv')}}>{store.captionText('Abrv')}</p></div>
      
      <table className="data-table">
      {this.renderItems(store)}
      </table>
      
      </div>
      );
  }
}

export default VehicleMake;