const express = require("express");
const { MongoClient } = require("mongodb");

const router = express.Router();
const uri =
  "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

router.post("/", async (req, res) => {
  console.log(req.body);
  const { currentUser } = req.body;

  try {
    console.log(currentUser);
    await updateProfileFields(currentUser); //function call
    res
      .status(200)
      .json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

async function updateProfileFields(user) {
  try {
    //await client.connect();
    await client.connect(function(err) {
      if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
      }
      console.log('Connected successfully to server');
    
      // Your update operation here...
    });

    const database = client.db("users");
    const collection = database.collection(user.role);
    
    const filter = { email: user.email }; // Filter condition
    
    //If any fields sent are empty then
    const updateFields = {};
    if (user.role === "doctor") {
      // Update fields for doctors
      updateFields.fullname = user.fullname;
      updateFields.image = user.image || ""; //If no image is sent, it is set to ""
      updateFields.gender = user.gender;
      updateFields.address = user.address;
      updateFields.age = user.age;
      updateFields.degree = user.degree;
      updateFields.speciality = user.speciality;
      updateFields.regno = user.regno;
      updateFields.regyear = user.regyear;
      updateFields.experience = user.experience;
      updateFields.starttime = user.starttime;
      updateFields.endtime = user.endtime;
      updateFields.isverified = true;
    } else if (user.role === "patient") {
      // Update fields for patients
      updateFields.fullname = user.fullname;
      updateFields.age = user.age;
      updateFields.image = user.image || ""; //If no image is sent, it is set to ""
      updateFields.gender = user.gender;
      updateFields.bloodgroup = user.bloodgroup;
      updateFields.address = user.address;
      updateFields.isverified = true;
    }
    console.log(updateFields)
    // Update the document
    const result = await collection.updateOne(filter, { $set: updateFields });
  
    console.log(result)
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

module.exports = router;
