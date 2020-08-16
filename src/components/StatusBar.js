import React, { useState } from "react";
import "./StatusBar.css";
import Button from "react-bootstrap/Button";

function StatusBar({ status, onRestart, setShowModal }) {
  return (
    <div className="status-bar">
      <p className="status">{status}</p>
      <Button
        variant="light"
        className="button"
        onClick={() => setShowModal(true)}
      >
        Leaderboard
      </Button>
      <Button variant="light" className="button" onClick={onRestart}>
        Restart
      </Button>
    </div>
  );
}

export default StatusBar;
