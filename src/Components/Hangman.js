import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Hangman extends React.Component {
  displayImage = () => {
    let img = "";

    const imgCount = this.props.wrongGuess;
    img = (
      <img
        src={require(`../assets/hangman_${imgCount}.png`)}
        alt="hangman"
        style={{ minWidth: "20%", maxWidth: "30%" }}
      />
    );
    return img;
  };

  render() {
    return (
      <Row>
        <Col>{this.displayImage()}</Col>
      </Row>
    );
  }
}

export default Hangman;
