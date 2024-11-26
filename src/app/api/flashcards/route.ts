import { NextResponse } from "next/server";
import clientPromise from "@/utils/mongodb";
//GET All FlashCards to load on side bar of main page
export async function GET() {
  
  try {
    console.log("TESTTT")
    const client = await clientPromise;
    const db = client.db("StudyFetchDB");
    const flashcards = await db.collection("flashcards").find({}).toArray();

    return NextResponse.json(flashcards);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch flashcard sets" }, { status: 500 });
  }
}
