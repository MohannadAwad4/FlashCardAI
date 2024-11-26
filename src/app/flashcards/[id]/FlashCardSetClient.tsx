"use client";

import { useState } from "react";

interface Flashcard {
  term: string;
  definition: string;
}

interface FlashcardSet {
  _id: string;
  topic: string;
  flashcards: Flashcard[];
}

export default function FlashcardSetComponent({
  flashcardSet,
}: {
  flashcardSet: FlashcardSet;
}) {
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Tracks the current card index
  const [flipped, setFlipped] = useState<boolean>(false); // Tracks if the current card is flipped

  const handleFlip = () => {
    setFlipped(!flipped); // Toggles the flipped state
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false); // Reset flip state when navigating
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcardSet.flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false); // Reset flip state when navigating
    }
  };

  const currentCard = flashcardSet.flashcards[currentIndex]; // Get the current flashcard

  return (
    <div className="flex flex-col items-center p-6">
      {/* Topic Header */}
      <h1 className="text-3xl font-bold mb-6">{flashcardSet.topic}</h1>

      {/* Flashcard Container */}
      <div className="relative w-96 h-64 mb-6">
        <div
          className={`flashcard ${flipped ? "flipped" : ""}`}
          onClick={handleFlip}
        >
          {flipped ? (
            <div className="flashcard-back">{currentCard.definition}</div>
          ) : (
            <div className="flashcard-front">{currentCard.term}</div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-6 py-2 rounded ${
            currentIndex === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === flashcardSet.flashcards.length - 1}
          className={`px-6 py-2 rounded ${
            currentIndex === flashcardSet.flashcards.length - 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>

      {/* Inline Styles */}
      <style jsx>{`
        .flashcard {
          width: 100%;
          height: 100%;
          perspective: 1000px;
          cursor: pointer;
          position: relative;
        }
        .flashcard-front,
        .flashcard-back {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: hidden;
          transition: transform 0.6s;
          position: absolute;
          border: 2px solid #ccc;
          border-radius: 12px;
          font-size: 1.5rem; /* Larger text */
          padding: 24px; /* Add spacing inside the card */
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
        }
        .flashcard-front {
          background: #f9f9f9;
          color: #333;
        }
        .flashcard-back {
          background: #333;
          color: #fff;
          transform: rotateY(180deg);
        }
        .flashcard.flipped .flashcard-front {
          transform: rotateY(180deg);
        }
        .flashcard.flipped .flashcard-back {
          transform: rotateY(0deg);
        }
      `}</style>
    </div>
  );
}
