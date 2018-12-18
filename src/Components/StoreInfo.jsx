import React, { Component } from 'react';

class StoreInfo extends Component {
  
  
  render() {
    const store = this.props.store;
    
    const itemCount = store.count;
    const pageCount = store.pageCount();
    const currentPage = store.renderState.page;
    const displayedItems = store.displayedItems;
    const startIndex = store.startIndex;
    const lastIndex = store.lastIndex;
    const searchTerm = store.renderState.searchTerm;
    
    return (
      
      <div className="store-info">
        Matched items: <span className="info-value">{itemCount}</span><br />
        Current page: <span className="info-value">{currentPage}</span><br />
        Displayed Items: <span className="info-value">{displayedItems}</span><br />
        Start index: <span className="info-value">{startIndex}</span><br />
        Last index: <span className="info-value">{lastIndex}</span><br />
        Search term: <span className="info-value">{searchTerm}</span><br />
      </div>
      
      );
  }
  
  
}

export default StoreInfo;