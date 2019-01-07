import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Navbar extends Component {
  
  render() {
    return (
      <nav>
      <div className="nav-wrapper grey ">
      <Link to="/" className="brand-logo right">Vehicle stores</Link>
      <ul id="nav-mobile" className="left hide-on-small-only">
        <li><Link to="/vehicle-make/list">Vehicle Makes</Link></li>
        <li><Link to="/vehicle-model/list">Vehicle Models</Link></li>
        <li><Link to="/add-new">Add new</Link></li>
      </ul>
      </div>
      </nav>
      );
  }
}

export default Navbar;