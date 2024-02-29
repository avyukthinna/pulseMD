const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const signupRoute = require("./auth/signup.js");
const loginRoute = require("./auth/login.js");
const updateProfilesRoute = require("./queries/updateProfiles.js");
const getVerifiedDocumentsRoute = require("./queries/getVerifiedDocuments.js");
const deleteAccountRoute = require("./auth/deleteAccount.js");
const bookAppointment = require("./queries/bookAppointment.js")
const getAppointments = require("./queries/getAppointments.js")
const queryOneDocument = require("./queries/queryOneDocument.js")
const acceptAppointment = require("./queries/acceptAppointment.js")

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/updateProfiles", updateProfilesRoute);
app.use("/getVerifiedDocuments", getVerifiedDocumentsRoute);
app.use("/deleteAccount", deleteAccountRoute);
app.use("/bookAppointment",bookAppointment)
app.use("/fetchUser",queryOneDocument)
app.use("/getAppointments",getAppointments)
app.use("/acceptAppointment",acceptAppointment)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/* const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//Require your route handlers
// const loginRouter = require("./auth/login");
// const signupRouter = require("./auth/signup");
// const updateProfiles = require("./queries/updateProfiles");
const getVerifiedDoctors = require("./queries/getVerifiedDocuments");

const app = express();
const port = 3001;

// Mount the middleware
app.use(cors());
app.use(bodyParser.json());

// Mount the routers to specific paths
// app.use("/login", loginRouter);
// app.use("/signup", signupRouter);
// app.use("/updateProfiles", updateProfiles);
app.use("/getVerifiedDoctors", getVerifiedDoctors);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); */
