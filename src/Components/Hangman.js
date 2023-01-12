import React from "react";

class Hangman extends React.Component {
  displayImage = () => {
    let img = "";
    if (this.props.wrongGuess === 0) {
      return null;
    } else {
      const imgCount = this.props.wrongGuess;
      img = (
        <img
          src={require(`../assets/hangman_${imgCount}.png`)}
          alt="hangman"
          width="100px"
        />
      );
      return img;
    }
  };

  render() {
    return <div>{this.displayImage()}</div>;
  }
}

export default Hangman;
