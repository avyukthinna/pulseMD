const express = require("express");
const { MongoClient } = require("mongodb");

const router = express.Router();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);


router.post("/", async (req, res) => {
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

module.exports = router;
