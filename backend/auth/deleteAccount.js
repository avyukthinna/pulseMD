const { MongoClient } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const uri =
  "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

app.delete("/deleteAccount", async (req, res) => {
  const { email, role } = req.body; // Get user's email and role from request body
    console.log(email,role)
  try {
    // Connect to MongoDB Atlas
    await client.connect();
   
    // Access the users database
    const database = client.db("users");

    // Determine the collection based on user's role
    const collectionName = role === "patient" ? "patient" : "doctor";
    const collection = database.collection(collectionName);

    // Delete the user account based on the provided email
    const result = await collection.deleteOne({ email });
    console.log(result)
    // Check if the user account was deleted successfully
    if (result.deletedCount === 1) {
      res.status(200).json({ success: true, message: "Account successfully deleted!" });
    } else {
      res.status(404).json({ success: false, message: "User account not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});