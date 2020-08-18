import React from "react";
import "./MemoryCard.css";

function MemoryCard({ isFlipped, image, onClick }) {
  return (
    <div
      className={
        "memory-card" +
        (isFlipped ? " " + (image + " " + "image") : " card-back")
      }
      onClick={onClick}
    ></div>
  );
}

export default MemoryCard;
