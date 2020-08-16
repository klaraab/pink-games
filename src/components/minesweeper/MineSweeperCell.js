import React from "react";
import "./MineSweeperCell.css";

function MineSweeperCell({
  isOpen,
  isMarked,
  isMine,
  minesAround,
  onClick,
  onRightClick,
}) {
  console.log(minesAround);
  return (
    <div
      className={"ms-cell " + (isOpen ? " ms-cell-open" : "")}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick();
      }}
    >
      {isMarked && <span className="ms-icon">🏴</span>}
      {isMine && isOpen && <span className="ms-icon">💣</span>}
      {!isMine && isOpen && minesAround > 0 && (
        <span className={"ms-icon ms-" + minesAround}>{minesAround}</span>
      )}
    </div>
  );
}

export default MineSweeperCell;
