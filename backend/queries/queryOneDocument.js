const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();

const uri =
  "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

router.post("/", async (req, res) => {
  const { currentUser } = req.body; // Get data from request body
  console.log(currentUser);

  try {
    await client.connect();

    const database = client.db("users");
    const collection = database.collection(currentUser.role);

    const result = await collection.findOne({ email: currentUser.email });

    console.log(result);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "Document not found" });
    }
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
});

module.exports = router;
