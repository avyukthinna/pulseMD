const { MongoClient } = require("mongodb");

async function connectDB() {
  try {
    // Create a new MongoClient instance
    const client = new MongoClient(process.env.MONGO_URI);


    await client.connect();

    const db = client.db("users");

    // Return the database instance for use in other parts of the app
    return db;
	
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
}

module.exports = connectDB;
