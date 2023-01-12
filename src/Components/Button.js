import React from "react";
import Button from "react-bootstrap/Button";

class CustomButton extends React.Component {
  render() {
    return (
      <Button
        className="mt-3 mb-3"
        type={this.props.type}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
        variant={this.props.variant}
      >
        {this.props.text}
      </Button>
    );
  }
}

export default CustomButton;
