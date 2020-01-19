import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GetFormula, Calculate } from "../service/api";
import "./calculator.css";

class Calculator extends Component {
  constructor(props) {
    super(props);

    const id = props.match.params.id;
    const data = GetFormula(id);

    this.state = {
      id: id,
      data: data,
      inputs: data.variables.reduce((m, input) => {
        m[input.name] = "";
        return m;
      }, {}),
      result: undefined
    };
  }

  render() {
    const { data, inputs } = this.state;

    return (
      <div className="calculator-container">
        <div className="title-container">
          <h3>{data.name}</h3>
          <Link to="/">
            <button className="btn btn-primary">Home</button>
          </Link>
        </div>
        <div className="formula-container">
          <h4>{data.formula}</h4>
        </div>
        <form className="fields-container">
          {data.variables.map(v => (
            <div key={v.name} className="form-group">
              <label>{v.name}</label>
              <input
                type="text"
                className="form-control"
                placeholder="123"
                value={inputs[v.name]}
                onChange={evt => this.onInputChange(evt, v.name)}
              />
            </div>
          ))}
        </form>
        <div className="calculate-btn-container">
          {this.state.result ? (
            <div className="result-container">
              <label>Result</label>
              <span>{this.state.result}</span>
            </div>
          ) : (
            <div className="result-container hidden"></div>
          )}

          <button
            className="btn btn-primary"
            onClick={() => this.onCalculateBtnClick()}
          >
            Calculate
          </button>
        </div>
      </div>
    );
  }

  onInputChange(evt, variable) {
    this.setState({
      ...this.state,
      result: undefined,
      inputs: {
        ...this.state.inputs,
        [variable]: evt.target.value
      }
    });
  }

  onCalculateBtnClick() {
    const { data, inputs } = this.state;
    const result = Calculate(data.formula, inputs);

    this.setState({
      ...this.state,
      result
    });
    console.log("result:", result);
  }
}

export default Calculator;
