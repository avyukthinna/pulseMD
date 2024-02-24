const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");

const uri =
  "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const app = express();
const port = 3001;

app.use(cors());

async function getOneDocument(toFind, Collection) {
  try {
    console.log(toFind);
    await client.connect();

    const database = client.db("users");
    const collection = database.collection(Collection);

    const result = await collection.findOne({ toFind });

    console.log(result);
    if (result) {
      return result;
    } else {
      throw new Error("Document not found");
    }
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  } finally {
    await client.close();
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { getOneDocument };
