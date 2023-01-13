import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

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
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      numGuess: 10,
      wrongGuess: 0,
      roundNum: 1,
      roundsWon: 0,
      gameStatus: "playing",
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

  updateGuess = (letter) => {
    const allGuessedLetters = [...this.state.guessedLetters, ...letter];

    // Check if player wins
    const playerWon = this.checkResults(this.state.currWord, allGuessedLetters);

    // Check if submitted letter is part of the word
    const correctGuess = this.isCharIncluded(this.state.currWord, letter);

    if (playerWon) {
      this.setState((prevState) => ({
        roundsWon: (prevState.roundsWon += 1),
        gameStatus: "won",
        guessedLetters: [...prevState.guessedLetters, letter],
      }));
    } else if (this.state.wrongGuess + 1 >= 10) {
      this.setState((prevState) => ({
        roundsWon: prevState.roundsWon,
        gameStatus: "lose",
        guessedLetters: [...prevState.guessedLetters, letter],
        wrongGuess: (prevState.wrongGuess += 1),
      }));
    } else if (!playerWon) {
      this.setState((prevState) => ({
        guessedLetters: [...prevState.guessedLetters, letter],
      }));
      if (!correctGuess) {
        this.setState((prevState) => ({
          wrongGuess: (prevState.wrongGuess += 1),
        }));
      }
    }
  };

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

  generateResultStatement = (playerWon) => {
    if (playerWon === "won" && this.state.wrongGuess < 10) {
      return "Yeah! You Won";
    } else if (playerWon === "lose" && this.state.wrongGuess >= 10) {
      return `You lose! The correct word is ${this.state.currWord}`;
    } else {
      return null;
    }
  };

  restartGame = () => {
    this.setState((prevState) => ({
      currWord: getRandomWord(),
      guessedLetters: [],
      numGuess: 10,
      wrongGuess: 0,
      roundNum: (prevState.roundNum += 1),
      roundsWon: prevState.roundsWon,
      gameOver: false,
      gameStatus: "playing",
    }));
  };

  render() {
    return (
      <div className="App">
        <NavigationBar />
        <header className="App-header">
          <Container>
            <Row xs={12}>
              <Col lg={6}>
                <Badge
                  style={{
                    textAlign: "left",
                    fontSize: "1rem",
                    fontWeight: "700",
                    lineHeight: "1.5rem",
                  }}
                  bg="secondary"
                  className="mb-5"
                >
                  <Row>
                    <Col>Round: {this.state.roundNum}</Col>
                    <Col>Rounds Won: {this.state.roundsWon}</Col>
                  </Row>
                </Badge>
                <h2 style={{ letterSpacing: "1rem" }}>
                  {this.generateWordDisplay()}
                </h2>
                <h4 className="mt-5">Guessed Letters</h4>
                {this.state.guessedLetters.length > 0
                  ? this.state.guessedLetters.toString()
                  : "-"}
                <p
                  className="mt-3 mb-3"
                  style={{ fontSize: "1.2rem", margin: 0, padding: 0 }}
                >
                  Number of Guess left: {10 - this.state.wrongGuess}
                </p>
                <InputForm
                  updateGuess={this.updateGuess}
                  gameStatus={this.state.gameStatus}
                  restartGame={this.restartGame}
                  guessedLetters={this.state.guessedLetters}
                  isCharIncluded={this.isCharIncluded}
                />
                <p style={{ fontSize: "1.2rem", margin: 0, padding: 0 }}>
                  {this.generateResultStatement(this.state.gameStatus)}
                </p>
              </Col>
              <Col lg={6} style={{ display: "flex", alignItems: "center" }}>
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
