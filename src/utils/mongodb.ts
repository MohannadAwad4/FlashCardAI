import { MongoClient } from "mongodb";

// Ensure the environment variable is defined and is a string
const uri: string = process.env.MONGODB_URI as string;
if (!uri) {
  throw new Error("MONGODB_URI is not defined in .env.local");
}

const options: object = {};

// Use a global variable to ensure a singleton for MongoClient
let client: MongoClient;
const clientPromise: Promise<MongoClient> = (() => {
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalThis._mongoClientPromise = client.connect();
  }
  return globalThis._mongoClientPromise;
})();

export default clientPromise;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined; // Explicitly declare for TypeScript
}
