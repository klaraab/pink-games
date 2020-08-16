import React, { useState, useEffect } from "react";
import "./index.css";
import MinesweeperCell from "./MineSweeperCell";
import ModeSwitch from "./ModeSwitch";

const SIZE = 10;
const mines = 15;

function generateGrid() {
  const grid = [];

  for (let i = 0; i < SIZE * SIZE; i++) {
    grid.push({
      isOpen: false,
      isMarked: false,
      isMine: false,
    });
  }

  for (let i = 0; i < mines; i++) {
    let rand = random(SIZE * SIZE);

    while (grid[rand].isMine) {
      rand = random(SIZE * SIZE);
    }
    grid[rand].isMine = true;
  }
  return grid;
}

function random(max) {
  return Math.floor(Math.random() * max);
}

function minesAround(grid, x, y) {
  let nbrOfMines = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (grid[(y + dy) * SIZE + (x + dx)]) {
        let mine = grid[(y + dy) * SIZE + (x + dx)].isMine ? 1 : 0;
        nbrOfMines = nbrOfMines + mine;
      }
    }
  }
  return nbrOfMines;
}

function openCells(grid, x, y) {
  if (x < 0 || y < 0 || x >= SIZE || y >= SIZE) return grid;

  if (grid[y * SIZE + x].isMine) {
    return grid.map((cell) => {
      if (cell.isMine) {
        return {
          ...cell,
          isOpen: !cell.isMarked,
        };
      } else if (cell.isMarked) {
        return {
          ...cell,
          isOpen: true,
          isMarked: false,
        };
      } else return cell;
    });
  }

  if (grid[y * SIZE + x].isOpen) {
    return grid;
  }

  let newGrid = grid.map((cell) => {
    if (grid.indexOf(cell) === y * SIZE + x) {
      return {
        ...cell,
        isOpen: true,
        isMarked: false,
      };
    } else return cell;
  });

  if (minesAround(newGrid, x, y) === 0) {
    newGrid = openCells(newGrid, x - 1, y - 1);
    newGrid = openCells(newGrid, x, y - 1);
    newGrid = openCells(newGrid, x + 1, y - 1);
    newGrid = openCells(newGrid, x - 1, y);
    newGrid = openCells(newGrid, x + 1, y);
    newGrid = openCells(newGrid, x - 1, y + 1);
    newGrid = openCells(newGrid, x, y + 1);
    newGrid = openCells(newGrid, x + 1, y + 1);
  }
  return newGrid;
}

function markCell(grid, x, y) {
  const newGrid = grid.map((cell) => {
    if (grid.indexOf(cell) === y * SIZE + x && !cell.isOpen) {
      return {
        ...cell,
        isMarked: true,
      };
    } else return cell;
  });
  return newGrid;
}

function Minesweeper() {
  const [grid, setGrid] = useState(generateGrid());
  const [gameOver, setGameOver] = useState(false);
  const [isMarkMode, setIsMarkMode] = useState(false);

  function onCellClick(x, y) {
    if (!gameOver) {
      setGrid((oldGrid) => {
        if (oldGrid[y * SIZE + x].isMine) {
          setGameOver(true);
        }
        return openCells(oldGrid, x, y);
      });
    }
  }

  function onCellRightClick(x, y) {
    if (!gameOver) {
      setGrid((oldGrid) => markCell(oldGrid, x, y));
    }
  }

  const cells = [];
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      cells.push(
        <MinesweeperCell
          key={x + "-" + y}
          {...grid[y * SIZE + x]}
          minesAround={minesAround(grid, x, y)}
          onClick={() =>
            isMarkMode ? onCellRightClick(x, y) : onCellClick(x, y)
          }
          onRightClick={() => onCellRightClick(x, y)}
        />
      );
    }
  }

  return (
    <div className="game-container">
      <div className="ms-grid">{cells}</div>
      <ModeSwitch
        isMarkMode={isMarkMode}
        onChange={() => setIsMarkMode(!isMarkMode)}
      ></ModeSwitch>
    </div>
  );
}

export default Minesweeper;
