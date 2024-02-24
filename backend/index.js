const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const loginRouter = require('./auth/login');
const signupRouter = require('./auth/signup');
const getVerifiedDoctors = require('./queries/getVerifiedDocuments.js');
const updateProfiles = require('./queries/updateProfiles.js');


const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/getVerifiedDoctors', getVerifiedDoctors);
app.use('/updateProfiles', updateProfiles);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
