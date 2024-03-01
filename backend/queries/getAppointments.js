const express = require("express");
const { MongoClient } = require("mongodb");
const { cloneElement } = require("react");

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

    let resultArray
    if(role === 'patient'){
      resultArray = await collection.find({patient_id: user_id}).toArray()
    } else{
      resultArray = await collection.find({doctor_id: user_id}).toArray()
    }
    //const resultArray = await collection.find({ id: user_id }).toArray();

    console.log(resultArray);

    if (resultArray.length > 0) {
      // Documents are found
      res.status(200).json({
        success: true,
        data: resultArray,
      });
    } else {
      // No matching documents
      res.status(404).json({
        success: false,
        message: `No Meetings Scheduled`,
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
