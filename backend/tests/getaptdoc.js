const { MongoClient, ObjectId } = require("mongodb");

async function main() {
  // Connection URI
  const uri =
    "mongodb+srv://Application:catmouse@cluster0.khl9yeo.mongodb.net/?retryWrites=true&w=majority";

  // MongoDB client
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();

    const doctorId = 'avy@gmail.com';

    // Database and collections
    const database = client.db("users1");
    const appointmentsCollection = database.collection("appointments");
    const patientCollection = database.collection("patient");

    // Perform aggregation to join patient information
    const result = await appointmentsCollection.aggregate([
      {
        $match: { doctor_id: doctorId }
      },
      {
        $lookup: {
          from: "patient",
          localField: "patient_id",
          foreignField: "email",
          as: "patient"
        }
      },
      {
        $unwind: "$patient"
      },
      {
        $project: {
          appointment_id: "$_id",
          date: 1,
          symptoms: 1,
          patient_id: "$patient.email",  // Convert patient_id to ObjectId
          patient_name: "$patient.fullname",
          gender: "$patient.gender",
          bloodgroup: "$patient.bloodgroup",
          age: "$patient.age",
          isConfirmed: 1
        }
      }
    ]).toArray();

    console.log("Aggregated Data:", result);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

// Run the main function
main();
