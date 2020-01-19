import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CreateNewFormula, GetNextID } from "../service/api";
import "./newformula.css";

class NewFormulaForm extends Component {
  state = {
    name: "",
    formula: ""
  };
  render() {
    return (
      <div className="form-container">
        <div className="title-box">
          <h4>Create New Formula</h4>
          <Link to="/">
            <button className="btn btn-primary">Home</button>
          </Link>
        </div>
        <div className="form-box">
          <form>
            <div className="form-id form-group">
              <label>ID</label>
              <span>{GetNextID()}</span>
              {/* TODO this seems to be called on every onChange event. Figure why */}
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="My Great New Formula"
                onChange={evt => this.setState({ name: evt.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Formula</label>
              <textarea
                className="form-control"
                placeholder="a + b"
                onChange={evt => this.setState({ formula: evt.target.value })}
              ></textarea>
            </div>
            <button
              className="btn btn-primary"
              onClick={evt => this.onSubmit(evt)}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }

  onSubmit(evt) {
    evt.preventDefault();
    const response = CreateNewFormula({
      name: this.state.name,
      formula: this.state.formula
    });

    this.props.history.push(`/calculate/${response.id}`);
  }
}

export default NewFormulaForm;
