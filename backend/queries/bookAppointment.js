const express = require("express");
const { MongoClient } = require("mongodb");

const router = express.Router();
const uri =
  "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

router.post("/", async (req, res) => {
    const {appointment}= req.body;
    console.log(appointment);
  
    try {
      console.log(appointment);
      await client.connect();
  
      const database = client.db("users");
      const collection = database.collection("appointments");
      const result = await collection.insertOne(appointment);

      if (result) {
        console.log(result);
        res.status(200).json({ success: true, message: "Appointment booked!" });
      } else {
        res.status(401).json({ success: false, message: "Error occured!" });
      }
      
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    } finally {
      await client.close();
    }
});
  
module.exports = router;
  