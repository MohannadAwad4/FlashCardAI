const { MongoClient } = require("mongodb");
require("dotenv").config();

async function testInsert() {
  const uri = 'mongodb+srv://Mohannad413:PEpgTLWApSparHA1@studyfetchdb.szlfo.mongodb.net/?retryWrites=true&w=majority&appName=StudyFetchDB';
  console.log(process.env.MONGODB_URI)
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("StudyFetchDB");
    const collection = db.collection("flashcards");

    const result = await collection.insertOne({
      topic: "Python Basics",
      flashcards: [
        { term: "Variable", definition: "A container for storing data" },
        { term: "Function", definition: "A reusable block of code" },
      ],
    });

    console.log("Inserted document ID:", result.insertedId);
  } catch (error) {
    console.error("Error inserting document:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

testInsert();
