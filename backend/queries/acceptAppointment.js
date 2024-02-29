const express = require("express");
const { MongoClient } = require("mongodb");

const router = express.Router();
const uri =
  "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

router.post("/", async (req, res) => {
    const {app_id} = req.body;

    try{
        await client.connect();
  
        // Get reference to the database and collection
        const database = client.db("users");
        const collection = database.collection("appointments");

        // Define the filter and update document
        const filter = { _id: app_id };
        const updateDocument = {
            $set: {
              isConfirmed: true
            }
        };
        
        // Update the appointment document
        const result = await collection.updateOne(filter, updateDocument);
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