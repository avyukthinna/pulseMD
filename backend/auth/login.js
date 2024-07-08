const express = require("express");
const { MongoClient } = require("mongodb");
const { rsa_decrypt } = require('../utils/rsa');
const { privateKey } = require('../utils/keys');

const router = express.Router();
const uri = "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

router.post("/", async (req, res) => {
  const { email, password, role } = req.body;
  console.log(email);
  try {
    console.log(email, password, role);
    await client.connect();
    const database = client.db("users");
    const collection = database.collection(role);

    const result = await collection.findOne({ email });
    console.log(result);

    if (!result) {
      res.status(401).json({ success: false, message: "Email doesn't exist" });
      return;
    }

    console.log("Retrieved password:", result.password);
const decryptedPassword = rsa_decrypt(result.password, privateKey);
console.log("Decrypted password:", decryptedPassword);

    //const decryptedPassword = rsa_decrypt(result.password, privateKey);

    if (password === decryptedPassword) {
      res.status(200).json({ success: true, message: "Login successful", user: result });
    } else {
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
