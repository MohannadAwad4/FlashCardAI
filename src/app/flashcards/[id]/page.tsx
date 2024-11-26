import { ObjectId } from "mongodb";
import clientPromise from "@/utils/mongodb";
import FlashcardSetComponent from "./FlashCardSetClient";

interface Flashcard {
    term: string;
    definition: string;
  }
  
  interface FlashcardSetFromDB {
    _id: ObjectId;
    topic: string;
    flashcards: Flashcard[];
  }
//server component to fetch flashcard set id and pass the flashcard to client
export default async function FlashcardPage({ params }: { params: { id: string } }) {
  const { id } =  params;

  if (!id || !ObjectId.isValid(id)) {
    return <p>Invalid Flashcard ID</p>;
  }

  try {
    const client = await clientPromise;
    const db = client.db("StudyFetchDB");

    const flashcardSet: FlashcardSetFromDB | null = await db
      .collection<FlashcardSetFromDB>("flashcards")
      .findOne({ _id: new ObjectId(id) });
    console.log("flashcardSet:", flashcardSet);

    if (!flashcardSet) {
      return <p>Flashcard set not found.</p>;
    }
    //change id back to string
    const serializedFlashcardSet = {
      ...flashcardSet,
      _id: flashcardSet._id.toString(),
    };

    return <FlashcardSetComponent flashcardSet={serializedFlashcardSet} />;
  } catch (error) {
    console.error("Error fetching flashcard set:", error);
    return <p>Failed to load flashcard set.</p>;
  }
}
