import React, { Component } from "react";
import "./CellGrid.css";

class CellGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let rowNums = [1, 2, 3];
    return (
      <div className="cell-container">
        {rowNums.map((row) => {
          return rowNums.map((row) => <div class="cell">{row}</div>);
        })}
      </div>
    );
  }

  renderCells() {
    let rowNums = [1, 2, 3];
    return rowNums.map((row) => {
      rowNums.map((row) => <div class="cell">{row}</div>);
    });
  }
}

export default CellGrid;
