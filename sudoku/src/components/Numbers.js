import React, { Component } from "react";
import _ from "lodash";
import "./Numbers.css";

class Numbers extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onDragStart.bind(this);
  }

  render() {
    let nums = _.range(1, 10);
    return (
      <div
        className={
          (this.props.vertical ? "vertical" : "horizontal") +
          (this.props.hintMode ? " text-primary" : "")
        }
      >
        {nums.map((num) => {
          return (
            <h3
              key={num}
              className="number"
              draggable
              onDragStart={(event) => this.onDragStart(event, num)}
            >
              {num}
            </h3>
          );
        })}
      </div>
    );
  }

  onDragStart(event, num) {
    event.dataTransfer.setData("number", num);
  }
}

export default Numbers;
