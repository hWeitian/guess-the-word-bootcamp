import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CustomButton from "./Button";

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      input: "",
      validity: false,
    };
  }

  isInputCorrect = (input) => {
    const isCharIncluded = this.props.isCharIncluded(
      this.props.guessedLetters,
      input
    );

    if (input.length !== 1 || isCharIncluded || !isNaN(input)) {
      return false;
    }
    return true;
  };

  handleChange = (e) => {
    let letter = e.target.value;

    if (!this.isInputCorrect(letter)) {
      this.setState({
        errorMessage:
          "Incorrect input. Please enter only 1 letter which has not been guessed previously.",
        input: letter,
        validity: false,
      });
    } else {
      this.setState({
        errorMessage: null,
        input: letter,
        validity: true,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const letter = this.state.input;

    if (this.state.validity) {
      this.setState({ input: "", validity: false });
      this.props.updateGuess(letter);
    } else {
      return null;
    }
  };

  handleClick = () => {
    this.props.restartGame();
  };

  render() {
    return (
      <Col>
        <Row className="justify-content-md-center">
          <Col xs lg="4">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3" controlId="inputLetters">
                <Form.Control
                  type="text"
                  placeholder="Enter one letter"
                  onChange={this.handleChange}
                  value={this.state.input}
                  disabled={this.props.gameStatus === "playing" ? false : true}
                />
                {this.props.gameStatus === "playing" ? (
                  <CustomButton
                    text="Submit"
                    type="submit"
                    disabled={!this.state.validity}
                    variant="primary"
                  />
                ) : (
                  <CustomButton
                    text="Play Again"
                    onClick={this.handleClick}
                    type="button"
                    variant="warning"
                  />
                )}
              </Form.Group>
            </Form>
          </Col>
        </Row>
        {this.state.errorMessage !== null ? (
          <Row className="justify-content-md-center">
            <Col xs lg="10">
              <p style={{ fontSize: "0.85rem", color: "yellow" }}>
                {this.state.errorMessage}
              </p>
            </Col>
          </Row>
        ) : null}
      </Col>
    );
  }
}

export default InputForm;
