const bcryptUtils = require("../utils/bcrypt-hashing.js");
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insertDoctor() {
  const dbName = "users2";
  const colName = "doctor";
  try {
    await client.connect();

    const database = client.db(dbName); // Replace with your actual database name
    const collection = database.collection(colName);

    const password = "Sandeep123";
    const hashedPassword = await bcryptUtils.hashString(password);

    const doctorDocument = {
    email: "Sandeep.Ravichandra@gmail.com",
      password: hashedPassword,
      fullname: "Sandeep Ravichandra",
      image: "https://media.discordapp.net/attachments/1208850050667773984/1208859974193909800/sand.png?ex=65e4d195&is=65d25c95&hm=ce36657fb4f9942029adbcdcba50f26a7aa2207657e40313e08cbd67bf805efc&=&format=webp&quality=lossless&width=447&height=437",
      age: 41,
      gender: "Male",
      address: "No. 34 Kumara Park, Bangaluru - 560025",
      role: "doctor",
      degree: "MBBS, MD",
      speciality: "psychologist",
      regno: "734406",
      regyear: "2006",
      experience: "18",
      starttime: "11:00",
      endtime: "21:00",
      isverified: true,
    };

    const result = await collection.insertOne(doctorDocument);

    console.log(`Inserted document with _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

insertDoctor();
