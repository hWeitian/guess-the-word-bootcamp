import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

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
      // Insert num guesses left state here
      // Insert form input state here
      input: "",
      numGuess: 10,
      wrongGuess: 0,
      errorMessage: "",
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

  // Insert form callback functions handleChange and handleSubmit here

  handleChange = (e) => {
    let letter = e.target.value;

    const isCharIncluded = this.isCharIncluded(
      letter,
      this.state.guessedLetters
    );

    if (isCharIncluded) {
      this.setState({
        errorMessage:
          "This letter has been guessed previously, please enter another letter",
      });
    } else if (letter.length <= 1) {
      this.setState({
        input: e.target.value,
        errorMessage: "",
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState((state) => ({
      guessedLetters: [...state.guessedLetters, this.state.input],
      numGuess: state.numGuess - 1,
      input: "",
    }));

    const isWrong = this.isCharIncluded(this.state.currWord, this.state.input);

    if (!isWrong) {
      this.setState((state) => ({
        wrongGuess: (state.wrongGuess += 1),
      }));
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

  resetGame = (playerWon) => {
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
    this.setState((state) => ({
      currWord: getRandomWord(),
      guessedLetters: [],
      numGuess: 10,
      input: "",
      wrongGuess: 0,
    }));
  };

  displayImage = () => {
    let img = "";
    if (this.state.wrongGuess === 0) {
      return null;
    } else {
      const imgCount = this.state.wrongGuess;
      img = (
        <img
          src={require(`./assets/hangman_${imgCount}.png`)}
          alt="hangman"
          width="200px"
        />
      );
      return img;
    }
  };

  render() {
    const hasPlayerWon = this.checkResults(
      this.state.currWord,
      this.state.guessedLetters
    );
    const playAgain = this.resetGame(hasPlayerWon) ? (
      <button onClick={this.restartGame}>Play Again</button>
    ) : null;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          {this.displayImage()}
          <h3>Word Display</h3>
          {this.generateWordDisplay()}
          <h3>Guessed Letters</h3>
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : "-"}
          <h3>Input</h3>
          <h3>Number of Guess left: {10 - this.state.wrongGuess}</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.input}
              disabled={this.resetGame(hasPlayerWon)}
              required
            />
            <p>
              {this.state.errorMessage.length >= 1
                ? this.state.errorMessage
                : null}
            </p>
            <button type="submit" disabled={this.resetGame(hasPlayerWon)}>
              Submit
            </button>
          </form>
          {this.generateResultStatement(hasPlayerWon)}
          {playAgain}
        </header>
      </div>
    );
  }
}

export default App;
