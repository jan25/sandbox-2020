import React, { Component } from "react";
import _ from "lodash";
import "./CellGrid.css";

class CellGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.allowDrop = this.allowDrop.bind(this);
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
            <div
              key={key++}
              className={"cell" + (this.isLast(row, col) ? " latest" : "")}
              onDragOver={(ev) =>
                this.allowDrop(ev, this.props.board[row][col])
              }
              onDragEnter={(ev) =>
                this.onDragEnter(ev, this.props.board[row][col])
              }
              onDragLeave={(ev) =>
                this.onDragLeave(ev, this.props.board[row][col])
              }
              onDrop={(ev) => this.onDrop(ev, row, col)}
            >
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

  isLast(row, col) {
    return _.isEqual([row, col], this.props.lastCoords);
  }

  onDragEnter(event, cell) {
    if (cell > 0) {
      return;
    }
    // TODO add css
  }

  onDragLeave(event, cell) {
    if (cell > 0) {
      return;
    }
    // TODO remove css
  }

  onDrop(event, row, col) {
    var value = event.dataTransfer.getData("number");
    this.props.onNewNumberDrop(row, col, value);
  }

  allowDrop(event, cell) {
    if (cell == 0) {
      event.preventDefault();
    }
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
