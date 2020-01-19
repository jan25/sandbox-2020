import React, { Component } from "react";
import "../data/list.json";

class FormulaList extends Component {
  state = {
    list: [
      {
        id: 1,
        name: "add",
        formula: "a+b"
      },
      {
        id: 2,
        name: "subtract",
        formula: "a-b"
      }
    ]
  };
  render() {
    return (
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Formula</th>
        </tr>
        {this.state.list.map(formula => (
          <tr>
            <td>{formula.id}</td>
            <td>{formula.name}</td>
            <td>{formula.formula}</td>
          </tr>
        ))}
      </table>
    );
  }
}

export default FormulaList;
