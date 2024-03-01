const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function getOneDocument(toFind, Collection) {
  try {
    console.log(toFind);
    await client.connect();

    const database = client.db("users");
    const collection = database.collection(Collection);

    const result = await collection.findOne({ _id: toFind });

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

module.exports = { getOneDocument };
