// GetFlashCards.tsx
'use client'
import { useState,useEffect } from "react";


import DisplayCards from "./display_cards";
import Chat from "./chat";

interface FlashcardSet {
  _id: string;
  topic: string;
}

export default function GetFlashCards() {
  
  const [flashcards, setFlashcards] = useState<FlashcardSet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [renderFlashCards,setRenderFlashCards] = useState<number>(1)
  
  // try {
  //   // Fetch data from MongoDB with explicit projection and type
  //   const client = await clientPromise;
  //   const db = client.db("StudyFetchDB");
    

  //   const flashcards: FlashcardSetFromDB[] = await db
  //     .collection<FlashcardSetFromDB>("flashcards")
  //     .find({}, { projection: { _id: 1, topic: 1 } })
  //     .toArray();

  //   console.log("flashcards!", flashcards);

  //   // Serialize data (convert ObjectId to string)
  //   serializedFlashcards = flashcards.map((flashcard) => ({
  //     _id: flashcard._id.toString(),
  //     topic: flashcard.topic,
  //   }));
  // } catch (error) {
  //   console.error("Error fetching flashcards:", error);
    
  //   noError = false;
  // }
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        setLoading(true);
        setError(false);

        // Fetch flashcards from the API
        const response = await fetch("/api/flashcards"); // Update to match your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch flashcards");
        }

        const data: FlashcardSet[] = await response.json();
        setFlashcards(data);
      } catch (err) {
        console.error("Error fetching flashcards:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
  };

    fetchFlashcards();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-100 p-4 border-r border-gray-200">
        {loading ? (
          <div className="text-center mt-4">
          <div className="inline-block w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        ) : error ? (
          <p>Failed to load flashcards.</p>
        ) : (
          <DisplayCards flashcards={flashcards} />
        )}
      </aside>
  
      {/* Main Content (Chat) */}
      <main className="flex-1 bg-white p-4">
        <Chat setRenderFlashCards={setRenderFlashCards} />
      </main>
    </div>
  );
  
}
