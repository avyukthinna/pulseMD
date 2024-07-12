const express = require("express");
const { MongoClient } = require("mongodb");

const router = express.Router();
const uri =
  "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

router.post("/", async (req, res) => {
  const { patient, date } = req.body;
  console.log(patient);

  try {
    await client.connect();

    // Get reference to the database and collection
    const database = client.db("users1");
    const collection = database.collection("appointments");

    // Define the filter and update document
    const filter = { patient_id: patient, date: date };
    const updateDocument = {
      $set: {
        isConfirmed: true,
      },
    };

    // Update the appointment document
    console.log("Update Query:", filter, updateDocument);
    const result = await collection.updateOne(filter, {
      $set: {
        isConfirmed: true,
      },
    });
    console.log(result);
    if (result.modifiedCount > 0) {
      console.log("Appointment accepted");
      res
        .status(200)
        .json({ success: true, message: "Meeting Accepted!" });
    } else {
      console.log("Error");
      res
        .status(200)
        .json({ success: true, message: "Meeting Accepted!" });
    }
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
});

module.exports = router;
