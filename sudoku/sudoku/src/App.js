import React, { Component } from "react";
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
          <TopGrid board={this.state.board} />
          <Numbers />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
