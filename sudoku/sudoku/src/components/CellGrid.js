import React, { Component } from "react";
import _ from "lodash";
import "./CellGrid.css";

class CellGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      draghover: [-1, -1],
    };

    this.allowDrop = this.allowDrop.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }
  render() {
    let rows = _.range(3).map((dx) => this.props.row * 3 + dx);
    let cols = _.range(3).map((dy) => this.props.col * 3 + dy);
    let key = 0;
    return (
      <div className="cell-container">
        {rows.map((row) => {
          return cols.map((col) => (
            <div
              key={key++}
              className={
                "cell " + this.getFontClass(row, col)

                // (this.addDragOverClass(row, col) ? " draghover" : "")
              }
              onDragOver={(ev) =>
                this.allowDrop(ev, this.props.board[row][col])
              }
              onDragEnter={(ev) => this.onDragEnter(ev, row, col)}
              onDragLeave={(ev) => this.onDragLeave(ev, row, col)}
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

  getFontClass(row, col) {
    if (this.isLast(row, col)) {
      return "latest";
    }
    if (this.isAdded(row, col)) {
      return "correct";
    }
    return "";
  }

  isAdded(row, col) {
    return _.find(this.props.added, ([i, j]) => {
      return i == row && j == col;
    });
  }

  isLast(row, col) {
    return _.isEqual([row, col], this.props.lastCoords);
  }

  addDragOverClass(row, col) {
    // FIXME
    return false;
    // return _.isEqual(this.state.draghover, [row, col]);
  }

  onDragEnter(event, row, col) {
    if (this.props.board[row][col] > 0) {
      return;
    }
    this.setState({
      draghover: [row, col],
    });
    console.log("Entered:", row, col);
  }

  onDragLeave(event, row, col) {
    if (this.props.board[row][col] > 0) {
      return;
    }
    this.setState({
      draghover: [-1, -1],
    });
    console.log("Left:", row, col);
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
