import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div className="navbar navbar-light bg-light">
        <Link to="/">
          <h3>Math Recall</h3>
        </Link>
      </div>
    );
  }
}

export default NavBar;
