const express = require("express");
const { MongoClient } = require("mongodb");

const router = express.Router();
const uri =
  "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

router.post("/", async (req, res) => {
    const { patient, doctor_id, prescriptions, date } = req.body;
    console.log(doctor_id, patient, prescriptions, date);

    try {
        await client.connect();

        const database = client.db("users1");
        const collection = database.collection("appointments");

        // Define the filter to identify the appointment
        const filter = { "date": date, "doctor_id": doctor_id, "patient_id": patient };

        // Define the update operation for prescriptions
        const prescriptionsUpdate = {
            "$set": {
                "prescriptions": prescriptions
            }
        };

        // Perform the update operation for prescriptions
		const result = await collection.updateOne(filter, prescriptionsUpdate);
        console.log(result);
		const result2 = await collection.findOne(filter);
        console.log(result2);

        if (result.modifiedCount > 0) {
        //if (result) {
            res.status(200).json({ success: true, message: "Prescriptions updated successfully" });
        } else {
            res.status(400).json({ success: false, message: "No matching appointment found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    } finally {
        await client.close();
    }
});

module.exports = router;
