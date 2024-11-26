import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/utils/mongodb";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // Await params
  // Validate the ID
  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid flashcard set ID" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("StudyFetchDB");

    // Convert id to ObjectId
    const flashcardSet = await db.collection("flashcards").findOne({ _id: new ObjectId(id) });

    if (!flashcardSet) {
      return NextResponse.json({ error: "Flashcard set not found" }, { status: 404 });
    }

    return NextResponse.json(flashcardSet);
  } catch (error) {
    console.error("Error fetching flashcard set:", error);
    return NextResponse.json({ error: "Failed to fetch flashcard set" }, { status: 500 });
  }
}
