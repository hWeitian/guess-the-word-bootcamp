import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CustomButton from "./Button";

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      input: "",
      validity: false,
    };
  }
  isCharIncluded = (currWord, currChar) => {
    const tempObj = {};

    for (let i = 0; i < currWord.length; i += 1) {
      tempObj[currWord[i]] = true;
    }

    if (currChar in tempObj) {
      return true;
    }

    return false;
  };

  isInputCorrect = (input) => {
    const isCharIncluded = this.isCharIncluded(
      this.props.guessedLetters,
      input
    );

    console.log(input);

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

    if (this.state.validity) {
      const letter = this.state.input;
      const correctGuess = this.isCharIncluded(this.props.currWord, letter);

      this.setState({ input: "", validity: false });

      if (!correctGuess) {
        this.props.addWrongGuess();
      }

      this.props.updateGuess(letter);
    } else {
      return null;
    }
  };

  render() {
    return (
      <div>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3" controlId="inputLetters">
                <Form.Control
                  type="text"
                  placeholder="Enter one letter"
                  onChange={this.handleChange}
                  value={this.state.input}
                  disabled={this.props.gameOver}
                />
                {this.props.gameOver ? (
                  <CustomButton
                    text="Play Again"
                    onClick={this.props.restartGame}
                    type="button"
                    variant="warning"
                  />
                ) : (
                  <CustomButton
                    text="Submit"
                    type="submit"
                    disabled={!this.state.validity}
                    variant="primary"
                  />
                )}
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <p style={{ fontSize: "0.85rem", color: "yellow" }}>
              {this.state.errorMessage}
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default InputForm;
