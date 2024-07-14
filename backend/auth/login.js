const express = require("express");
const { MongoClient } = require("mongodb");
const { rsa_decrypt } = require('../utils/rsa');
const { privateKey } = require('../utils/keys');

const router = express.Router();
const uri = "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

router.post("/", async (req, res) => {
  const { email, password, role } = req.body;
  console.log("Login attempt for email:", email);

  try {
    console.log(email, password, role);
    await client.connect();

    const database = client.db("users2");
    const collection = database.collection(role);
    const result = await collection.findOne({ email });
    
    if (!result) {
      res.status(401).json({ success: false, message: "Email doesn't exist" });
      return;
    }

    console.log("Retrieved encrypted password:", result.password);
    const decryptedPassword = rsa_decrypt(result.password, privateKey);
    console.log("Decrypted password:", decryptedPassword);

    if (password === decryptedPassword) {
      console.log("Password match:", true);
      res.status(200).json({ success: true, message: "Login successful", user: result });
    } else {
      console.log("Password match:", false);
      res.status(401).json({ success: false, message: "Invalid password" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    await client.close();
  }
});

module.exports = router;
