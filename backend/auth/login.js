const express = require("express");
const { MongoClient } = require("mongodb");
const { rsa_decrypt, rsa_encrypt, normalizeEmail } = require('../utils/rsa');
const { privateKey, publicKey } = require('../utils/keys');

const router = express.Router();
const uri = "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

router.post("/", async (req, res) => {
  const { email, password, role } = req.body;
  console.log("Login attempt for email:", email);

  try {
    await client.connect();
    
    const database = client.db("users2");
    const collection = database.collection(role);

    const normalizedEmail = normalizeEmail(email);
    const encryptedEmail = rsa_encrypt(normalizedEmail, publicKey); 
    const result = await collection.findOne({ email: encryptedEmail });

    if (!result) {
      res.status(401).json({ success: false, message: "Email doesn't exist" });
      return;
    }

    const decryptedPassword = rsa_decrypt(result.password, privateKey);
    const decryptedEmail = rsa_decrypt(result.email, privateKey);

    if (password === decryptedPassword) {
      const decryptedUser = { _id: result._id, email: decryptedEmail };
      for (const [key, value] of Object.entries(result)) {
        if (key !== '_id') {
          try {
            decryptedUser[key] = rsa_decrypt(value, privateKey);
          } catch (error) {
            console.error(`Error decrypting ${key}:`, error);
            decryptedUser[key] = '';
          }
        }
      }
      console.log("Decrypted user data:", decryptedUser);
      res.status(200).json({ success: true, message: "Login successful", user: decryptedUser });
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
