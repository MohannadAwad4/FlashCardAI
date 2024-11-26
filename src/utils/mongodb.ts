import { MongoClient } from "mongodb";

// Ensure the environment variable is defined and is a string
const uri: string = process.env.MONGODB_URI as string;
if (!uri) {
  throw new Error("MONGODB_URI is not defined in .env.local");
}

const options: object = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Use a global variable to ensure a singleton for MongoClient
declare global {
  // Adding `global` type for Node.js
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
