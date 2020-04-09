import React, { Component } from "react";
import _ from "lodash";
import "./CellGrid.css";

class CellGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("CellGrid", this.props.board);
    let rows = _.range(3).map((dx) => this.props.row * 3 + dx);
    let cols = _.range(3).map((dy) => this.props.col * 3 + dy);
    let key = 0;
    return (
      <div className="cell-container">
        {rows.map((row) => {
          return cols.map((col) => (
            <div key={key++} className="cell">
              {this.props.board[row][col] > 0 ? (
                <h2>{this.props.board[row][col]}</h2>
              ) : (
                <h2>0</h2> /* FIXME keep line height for empty cells */
              )}
            </div>
          ));
        })}
      </div>
    );
  }

  // renderCells() {
  //   let rowNums = [1, 2, 3];
  //   return rowNums.map((row) => {
  //     rowNums.map((row) => <div className="cell">{row}</div>);
  //   });
  // }
}

export class CellState {
  constructor(number) {
    this.number = number;
    this.wrong = false;
    this.latest = false;
  }
}

export let cloneCellState = (cs) => {
  // TODO
};

export default CellGrid;
