import React, { Component } from "react";
import CellGrid from "./CellGrid";
import "./TopGrid.css";

class TopGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let rows = [1, 2, 3];
    return (
      <div className="top-grid">
        {rows.map((row) => {
          return (
            <div className="top-grid-row">
              {rows.map((row) => (
                <CellGrid />
              ))}{" "}
            </div>
          );
        })}
      </div>
    );
  }
}

export default TopGrid;
