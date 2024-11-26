

import clientPromise from "@/utils/mongodb";
//require("dotenv").config();

export const flash_card_tool = {
    name: "create_flashcard_set",
    description: "Create a flashcard set based on a certain topic",
    input_schema: {
      type: "object",
      properties: {
        topic: { type: "string", description: "The topic of the flashcards" },
        flashcards: {
          type: "array",
          items: {
            type: "object",
            properties: {
              term: { type: "string", description: "The term or question" },
              definition: { type: "string", description: "The definition or answer of the term" },
            },
            required: ["term", "definition"],
          },
        },
      },
      required: ["topic", "flashcards"],
    },
  } as const;
  interface Flashcard {
    term: string;
    definition: string;
  }

export async function create_flashcard_set(
  topic: string,
  flashcards: Flashcard[]
){
    
  try {
    const client = await clientPromise;
    //await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("StudyFetchDB");
    const collection = db.collection("flashcards");

    const result = await collection.insertOne({
      topic,
      flashcards,
    });

    console.log("Inserted document ID:", result.insertedId);
  } catch (error) {
    console.error("Error inserting document:", error);
  } 
}


