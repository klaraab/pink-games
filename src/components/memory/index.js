import React, { useState, useEffect } from "react";
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

//mappa cardsTOFLip till deras id
function setCardIsFlipped(cards, keysToFlip) {
  return cards.map((card) => {
    if (keysToFlip.includes(card.key)) {
      return {
        ...card,
        isFlipped: !card.isFlipped,
      };
    }
    return card;
  });
}

function Memory() {
  const [game, setGame] = useState({ cards: generateCards() });
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (startTime === 0) return;
    const intervalId = setInterval(
      () => setElapsedTime(Date.now() - startTime),
      1000
    );
    return () => clearInterval(intervalId);
  }, [startTime]);

  function onRestart() {
    setGame({ cards: generateCards() });
    setStartTime(0);
    setElapsedTime(0);
  }

  function onCardClick(card) {
    if (card.isFlipped) {
      return;
    }
    // If the card is already flipped there is nothing we need to do.

    setGame(({ cards, firstCard, secondCard }) => {
      // The { cards, firstCard, secondCard } above is the decomposed game object.
      // These three variables represent the previous state, before a card was clicked.
      // We should return the new state, depending on the previous one and on the card that was clicked.
      // There are 4 different cases.
      // 1. The clicked card is the first card (meaning that both firstCard and secondCard from the previous state are undefined)
      if (!firstCard) {
        return {
          cards: setCardIsFlipped(cards, [card.key]), //behöver flippa kortet som är klickat på!
          firstCard: card,
        };
      }
      // 2. The clicked card is the second card (meaning that firstCard is defined, but secondCard isn't)
      if (!secondCard) {
        return {
          cards: setCardIsFlipped(cards, [card.key]),
          firstCard: firstCard,
          secondCard: card,
        };
      }
      // 3. The clicked card is the "third" card and the previous two clicked cards have the same color
      if (firstCard.color === secondCard.color) {
        return {
          cards: setCardIsFlipped(cards, [card.key]),
          firstCard: card,
        };
      }
      // 4. The clicked card is the "third" card and the previous two clicked cards have different colors
      // flippa tillbaka de två första
      return {
        cards: setCardIsFlipped(cards, [
          card.key,
          firstCard.key,
          secondCard.key,
        ]),
        firstCard: card,
      };
    });

    setStartTime((oldStartTime) =>
      oldStartTime === 0 ? Date.now() : oldStartTime
    );
  }

  return (
    <div>
      <div className="game-container">
        <StatusBar
          status={"Time: " + elapsedTime + " ms"}
          onRestart={onRestart}
        ></StatusBar>
        <div className="memory-grid">
          {game.cards.map((card) => (
            <MemoryCard {...card} onClick={() => onCardClick(card)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Memory;
