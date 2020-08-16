import React from "react";
import "./TouchController.css";
import Button from "react-bootstrap/Button";

function TouchController() {
  return (
    <div className="tc-container">
      <div className="tc-grid">
        <Button variant="light" className="tc-button tc-up">
          &#x2191;
        </Button>
        <Button variant="light" className="tc-button tc-left">
          &#x2190;
        </Button>
        <Button variant="light" className="tc-button tc-down">
          &#x2193;
        </Button>
        <Button variant="light" className="tc-button tc-right">
          &#x2192;
        </Button>
      </div>
    </div>
  );
}

export default TouchController;
