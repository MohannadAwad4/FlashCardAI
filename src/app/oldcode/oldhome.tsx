"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Flashcard {
  term: string;
  definition: string;
}

interface FlashcardSet {
  _id: string;
  topic: string;
  flashcards: Flashcard[];
}

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);
  

  //load flashcards on sidebar
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch("/api/flashcards");
        if (!response.ok) throw new Error("Failed to fetch flashcards.");
        const data = await response.json();
        setFlashcardSets(data);
        
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };
  
    fetchFlashcards();
  }, []);

  useEffect(() => {
    console.log("Updated flashcard sets:", flashcardSets);
  }, [flashcardSets]);
  
  
  
  const handleSendMessage = async () => {
    if (!input) {
      console.log("No input provided.");
      return;
    }
  
    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  
    try {
      const response = await fetch("/api/flashcards/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: input }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch response from API");
      }
  
      
      const data = await response.json();
      console.log("Client Side Data",data)
setMessages((prev) => [...prev, { role: "ai", content: data.reply }]);

    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [...prev, { role: "ai", content: "Failed to fetch response. Please try again." }]);
    }
  };
  

  return (
    <div>
      <h1>Chat with AI</h1>
      <div className="chat">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.role}>
            {msg.content}
          </div>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
      </div>
      
      <button onClick={handleSendMessage}>Send Message</button>
      <div>
        <h2><strong>Saved FlashCards</strong></h2>
        <ul>
        {flashcardSets.map((set) => (
          <li key={set._id}>
            <Link href={`/flashcards/${set._id}`}>{set.topic}</Link>

          </li>
        ))}
      </ul>

      </div>
    </div>
  );
}
