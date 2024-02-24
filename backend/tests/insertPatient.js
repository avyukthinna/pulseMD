//const bcryptUtils = require("../utils/bcrypt-hashing.js");
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insertDoctor() {
  const dbName = "test";
  const colName = "testcol";
  try {
    await client.connect();

    const database = client.db(dbName); // Replace with your actual database name
    const collection = database.collection(colName);

    //const password = "ashverma";
    //const hashedPassword = await bcryptUtils.hashString(password);

    // const patientDocument = {
    //   email: "ashok.verma@outlook.com",
    //   password: hashedPassword,
    //   role: "patient",
    //   fullname: "Ashok Verma",
    //   image: "",
    //   gender: "",
    //   bloodgroup: "",
    //   address: "",
    //   isverified: false
    // };

    const filter = { email: "ashok.verma@outlook.com" }; // Filter condition
    const updateFields = {
      $set: {
        gender: "Male",
        bloodgroup: "A+",
        address: "New Address",
        isverified: true
      }
    };

    const result = await collection.updateOne(filter, updateFields);
    //const result = await collection.insertOne(patientDocument);

    console.log(`Inserted document with _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

insertDoctor();
