import React, { useState } from "react";
import "./index.css";
import StatusBar from "./StatusBar";
import MemoryCard from "./MemoryCard";

const colors = [
  "pink",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "purple",
];

function generateCards() {
  const cards = [];

  for (let i = 0; i < colors.length; i++) {
    cards.push({ key: i * 2, isFlipped: false, color: colors[i] });
    cards.push({ key: i * 2 + 1, isFlipped: false, color: colors[i] });
  }

  return cards.sort(() => Math.random() - 0.5);
}

function Memory() {
  const [cards, setCards] = useState(generateCards());

  function onRestart() {
    setCards(generateCards());
  }

  function onCardClick(card) {
    setCards((cards) => {
      return cards.map((oldCard) => {
        if (oldCard.key === card.key) {
          return {
            ...oldCard,
            isFlipped: true,
          };
        }
        return oldCard;
      });
    });
  }

  return (
    <div>
      <div className="game-container">
        <StatusBar status="Time 0s" onRestart={onRestart}></StatusBar>
        <div className="memory-grid">
          {cards.map((card) => (
            <MemoryCard {...card} onClick={() => onCardClick(card)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Memory;
