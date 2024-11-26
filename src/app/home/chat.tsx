"use client";
import { useState,SetStateAction ,Dispatch } from "react";

type ChatProps = {
  setRenderFlashCards: Dispatch<SetStateAction<number>>;
};

export default function Chat({ setRenderFlashCards }: ChatProps){
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleSendMessage = async () => {
    if (!input) {
      console.log("No input provided.");
      return;
    }

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true); // Start loading

    try {
      const response = await fetch("/api/flashcards/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from API");
      }
      setRenderFlashCards(prev=>prev+1)
      const data = await response.json();
      console.log("Client Side Data", data);
      setMessages((prev) => [...prev, { role: "ai", content: data.reply }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Failed to fetch response. Please try again." },
      ]);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Chat with AI</h1>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto bg-white shadow rounded p-4 mb-4 space-y-3">
        {messages.length === 0 ? (
          // Default state when no messages
          <p className="text-gray-500 text-center">Chat with me!</p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded ${
                msg.role === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 text-gray-800 self-start"
              }`}
            >
              {msg.content}
            </div>
          ))
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="text-center mt-4">
            <div className="inline-block w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-1 p-3 border rounded shadow focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className={`px-4 py-3 rounded shadow transition ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
