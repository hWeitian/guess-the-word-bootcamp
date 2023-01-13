import React from "react";

class Hangman extends React.Component {
  displayImage = () => {
    let img = "";

    const imgCount = this.props.wrongGuess;
    img = (
      <img
        src={require(`../assets/hangman_${imgCount}.png`)}
        alt="hangman"
        style={{ minWidth: "20%", maxWidth: "32%" }}
      />
    );
    return img;
  };

  render() {
    return <div>{this.displayImage()}</div>;
  }
}

export default Hangman;
