const { MongoClient } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const uri =
  "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// TODO: Create Sperate Functions to Update Doctor and Patient.

app.post("/updateProfile", async (req, res) => {
  const { email, role, fieldsToUpdate } = req.body;

  try {
    await updateProfileFields(email, role, fieldsToUpdate);
    res
      .status(200)
      .json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

async function updateProfileFields(email, role, fieldsToUpdate) {
  try {
    await client.connect();

    const database = client.db("test");
    var dbRole = role === "patient" ? "patient" : "doctor";
    const collection = database.collection(dbRole);

    const filter = { email, role }; // Filter condition

    // Build the updateFields object with non-null values
    const updateFields = {};
    for (const [key, value] of Object.entries(fieldsToUpdate)) {
      if (value !== null && value !== undefined) {
        updateFields[key] = value;
      }
    }

    // Update the document
    const result = await collection.updateOne(filter, { $set: updateFields });

    if (result.modifiedCount > 0) {
      console.log("Profile fields updated successfully");
    } else {
      console.log("No matching document found for update");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  } finally {
    await client.close();
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
