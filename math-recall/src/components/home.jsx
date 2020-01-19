import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GetFormulaList } from "../service/api";
import "./home.css";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formulaList: GetFormulaList()
    };
  }

  render() {
    return (
      <div className="container">
        <div className="default-content">
          <h3>Welcome!</h3>
          <Link to="/create">
            <button className="btn btn-primary">Create new formula</button>
          </Link>
        </div>
        <div className="formula-list-container">
          <h4>Choose from Formula list</h4>
          <div className="formula-list">
            <ul>
              {this.state.formulaList.map(formula => {
                return (
                  <li key={formula.id}>
                    <Link to={`/calculate/${formula.id}`}>{formula.name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeScreen;
