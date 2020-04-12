import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import _ from "lodash";
import "./App.css";
import TopGrid from "./components/TopGrid";
import Numbers from "./components/Numbers";
import Info from "./components/Info";
import Generator from "./components/Generator";
import { isIncorrect, isGameFinished } from "./components/Utils";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [[]],
      stack: [],
      hintStack: [],
      hintMode: false,
      showInfo: false,
    };
    this.generator = new Generator();
    this.removeNumber = this.removeNumber.bind(this);
    this.onNewNumberDrop = this.onNewNumberDrop.bind(this);
    this.getLastCoords = this.getLastCoords.bind(this);
    this.isLastIncorrect = this.isLastIncorrect.bind(this);
    this.isGameFinished = this.isGameFinished.bind(this);
    this.newPuzzle = this.newPuzzle.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.toggleHintMode = this.toggleHintMode.bind(this);
    this.reset = this.reset.bind(this);

    this.gameAreaRef = React.createRef();
  }

  componentDidMount() {
    this.newPuzzle();
  }

  render() {
    const finished = this.isGameFinished();
    return (
      <React.Fragment>
        <div className="app">
          <h1>sūdoku</h1>
          {!finished ? this.renderTopControls() : ""}
          <div className="grid-row">
            {!finished ? this.renderSideControls() : ""}
            <TopGrid
              board={this.state.board}
              added={this.state.stack}
              hintMode={this.state.hintMode}
              hintStack={this.state.hintStack}
              removeNumber={this.removeNumber}
              onNewNumberDrop={this.onNewNumberDrop}
              lastCoords={this.getLastCoords()}
              isLastIncorrect={this.isLastIncorrect()}
              isGameFinished={finished}
            />
            {!finished ? this.renderSideControls() : ""}
          </div>
          {!finished ? this.renderTopControls() : ""}
          {!finished ? this.renderBottomControls() : this.renderWellDone()}
        </div>
      </React.Fragment>
    );
  }

  renderTopControls() {
    return (
      <div className="top-controls">
        <Numbers vertical={false} hintMode={this.state.hintMode} />
      </div>
    );
  }

  renderSideControls() {
    return (
      <div className="side-controls">
        <Numbers vertical={true} hintMode={this.state.hintMode} />
      </div>
    );
  }

  renderBottomControls() {
    return (
      <div className="bottom-controls">
        <div className="control-buttons">
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Hint mode"
            checked={this.state.hintMode}
            onChange={(ev) => this.toggleHintMode(ev)}
          />
          {this.state.stack.length > 0 ? (
            <Button variant="outline-danger" size="sm" onClick={this.reset}>
              Reset
            </Button>
          ) : (
            ""
          )}
          <Button variant="outline-primary" size="sm" onClick={this.toggleInfo}>
            Info
          </Button>
          <div ref={this.gameAreaRef}>
            <Info onInfoHide={this.toggleInfo} show={this.state.showInfo} />
          </div>
        </div>
      </div>
    );
  }

  toggleHintMode(event) {
    // console.log("toggle hint mode", event.target.checked);
    this.setState({
      hintMode: event.target.checked,
    });
  }

  toggleInfo() {
    const now = this.state.showInfo;
    this.setState({
      showInfo: !now,
    });
  }

  renderWellDone() {
    return (
      <div className="welldone">
        <h3>Well Done!</h3>
        <Button variant="success" size="sm" onClick={this.newPuzzle}>
          New Puzzle
        </Button>
      </div>
    );
  }

  removeNumber(row, col) {
    // console.log("removing: ", row, col);
    let i = _.findIndex(this.state.stack, ([x, y]) => {
      return x === row && y === col;
    });
    if (i === -1) return;

    let [x, y] = this.state.stack[i];
    let newBoard = _.cloneDeep(this.state.board);
    newBoard[x][y] = 0;
    let newStack = _.concat(
      _.slice(this.state.stack, 0, i),
      _.slice(this.state.stack, i + 1)
    );

    let hintI = _.findIndex(this.state.hintStack, ([x, y]) => {
      return x === row && y === col;
    });
    if (hintI !== -1) {
      let newHintStack = _.concat(
        _.slice(this.state.hintStack, 0, i),
        _.slice(this.state.hintStack, i + 1)
      );
      this.setState({
        board: newBoard,
        stack: newStack,
        hintStack: newHintStack,
      });
    } else {
      this.setState({
        board: newBoard,
        stack: newStack,
      });
    }
  }

  onNewNumberDrop(row, col, num) {
    // console.log("drop: ", num, "at: ", row, col);
    let newBoard = _.cloneDeep(this.state.board);
    newBoard[row][col] = num;

    if (this.state.hintMode) {
      this.setState({
        board: newBoard,
        hintStack: _.concat(this.state.hintStack, [[row, col]]),
        stack: _.concat(this.state.stack, [[row, col]]),
      });
    } else {
      this.setState({
        board: newBoard,
        stack: _.concat(this.state.stack, [[row, col]]),
      });
    }
  }

  newPuzzle() {
    this.setState({
      board: this.generator.generate(),
      stack: [],
      hintMode: false,
      hintStack: [],
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
      hintMode: false,
      hintStack: [],
    });
  }

  getLastCoords() {
    if (this.state.stack.length === 0) {
      return [-1, -1];
    }
    return _.last(this.state.stack);
  }

  isLastIncorrect() {
    return isIncorrect(this.state.board, this.getLastCoords());
  }

  isGameFinished() {
    return isGameFinished(this.state.board);
  }
}

export default App;
