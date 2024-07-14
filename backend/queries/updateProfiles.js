const express = require("express");
const { MongoClient } = require("mongodb");
const { rsa_encrypt } = require('../utils/rsa');
const { publicKey, privateKey } = require('../utils/keys');

const router = express.Router();
const uri = "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

router.post("/", async (req, res) => {
  const { currentUser } = req.body;

  try {
    console.log("Updating profile for user:", currentUser.email);
    await updateProfileFields(currentUser);
    res.status(200).json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

async function updateProfileFields(user) {
  try {
    await client.connect();

    const database = client.db("users2");
    const collection = database.collection(user.role);

    const filter = { email: rsa_encrypt(user.email, publicKey) };

    const updateFields = {};
    for (const [key, value] of Object.entries(user)) {
      if (key !== '_id' && key !== 'email' && key !== 'password' && key !== 'role') {
        updateFields[key] = rsa_encrypt(value.toString(), publicKey);
      }
    }

    console.log("Encrypted update fields:", updateFields);

    const result = await collection.updateOne(filter, { $set: updateFields });
    console.log("Update result:", result);

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