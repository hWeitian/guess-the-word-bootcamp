import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Hangman from "./Components/Hangman.js";
import NavigationBar from "./Components/NavigationBar.js";
import InputForm from "./Components/InputForm.js";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // currWord: "Pneumonoultramicroscopicsilicovolcanoconiosis",
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      numGuess: 10,
      wrongGuess: 0,
    };
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  addWrongGuess = () => {
    this.setState((state) => ({
      wrongGuess: (state.wrongGuess += 1),
    }));
  };

  updateGuess = (letter) => {
    this.setState((state) => ({
      guessedLetters: [...state.guessedLetters, letter],
      numGuess: state.numGuess - 1,
      input: "",
    }));
  };

  checkResults = (currWord, guessedLetters) => {
    let lettersMatched = false;
    const tempObj = {};

    for (let i = 0; i < guessedLetters.length; i += 1) {
      let currentChar = guessedLetters[i];
      tempObj[currentChar] = true;
    }

    for (let i = 0; i < currWord.length; i += 1) {
      let currentChar = currWord[i];
      if (currentChar in tempObj) {
        lettersMatched = true;
      } else {
        return false;
      }
    }

    return lettersMatched;
  };

  isGameOver = (playerWon) => {
    if (playerWon || this.state.wrongGuess >= 10) {
      return true;
    } else {
      return false;
    }
  };

  generateResultStatement = (playerWon) => {
    if (playerWon && this.state.wrongGuess < 10) {
      return "Yeah! You Won";
    } else if (!playerWon && this.state.wrongGuess >= 10) {
      return `You lose! The correct word is ${this.state.currWord}`;
    } else {
      return null;
    }
  };

  restartGame = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      numGuess: 10,
      wrongGuess: 0,
    });
  };

  render() {
    const hasPlayerWon = this.checkResults(
      this.state.currWord,
      this.state.guessedLetters
    );
    const gameOver = this.isGameOver(hasPlayerWon);
    return (
      <div className="App">
        <NavigationBar />
        <header className="App-header">
          <Container>
            <Row>
              <Col>
                <h3 style={{ letterSpacing: "1rem" }}>
                  {this.generateWordDisplay()}
                </h3>
                <h3 className="mt-5">Guessed Letters</h3>
                {this.state.guessedLetters.length > 0
                  ? this.state.guessedLetters.toString()
                  : "-"}
                <p className="mt-3">
                  Number of Guess left: {10 - this.state.wrongGuess}
                </p>
                <InputForm
                  updateGuess={this.updateGuess}
                  addWrongGuess={this.addWrongGuess}
                  gameOver={gameOver}
                  restartGame={this.restartGame}
                  guessedLetters={this.state.guessedLetters}
                  currWord={this.state.currWord}
                />
                <p style={{ fontSize: "1.2rem", margin: 0, padding: 0 }}>
                  {this.generateResultStatement(hasPlayerWon)}
                </p>
              </Col>
              <Col>
                <Hangman wrongGuess={this.state.wrongGuess} />
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    );
  }
}

export default App;
