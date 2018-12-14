import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';


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
        result[i].push(<li key={i+key} className={"item " + key.toLowerCase()}>{list[i][key]}</li>);
      }
    }
    
    for ( let i=0; i < result.length; i++) {
      result[i] = <ul key={i} className="list">{result[i]}</ul>;
    }
    return result;
  }
  
  
  renderPageList(pageCount) {
    let result = [];
    if (pageCount === 0) {
      result = <option key={1} value={1}> {1} </option>;
    } else {
      for (let i = 1; i < pageCount+1; i++) {
        result.push(<option key={i} value={i}> {i} </option>);
      }
    }
    return result;
  }
  
  
  handleSearch(e) {
    this.props.store.searchData(e.target.value);
  }
  
  
  handleQuantityChange(e) {
    this.props.store.quantitySetter(e.target.value);
  }
  
  
  handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const makeId = e.target.makeId.value;
    if (name !== '' && Number.isInteger(parseInt(makeId))) {
      this.props.store.addData(name, makeId);
      this.handleSortData('re-sort');
    } else {
      return;
    }
  }
  
  
  handleSortData(field) {  
    const sortInfo = this.props.store.sortData(field);
    if (sortInfo[0] !== '') {
      document.getElementById(sortInfo[0].toLowerCase()+'-caption').innerHTML = sortInfo[0];
    }

    document.getElementById(sortInfo[2].toLowerCase()+'-caption').innerHTML=sortInfo[2] + ' ' + sortInfo[1];
  }
  
  
  handlePageChange(e) {
    this.props.store.renderState.page = (e.target.value)
  }
  
  
  render() {
    const store = this.props.store;
    this.props.rootStore.getAbrv();
    
    //decalaring variables:
    const itemCount = store.count;
    const pageCount = store.pageCount();
    const currentPage = store.renderState.page;
    const quantity = store.renderState.quantity;
    const displayedItems = store.displayedItems;
    const startIndex = store.startIndex;
    const lastIndex = store.lastIndex;
    const searchTerm = store.renderState.searchTerm;
    
    return (
      <div className="model-list">
      
      <div className="create-form">
      <div className="description">
      Create new vehicle model:
      </div>
        <form onSubmit={e => this.handleSubmit(e)}>
        <div className="input-area">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" placeholder="Name" />
        </div>
        <div className="input-area">
        <label htmlFor="makeId">MakeId:</label>
        <input type="text" id="makeId" placeholder="Make Id" />
        </div>
        <button type="submit"> ADD MODEL </button>
        </form>
      </div>
      
      <div className="store-info">
      
      Matched items: <span className="info-value">{itemCount}</span><br />
      Current page: <span className="info-value">{currentPage}</span><br />
      Items per page: <span className="info-value">{quantity}</span><br />
      Displayed Items: <span className="info-value">{displayedItems}</span><br />
      Start index: <span className="info-value">{startIndex}</span><br />
      Last index: <span className="info-value">{lastIndex}</span><br />
      Search term: <span className="info-value">{searchTerm}</span><br />
      </div>
      
      <div className="search-input">
      search for vehicle model:
      <input type="text" id="searchInput" onChange={(event) => {this.handleSearch(event)}} placeholder="Type search term here" />
      </div>
      
      <div className="quantity-select">
      items per page:
      <select  value={store.renderState.quantity} className="select" onChange={(event) => {this.handleQuantityChange(event)}}>
      <option value={10}>10</option>
      <option value={20}>20</option>
      <option value={30}>30</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
      <option value={'all'}>All</option>
      </select>
      </div>
      
      <div className="page-select">
      page:
      <select value={store.renderState.page} id="pageSelect" className="select" onChange={(event) => {this.handlePageChange(event)}}>
      {this.renderPageList(pageCount)}
      </select>
      of {pageCount}
      </div>
      
      <div className="list-caption"><p id="id-caption" className="caption id" onClick={() => {this.handleSortData('Id')}}>Id</p><p id="name-caption" className="caption name" onClick={() => {this.handleSortData('Name')}}>Name</p><p id="makeid-caption" className="caption makeid" onClick={() => {this.handleSortData('MakeId')}}>MakeId</p><p id="abrv-caption" className="caption abrv" onClick={() => {this.handleSortData('Abrv')}}>Abrv</p></div>
      
      {this.renderItems(store)}
      
      </div>
      );
  }
}

export default VehicleMake;