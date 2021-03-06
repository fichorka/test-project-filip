import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { inject, observer } from 'mobx-react';


@inject(stores => ({
  store: stores.rootStore.homeStore
}))
@observer
class Home extends Component {
  
  render() {
    const {store} = this.props;
    
    return (
      <div className="home">
      <div className="section">
      <div className="card-panel">
      <h5 className="center-align">{store.heading}</h5>
      <div className="section">
        
        <div className="row">
        <Link to={store.button1Link} className="btn-large blue-grey col s6 m4 l3 offset-m1 offset-l2">{store.button1}</Link>
        <Link to={store.button2Link} className="btn-large blue-grey col s6 m4 l3 offset-m2 offset-l2">{store.button2}</Link>
        </div>
      
      </div>
      </div>
      </div>
      </div>

      );
  }
}

export default Home;