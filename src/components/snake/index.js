import React, { useState, useEffect } from "react";
import "./index.css";
import TouchController from "./TouchController";

const width = 20;
const height = 12;

function generateGame() {
  const snake = {
    head: {
      x: width / 2,
      y: height / 2,
    },
    tail: [{ x: width / 2 - 1, y: height / 2 }],
    dir: "right",
  };
  return {
    snake,
    food: generateFood(snake),
    isOver: false,
  };
}

function generateFood(snake) {
  let { x, y } = snake.head;

  while (
    isEqual(snake.head, { x, y }) ||
    snake.tail.some((cell) => isEqual(cell, { x, y }))
  ) {
    x = Math.floor(Math.random() * width);
    y = Math.floor(Math.random() * height);
  }

  return { x, y };
}

function isEqual(cell1, cell2) {
  return cell1.x === cell2.x && cell1.y === cell2.y;
}

function isOutsideGame(cell) {
  return cell.x < 0 || cell.x >= width || cell.y < 0 || cell.y >= height;
}

function isWrongMove(game) {
  game.snake.tail.forEach((cell1) => {
    if (game.snake.tail.some((cell2) => isEqual(cell1, cell2))) {
      return true;
    }
  });

  return (
    isOutsideGame(game.snake.head) ||
    game.snake.tail.some((cell) => isEqual(game.snake.head, cell))
  );
}

function tick(game) {
  const moves = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  };

  const move = moves[game.snake.dir];

  const newHead = {
    x: game.snake.head.x + move.x,
    y: game.snake.head.y + move.y,
  };

  const newTail = [game.snake.head, ...game.snake.tail];

  const newSnake = {
    ...game.snake,
    head: newHead,
    tail: newTail,
  };

  let newGame;
  let newFood;

  if (isEqual(newHead, game.food)) {
    newFood = generateFood(newSnake);

    newGame = {
      ...game,
      snake: newSnake,
      food: newFood,
    };
  } else {
    newSnake.tail.pop();

    newGame = {
      ...game,
      snake: newSnake,
    };
  }

  if (isWrongMove(newGame)) {
    return {
      ...game,
      isOver: true,
    };
  }

  return {
    ...newGame,
    isOver: false,
  };
}

function Snake() {
  const [game, setGame] = useState(generateGame());
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return;
    const intervalId = setInterval(() => {
      setGame((oldGame) => {
        const newGame = tick(oldGame);
        if (newGame.isOver) {
          setGameOver(true);
        }
        return newGame;
      });
    }, 400);
    return () => clearInterval(intervalId);
  }, [gameOver]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  function handleKeyPress(event) {
    let newDir;
    switch (event.keyCode) {
      case 37:
      case 65:
        newDir = "left";
        break;
      case 38:
      case 87:
        newDir = "up";
        break;
      case 39:
      case 68:
        newDir = "right";
        break;
      case 40:
      case 83:
        newDir = "down";
        break;
    }

    setGame((oldGame) => {
      return {
        ...oldGame,
        snake: {
          ...oldGame.snake,
          dir: newDir,
        },
      };
    });
  }

  const cells = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = { x, y };
      const className = isEqual(cell, game.snake.head)
        ? "head"
        : game.snake.tail.some((tailcell) => isEqual(cell, tailcell))
        ? "tail"
        : isEqual(cell, game.food)
        ? "food"
        : "";
      cells.push(
        <div key={`${x}-${y}`} className={"snake-cell " + className}></div>
      );
    }
  }
  return (
    <div className="game-container">
      <div className="snake-grid">{cells}</div>
      <TouchController></TouchController>
    </div>
  );
}

export default Snake;
