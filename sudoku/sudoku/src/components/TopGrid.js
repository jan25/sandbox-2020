import React, { Component } from "react";
import _ from "lodash";
import CellGrid from "./CellGrid";
import "./TopGrid.css";

class TopGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("TopGrid", this.props.board);
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
                  onNewNumberDrop={this.props.onNewNumberDrop}
                  lastCoords={this.props.lastCoords}
                  added={this.props.added}
                />
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}

export default TopGrid;
