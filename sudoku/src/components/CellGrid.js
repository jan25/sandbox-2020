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
    this.onDrop = this.onDrop.bind(this);
    this.addDragOverClass = this.addDragOverClass.bind(this);
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
                "cell " +
                this.getFontClass(row, col) +
                (this.addDragOverClass(row, col) ? " draghover" : "")
              }
              onDragOver={(ev) =>
                this.allowDrop(ev, this.props.board[row][col])
              }
              onDragEnter={(ev) => this.onDragEnter(ev, row, col)}
              onDragLeave={(ev) => this.onDragLeave(ev, row, col)}
              onDrop={(ev) => this.onDrop(ev, row, col)}
            >
              {this.props.board[row][col] > 0 ? (
                <h2 onDoubleClick={() => this.props.removeNumber(row, col)}>
                  {this.props.board[row][col]}
                </h2>
              ) : (
                <h2>0</h2>
              )}
            </div>
          ));
        })}
      </div>
    );
  }

  getFontClass(row, col) {
    if (this.props.isGameFinished) {
      return " finished ";
    }
    if (this.props.board[row][col] === 0) {
      return " hidden ";
    }
    if (this.isLast(row, col)) {
      return this.props.isLastIncorrect ? "incorrect" : "latest";
    }
    if (this.isHint(row, col)) {
      return " text-primary ";
    }
    if (this.isAdded(row, col)) {
      return "correct";
    }
    return "";
  }

  isHint(row, col) {
    if (!this.props.hintMode) {
      return false;
    }
    return _.find(this.props.hintStack, ([i, j]) => {
      return i === row && j === col;
    });
  }

  isAdded(row, col) {
    return _.find(this.props.added, ([i, j]) => {
      return i === row && j === col;
    });
  }

  isLast(row, col) {
    return _.isEqual([row, col], this.props.lastCoords);
  }

  addDragOverClass(row, col) {
    // console.log("drag over class", this.props.draghover, row, col);
    return _.isEqual(this.props.draghover, [row, col]);
  }

  onDragEnter(event, row, col) {
    if (this.props.board[row][col] > 0) {
      this.props.onDragEnter(-1, -1);
      return;
    }
    this.props.onDragEnter(row, col);
  }

  onDragLeave(event, row, col) {
    this.props.onDragLeave(row, col);
  }

  onDrop(event, row, col) {
    var value = parseInt(event.dataTransfer.getData("number"));
    this.props.onDragEnter(-1, -1);
    this.props.onNewNumberDrop(row, col, value);
  }

  allowDrop(event, cell) {
    if (cell === 0) {
      event.preventDefault();
    }
  }
}

export default CellGrid;
