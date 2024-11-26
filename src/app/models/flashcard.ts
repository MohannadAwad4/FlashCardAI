import { ObjectId } from "mongodb";

export interface Flashcard {
  _id?: ObjectId;
  topic: string;
  cards: { term: string; definition: string }[];
}
