const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

router.post("/", async (req, res) => {
  const doctorIdToQuery = req.body.user_id; //`ObjectId(${req.body})`;
  console.log(doctorIdToQuery);
  try {
    // Connect to MongoDB
    await client.connect();

    // Database and collection
    const database = client.db("users");
    const collection = database.collection("appointments");

    const prescriptionsWithDoctor = await collection
      .aggregate([
        {
          $match: { doctor_id: doctorIdToQuery },
        },
        {
          $lookup: {
            from: "patient",
            localField: "patient_id",
            foreignField: "email",
            as: "patient",
          },
        },
        {
          $unwind: "$patient",
        },
        {
          $project: {
            doctor_id: 1,
            date: 1,
            patient_id: "$patient.email",
            patient_name: "$patient.fullname",
            patient_age: "$patient.age",
            patient_gender: "$patient.gender", 
            patient_bloodgroup: "$patient.bloodgroup",
            symptoms: 1,
            isConfirmed: 1,
            prescriptions: 1,
          },
        },
      ])
      .toArray();

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
