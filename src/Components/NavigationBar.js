import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand className="m-auto">
            <h1>Guess The Word 🚀</h1>
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
}

export default NavigationBar;
