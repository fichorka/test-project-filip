import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


@inject((stores) => ({
  store: stores.rootStore.vehicleStore,
  listStore: stores.rootStore.listStore
}))
@observer
class List extends Component {
  
  
  componentDidMount() {
    this.props.listStore.setSpecialVal(this.props.url);
  }
  
  componentWillUnmount() {
    this.props.listStore.resetStore();
  }
  
  
  render() {
    const {store} = this.props;
    const {listStore} = this.props;
    
    return (
      <div>
      <ReactTable 
      data={store.getByRange(listStore.startIndex, listStore.pageSize)} 
      page={listStore.pageIndex} 
      pageSize={listStore.pageSize}
      pages={listStore.pageCount(store.targetCount)}
      sorted={store[store.targetStore].sorted}
      pageSizeOptions={[5, 10, 20, 25, 50, 100]}
      manual

      columns={[
        {
          Header: "Id",
          accessor: "Id",
          minWidth: 40,
          maxWidth: 60
        },
        {
          Header: "Name",
          accessor: "Name",
          minWidth: 100
        },
        {
          Header: "Abrv",
          accessor: "Abrv",
          minWidth: 80
        },
        listStore.specialVal,
        {
          Header: "Actions",
          accessor: 'Id',
          minWidth: 60,
          maxWidth: 70,
          sortable: false,
          Cell: props => <span><Link className="actions" to={`${this.props.url}/edit-element/${props.value}`}><i className="material-icons">edit</i></Link> <span className="actions" onClick={(event) => store.deleteById(props.value, event)}><i className="material-icons">delete_forever</i></span></span>
        }
        ]}
        
        className="-striped -highlight" 
        onPageChange={(pageIndex) => {listStore.setPage(pageIndex)}}
        onSortedChange={(newSorted) => {store.sortData(newSorted)}}
        onPageSizeChange={(pageSize, pageIndex) => {listStore.setPageSize(pageSize, pageIndex)}}
        />
      </div>
      );
  }
}

export default List;