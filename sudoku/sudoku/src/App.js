import React, { Component } from "react";
import _ from "lodash";
import "./App.css";
import TopGrid from "./components/TopGrid";
import Numbers from "./components/Numbers";
import Generator from "./components/Generator";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [[]],
      stack: [],
      gameon: false,
    };
    this.generator = new Generator();
    this.onNewNumberDrop = this.onNewNumberDrop.bind(this);
    this.getLastCoords = this.getLastCoords.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.setState({
      board: this.generator.generate(),
    });
  }

  render() {
    console.log("App", this.state.board);
    return (
      <React.Fragment>
        <div className="app">
          <h1>Sudoku</h1>
          <TopGrid
            board={this.state.board}
            onNewNumberDrop={this.onNewNumberDrop}
            lastCoords={this.getLastCoords()}
          />
          <Numbers />
          <button onClick={this.reset}>reset</button>
        </div>
      </React.Fragment>
    );
  }

  onNewNumberDrop(row, col, num) {
    console.log("drop: ", num, "at: ", row, col);
    let newBoard = _.cloneDeep(this.state.board);
    newBoard[row][col] = num;
    this.setState({
      board: newBoard,
      stack: _.concat(this.state.stack, [[row, col]]),
    });
  }

  reset() {
    let resetBoard = _.cloneDeep(this.state.board);
    for (let [i, j] of this.state.stack) {
      resetBoard[i][j] = 0;
    }
    this.setState({
      board: resetBoard,
      stack: [],
    });
  }

  getLastCoords() {
    if (this.state.stack.length == 0) {
      return [-1, -1];
    }
    return _.last(this.state.stack);
  }
}

export default App;
