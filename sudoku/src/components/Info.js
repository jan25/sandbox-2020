import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

class Info extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }
  render() {
    return (
      <Modal
        ref={this.wrapper}
        centered={true}
        show={this.props.show}
        onHide={this.props.onInfoHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="custom-header">
              <span>Instructions</span>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ol>
            <li>Drag and drop numbers on the grid</li>
            <li>
              Latest dropped number is colored Green for correct or Red for
              incorrect placement
            </li>
            <li>Double click on any dropped numbers to empty that cell</li>
            <li>
              You can use <i>Reset</i> button at any time to reset puzzle to
              initial state
            </li>
            <li>
              You may use <i>Hint mode</i> to drop hints based on your guesses
            </li>
          </ol>
        </Modal.Body>
      </Modal>
    );
  }
}

export default Info;
