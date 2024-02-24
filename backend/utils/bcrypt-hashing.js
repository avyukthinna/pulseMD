const bcrypt = require("bcrypt");
const saltRounds = 10;

async function hashString(string) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(string, saltRounds, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

async function compareHash(string, hashedString) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(string, hashedString, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  hashString,
  compareHash,
};
