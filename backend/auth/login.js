const { MongoClient } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware
const bcryptUtils = require("../utils/bcrypt-hashing.js");

const uri =
  "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    console.log(email, password, role);
    await client.connect();

    const database = client.db("users");
    const collection = database.collection(role);

    const result = await collection.findOne({ email });

    const isMatch = await bcryptUtils.compareHash(password, result.password);

    console.log(isMatch);
    console.log(result);
    if (isMatch) {
      console.log(result);
      res.status(200).json({ success: true, message: "Login successful",user:result }); //user:result is the Fetched User Details that is sent to the frontend.
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
