const { MongoClient } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware

const uri =
  "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());

app.post("/getVerifiedDocuments", async (req, res) => {
  const collectionName = req.body.data;
  console.log(collectionName);
  try {
    console.log(collectionName);
    await client.connect();

    const database = client.db("users");
    const collection = database.collection(collectionName);

    const resultArray = await collection.find({ isverified: true }).toArray();

    console.log(resultArray);

    if (resultArray.length > 0) {
      // Documents are found
      res.status(200).json({
        success: true,
        message: `Documents of ${collectionName} retrieved`,
        data: resultArray,
      });
    } else {
      // No matching documents
      res.status(404).json({
        success: false,
        message: `No verified documents found in ${collectionName}`,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
