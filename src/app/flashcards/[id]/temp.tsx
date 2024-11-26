"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Flashcard {
  term: string;
  definition: string;
}

interface FlashcardSet {
  topic: string;
  flashcards: Flashcard[];
}

export default function FlashcardPage({params}:any) {
  const { id } = useParams(); // Get the dynamic `id` from the URL
  const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchFlashcardSet = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/flashcards/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch flashcard set.");
        }
        const data = await response.json();
        setFlashcardSet(data);
      } catch (err) {
        console.error("Error fetching flashcard set:", err);
        setError("Unable to fetch flashcard set.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFlashcardSet();
    }
  }, [id]);

  if (loading) return <p>Loading flashcard set...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{flashcardSet?.topic}</h1>
      {flashcardSet?.flashcards.map((card, index) => (
        <div key={index} className="flashcard">
          <strong>{card.term}</strong>
          <p>{card.definition}</p>
        </div>
      ))}
    </div>
  );
}
