const fs = require('fs');
const path = require('path');

const KEY_FILE = path.join(__dirname, 'rsa_keys.json');

let keys;

if (fs.existsSync(KEY_FILE)) {
  const keyData = fs.readFileSync(KEY_FILE, 'utf8');
  const loadedKeys = JSON.parse(keyData);
  
  // Convert strings back to BigInt
  keys = {
    publicKey: {
      e: BigInt(loadedKeys.publicKey.e),
      n: BigInt(loadedKeys.publicKey.n)
    },
    privateKey: {
      d: BigInt(loadedKeys.privateKey.d),
      n: BigInt(loadedKeys.privateKey.n)
    }
  };
  
  console.log("Loaded existing RSA keys");
} else {
  throw new Error("RSA keys not found. Please run generateKeys.js first.");
}

module.exports = keys;