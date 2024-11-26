import { NextResponse } from "next/server";
import clientPromise from "@/utils/mongodb";
//GET All FlashCards to load on side bar of main page
export async function GET() {
  
  try {
    
    const client = await clientPromise;
    const db = client.db("StudyFetchDB");
    //const flashcards = await db.collection("flashcards").find({}).toArray();
    const flashcards = await db
        .collection("flashcards")
        .find({}, { projection: { _id: 1, topic: 1 } })
      .toArray();

    return NextResponse.json(flashcards);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch flashcard sets" }, { status: 500 });
  }
}
