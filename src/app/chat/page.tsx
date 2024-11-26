"use client";

import { useState } from "react";
import Link from "next/link";
type Message = {
    role: "user" | "ai";
    content: string;
  };
export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    // Send user input to API
    const res = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: input }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { role: "user", content: input }, data]);
    setInput("");
  };

  return (
    <div className="chat-page">
      <aside>
        <h2>Flashcard Sets</h2>
        <ul>
          {/* Replace with data from the API */}
          <li>
            <Link href="/flashcards/set1">Set 1</Link>
          </li>
          <li>
            <Link href="/flashcards/set2">Set 2</Link>
          </li>
        </ul>
      </aside>
      <main>
        <div className="messages">
          {messages.map((msg, idx) => (
            <p key={idx} className={msg.role === "user" ? "user" : "ai"}>
              {msg.content}
            </p>
          ))}
        </div>
        <div className="input-bar">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
          />
          <button color="blue" onClick={sendMessage}>Send</button>
        </div>
      </main>
    </div>
  );
}
