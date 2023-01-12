import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand className="m-auto">
            <h2>Guess The Word 🚀</h2>
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
}

export default NavigationBar;
