const express = require("express");
const { MongoClient } = require("mongodb");

const router = express.Router();
const uri =
  "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

router.delete("/", async (req, res) => {
  const { patient_id, date } = req.body; // Get user's email and role from request body
  console.log(patient_id,date);
  try {
    await client.connect();

    // Determine the collection based on user's role
    const database = client.db("users2");
    const collection = database.collection("appointments");

    // Delete the user account based on the provided email
    const result = await collection.deleteOne({patient_id: patient_id, date: date });
    console.log(result);
    // Check if the user account was deleted successfully
    if (result.deletedCount === 1) {
        console.log('deleted')
      res
        .status(200)
        .json({ success: true, message: "Meeting Cancelled!" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "User account not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

module.exports = router;
