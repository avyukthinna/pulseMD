const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const signupRoute = require("./auth/signup.js");
const loginRoute = require("./auth/login.js");
const updateProfilesRoute = require("./queries/updateProfiles.js");
const getVerifiedDocumentsRoute = require("./queries/getVerifiedDocuments.js");
const deleteAccountRoute = require("./auth/deleteAccount.js");
const bookAppointment = require("./queries/bookAppointment.js");
const getAppointments = require("./queries/getAppointments.js");
const rejectAppointment = require("./queries/rejectAppointment.js");
const queryOneDocument = require("./queries/queryOneDocument.js");
const acceptAppointment = require("./queries/acceptAppointment.js");
const yourpatients = require("./queries/yourpatients.js");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/updateProfiles", updateProfilesRoute);
app.use("/getVerifiedDocuments", getVerifiedDocumentsRoute);
app.use("/deleteAccount", deleteAccountRoute);
app.use("/fetchUser",queryOneDocument);
app.use("/getAppointments",getAppointments)
app.use("/acceptAppointment",acceptAppointment)
app.use("/rejectAppointment",rejectAppointment)
app.use("/yourpatients",yourpatients);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});