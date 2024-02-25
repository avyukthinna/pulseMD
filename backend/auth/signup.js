const { MongoClient } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcryptUtils = require("../utils/bcrypt-hashing.js");
const e = require("express");

const uri =
  "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

//TODO: Sparate Funtion for doctor and patient sign up depending on role recieved

app.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    console.log(name, email, password, role);
    await client.connect();

    const database = client.db("users");
    var dbRole = role === "patient" ? "patient" : "doctor"; //selects the collections based on role recieved.

    const collection = database.collection(dbRole);
    const userExists = await collection.findOne({ email });

    if (userExists) {
      res
        .status(409)
        .json({ success: false, message: "Email is already in use" });
    } else {
      const hashedPassword = await bcryptUtils.hashString(password);

      console.log("hashed: ", hashedPassword);
      let query;
      if(dbRole == 'patient'){
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
          isverified: false
        } 
      } else{
        query = {
          email: email,
          password: hashedPassword,
          role: role,
          fullname: name,
          image: "",
          gender: "",
          address: "",
          age:"",
          degree:"",
          speciality:"",
          regno:"",
          regyear:"",
          experience:"",
          starttime:"",
          endtime:"",
          isverified: false
        } 
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
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
