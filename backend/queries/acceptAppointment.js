const express = require("express");
const { MongoClient } = require("mongodb");

const router = express.Router();
const uri =
  "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

router.post("/", async (req, res) => {
    const { patient } = req.body;
    console.log(patient)

    try{
        await client.connect();
  
        // Get reference to the database and collection
        const database = client.db("users");
        const collection = database.collection("appointments");

        // Define the filter and update document
        const filter = { patient_id: patient };
        const updateDocument = {
            $set: {
              isConfirmed: true
            }
        };
        
        // Update the appointment document
        console.log("Update Query:", filter, updateDocument);
        const result = await collection.updateOne(filter, {$set: {
            isConfirmed: true
        }});
        console.log(result)
        if (result.modifiedCount > 0) {
            console.log("Appointment accepted");
        } else {
            console.log("Error");
        }
    } catch(error){
        console.error(error);
    }finally {
        await client.close();
    }
}
)

module.exports = router;