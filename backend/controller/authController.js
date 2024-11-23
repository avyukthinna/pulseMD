const express = require("express");
const bcryptUtils = require("../utils/bcrypt-hashing.js");
const connectDB = require("../configs/mongodbConfig.js");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Log the incoming data
    console.log(email, password, role);

    const db = await connectDB();
    const collection = db.collection(role);

    // Find the user by email
    const result = await collection.findOne({ email });

    if (!result) {
      return res
        .status(401)
        .json({ success: false, message: "Email doesn't exist" });
    }

    // Compare the hashed password
    const isMatch = await bcryptUtils.compareHash(password, result.password);

    if (isMatch) {
      const { _id, password, ...userData } = result;
      console.log(result);
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: userData,
      });
    } else {
      // If passwords don't match
      res.status(401).json({ success: false, message: "Invalid password" });
    }
  } catch (error) {
    console.error("Error:", error);
    // If any other error occurs, send a server error response
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    console.log(name, email, password, role);

    const db = await connectDB();
    const dbRole = role === "patient" ? "patient" : "doctor"; //selects the collections based on role recieved.

    const collection = db.collection(dbRole);
    const userExists = await collection.findOne({ email });

    if (userExists) {
      res
        .status(409)
        .json({ success: false, message: "Email is already in use" });
    } else {
      const hashedPassword = await bcryptUtils.hashString(password);

      console.log("hashed: ", hashedPassword);
      let query;
      if (dbRole === "patient") {
        query = {
          email: email,
          password: hashedPassword,
          role: role,
          fullname: name,
          age: "",
          image: "",
          gender: "",
          bloodgroup: "",
          address: "",
          isverified: false,
        };
      } else {
        query = {
          email: email,
          password: hashedPassword,
          role: role,
          fullname: name,
          image: "",
          gender: "",
          address: "",
          age: "",
          degree: "",
          speciality: "",
          regno: "",
          regyear: "",
          experience: "",
          starttime: "",
          endtime: "",
          isverified: false,
        };
      }

      const result = await collection.insertOne(query);

      if (result) {
        console.log(result);
        res.status(200).json({ success: true, message: "Sign Up successful" });
      } else {
        res.status(401).json({ success: false, message: "Unable to Sign Up" });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.delete("/delete", async (req, res) => {
  const { email, role } = req.body;

  try {
    console.log("Profile to Delete: ", email, role);
    const db = await connectDB();
    const collection = db.collection(role);

    const result = await collection.deleteOne({ email: email });

    if (result.deletedCount === 1) {
      res
        .status(200)
        .json({ success: true, message: "Account successfully deleted!" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "User account not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/updateProfile", async (req, res) => {
  const { currentUser } = req.body;
  console.log(currentUser.role);

  try {
    const db = await connectDB();
    const collection = db.collection(currentUser.role);

    const { _id, email, password, role, ...updateField } = currentUser;
    // console.log("Update Field:",updateField);

    const result = await collection.updateOne({email: email},{$set: updateField});
    // console.log("Result:",result);
    if (result.modifiedCount > 0) {
      res
        .status(200)
        .json({ success: true, message: "Profile updated successfully" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "Profile update failed" });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
})

module.exports = router;
