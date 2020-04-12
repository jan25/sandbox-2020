import React, { Component } from "react";
import _ from "lodash";
import CellGrid from "./CellGrid";
import "./TopGrid.css";

class TopGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      draghover: [-1, -1],
    };

    this.dragEnterCell = this.dragEnterCell.bind(this);
    this.dragLeaveCell = this.dragLeaveCell.bind(this);
  }
  render() {
    if (this.props.board.length < 9) {
      return <div>Loading..</div>;
    }
    let rows = _.range(3);
    let cols = _.range(3);
    let key = 0;
    return (
      <div className="top-grid">
        {rows.map((row) => {
          return (
            <div key={key++} className="top-grid-row">
              {cols.map((col) => (
                <CellGrid
                  key={key++}
                  board={this.props.board}
                  row={row}
                  col={col}
                  removeNumber={this.props.removeNumber}
                  onNewNumberDrop={this.props.onNewNumberDrop}
                  hintMode={this.props.hintMode}
                  hintStack={this.props.hintStack}
                  lastCoords={this.props.lastCoords}
                  isLastIncorrect={this.props.isLastIncorrect}
                  isGameFinished={this.props.isGameFinished}
                  added={this.props.added}
                  draghover={this.state.draghover}
                  onDragEnter={this.dragEnterCell}
                  onDragLeave={this.dragLeaveCell}
                />
              ))}
            </div>
          );
        })}
      </div>
    );
  }

  dragEnterCell(i, j) {
    this.setState({
      draghover: [i, j],
    });
  }

  dragLeaveCell(i, j) {
    // console.log("top grid leave ", i, j);
    if (_.isEqual([i, j], this.state.draghover)) {
      this.setState({
        draghover: [-1, -1],
      });
    }
  }
}

export default TopGrid;
