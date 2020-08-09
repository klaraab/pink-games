import React, { useState, useEffect, useRef } from "react";
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
function flipCards(cards, keysToFlip) {
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
  const [wrongPair, setWrongPair] = useState([]);

  const timeOutIds = useRef([]);

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

  useEffect(() => {
    if (wrongPair.length === 0) return;
    const timeOutId = setTimeout(() => {
      setGame((oldGame) => {
        const newCards = flipCards(
          oldGame.cards,
          wrongPair.map((card) => card.key)
        );
        return {
          cards: newCards,
          firstCard: oldGame.firstCard,
        };
      });
    }, 1000);
    timeOutIds.current = timeOutIds.current.concat(timeOutId);
  }, [wrongPair]);

  useEffect(() => {
    return () => {
      console.log("timeouts", timeOutIds);
      timeOutIds.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  function onRestart() {
    timeOutIds.current.forEach((id) => clearTimeout(id));
    timeOutIds.current = [];
    setGame({ cards: generateCards() });
    setStartTime(0);
    setElapsedTime(0);
  }

  function onCardClick(card) {
    if (card.isFlipped) {
      return;
    }
    // If the card is already flipped there is nothing we need to do.

    setGame(({ cards, firstCard }) => {
      const newCards = flipCards(cards, [card.key]);
      // The { cards, firstCard, secondCard } above is the decomposed game object.
      // These three variables represent the previous state, before a card was clicked.
      // We should return the new state, depending on the previous one and on the card that was clicked.
      // There are 4 different cases.
      // 1. The clicked card is the first card (meaning that both firstCard and secondCard from the previous state are undefined)
      if (!firstCard) {
        return {
          cards: newCards, //behöver flippa kortet som är klickat på!
          firstCard: card,
        };
      } else {
        if (firstCard.color !== card.color) {
          setWrongPair([firstCard, card]);
        }
        return {
          cards: newCards,
        };
      }
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
