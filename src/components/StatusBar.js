import React, { useState } from "react";
import "./StatusBar.css";
import Button from "react-bootstrap/Button";

function StatusBar({ status, onRestart, setShowModal, score }) {
  return (
    <div className="status-bar">
      <div className="status">
        <p>{status}</p>
        <p className="score">{score}</p>
      </div>
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
