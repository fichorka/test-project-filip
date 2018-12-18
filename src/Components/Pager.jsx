import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';


@observer
class Pager extends Component {
  
  
  renderPageList() {
    const pageCount = this.props.store.pageCount();
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
  
  
  handlePageChange(e) {
    this.props.store.renderState.page = (e.target.value);
  }
  
  
  handleQuantityChange(e) {
    this.props.store.quantitySetter(e.target.value);
  }
  
  
  render() {
    
    const store = this.props.store;
    const pageCount = store.pageCount();
    return (
      <div className="pager">
      
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
      
      </div>
      
      );
  }
  
}

export default Pager;