const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();

const uri =
  "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

router.post("/", async (req, res) => {
  const doctorIdToQuery = 'ObjectId(65e0c33c2b4180dc1f05c665)';//`ObjectId(${req.body})`;

  try {
    // Connect to MongoDB
    await client.connect();

    // Database and collection
    const database = client.db("users");
    const collection = database.collection("appointments");

    const prescriptionsWithDoctor = await collection.aggregate([
      {
        $match: { patient_id: doctorIdToQuery }
      },
      {
        $lookup: {
          from: "patient",
          localField: "patient_id",
          foreignField: "_id",
          as: "patient"
        }
      },
      {
        $unwind: "$patient"
      },
      {
        $project: {
          "doctor_id": 1,
          "date": 1,
          "patient_id": "$patient_id",
          "patient_name": "$patient.name",
          "isConfirmed": 1
        }
      }
    ]).toArray();

    console.log(prescriptionsWithDoctor);
    // Send the result to the frontend
    res.json(prescriptionsWithDoctor);
  } catch (error) {
    console.error("Error querying prescriptions:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

module.exports = router;
