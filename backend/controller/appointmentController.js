const express = require("express");
const connectDB = require("../configs/mongodbConfig"); // Importing the db connection setup
const router = express.Router();

router.post("/get", async (req, res) => {
  const { user_id, role } = req.body;
  console.log(user_id, role);

  try {
    const db = await connectDB();
    const collection = db.collection("appointments");

    let resultArray;
    if (role === "patient") {
      resultArray = await collection.find({ patient_id: user_id }).toArray();
    } else {
      resultArray = await collection.find({ doctor_id: user_id }).toArray();
    }

    console.log(resultArray);

    if (resultArray.length > 0) {
      res.status(200).json({
        success: true,
        data: resultArray,
      });
    } else {
      res.status(404).json({ success: true, message: `No Meetings Scheduled` });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/accept", async (req, res) => {
  const { patient, date } = req.body;

  try {
	const db = await connectDB();
    const collection = db.collection("appointments");

    const filter = { patient_id: patient, date: date };
    const updateDocument = {
      $set: {
        isConfirmed: true,
      },
    };

    const result = await collection.updateOne(filter, updateDocument);

    if (result.modifiedCount > 0) {
      res.status(200).json({ success: true, message: "Meeting Accepted!" });
    } else {
      res.status(200).json({ success: true, message: "Meeting Accepted!" });
    }
  } catch (error) {
    console.error(error);
  }
});

router.post("/book", async (req, res) => {
  const { appointment } = req.body;

  try {
	const db = await connectDB();
    const collection = db.collection("appointments");
    const result = await collection.insertOne(appointment);

    if (result) {
      res.status(200).json({ success: true, message: "Appointment booked!" });
    } else {
      res.status(401).json({ success: false, message: "Error occurred!" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.delete("/reject", async (req, res) => {
  const { patient_id, date } = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("appointments");

    const result = await collection.deleteOne({
      patient_id: patient_id,
      date: date,
    });

    if (result.deletedCount === 1) {
      res.status(200).json({ success: true, message: "Meeting Cancelled!" });
    } else {
      res.status(404).json({ success: false, message: "Meeting not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/prescriptions", async (req, res) => {
  const { patient, doctor_id, prescriptions, date } = req.body;
  console.log(doctor_id, patient, prescriptions, date);

  try {
    const db = await connectDB();
    const collection = db.collection("appointments");

    const filter = { date: date, doctor_id: doctor_id, patient_id: patient };
    const prescriptionsUpdate = {
      $set: {
        prescriptions: prescriptions,
      },
    };

    const result = await collection.updateOne(filter, prescriptionsUpdate);
    console.log(result);

    const result2 = await collection.findOne(filter);
    console.log(result2);

    if (result.modifiedCount > 0) {
      res
        .status(200)
        .json({ success: true, message: "Prescriptions updated successfully" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "No matching appointment found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
