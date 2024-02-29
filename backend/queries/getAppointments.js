const express = require("express");
const { MongoClient } = require("mongodb");

const router = express.Router();
const uri =
  "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);


router.post("/", async (req, res) => {
  const {user_id,role} = req.body;
  console.log(user_id,role);

  try {
    await client.connect();

    const database = client.db("users");
    const collection = database.collection("appointments");

    

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
