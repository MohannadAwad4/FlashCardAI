// DisplayCards.tsx
"use client";

import Link from "next/link";



interface FlashcardSet {
  _id: string;
  topic: string;
  
}

export default function DisplayCards({
  flashcards,
}: {
  flashcards: FlashcardSet[];
}) {
  return (
    <div className="p-4 h-full">
      <h2 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">
        Saved FlashCards
      </h2>
      <ul className="space-y-3 h-full overflow-y-auto">
        {flashcards.map((set) => (
          <li key={set._id} className="bg-gray-100 hover:bg-gray-200 rounded shadow p-3 transition">
            <Link
              href={`/flashcards/${set._id}`}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              {set.topic}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
