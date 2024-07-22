const express = require("express");
const { MongoClient } = require("mongodb");

delete require.cache[require.resolve('../utils/rsa')];

const { rsa_encrypt, normalizeEmail } = require('../utils/rsa');
const { publicKey } = require('../utils/keys');

console.log(typeof normalizeEmail);

const router = express.Router();
const uri = "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

router.post("/", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    console.log("Received signup request:", { name, email, role });
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("users2");
    const dbRole = role === "patient" ? "patient" : "doctor";
    const collection = database.collection(dbRole);

    let normalizedEmail = normalizeEmail(email);
    console.log('Normalized Email:', normalizedEmail);
    const encryptedEmail = rsa_encrypt(normalizedEmail, publicKey);
    console.log('Encrypted Email:', encryptedEmail);

    const userExists = await collection.findOne({ email: encryptedEmail });
    console.log('User exists:', userExists);

    if (userExists) {
      res.status(409).json({ success: false, message: "Email is already in use" });
    } else {
      const dummyGenderValue = rsa_encrypt("dummy_value", publicKey);

      let query;
      if (dbRole === "patient") {
        query = {
          email: rsa_encrypt(normalizedEmail, publicKey),
          password: rsa_encrypt(password, publicKey),
          role: rsa_encrypt(role, publicKey),
          fullname: rsa_encrypt(name, publicKey),
          age: rsa_encrypt("", publicKey),
          image: rsa_encrypt("", publicKey),
          gender: dummyGenderValue,
          bloodgroup: rsa_encrypt("", publicKey),
          address: rsa_encrypt("", publicKey),
          isverified: rsa_encrypt("false", publicKey),
        };
      } else {
        query = {
          email: rsa_encrypt(normalizedEmail, publicKey),
          password: rsa_encrypt(password, publicKey),
          role: rsa_encrypt(role, publicKey),
          fullname: rsa_encrypt(name, publicKey),
          image: rsa_encrypt("", publicKey),
          gender: dummyGenderValue,
          address: rsa_encrypt("", publicKey),
          age: rsa_encrypt("", publicKey),
          degree: rsa_encrypt("", publicKey),
          speciality: rsa_encrypt("", publicKey),
          regno: rsa_encrypt("", publicKey),
          regyear: rsa_encrypt("", publicKey),
          experience: rsa_encrypt("", publicKey),
          starttime: rsa_encrypt("", publicKey),
          endtime: rsa_encrypt("", publicKey),
          isverified: rsa_encrypt("false", publicKey),
        };
      }
      console.log('User query:', query);

      const result = await collection.insertOne(query);
      console.log('Insert result:', result);

      if (result) {
        res.status(200).json({ success: true, message: "Sign Up successful" });
      } else {
        res.status(401).json({ success: false, message: "Unable to Sign Up" });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
});

module.exports = router;


