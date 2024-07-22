const fs = require('fs');
const path = require('path');

const KEY_FILE = path.join(__dirname, 'rsa_keys.json');

let keys;

if (fs.existsSync(KEY_FILE)) {
  const keyData = fs.readFileSync(KEY_FILE, 'utf8');
  const loadedKeys = JSON.parse(keyData);
  
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
  
  console.log("Loaded existing RSA keys:");
  console.log("Public Key (e, n):", keys.publicKey.e.toString(), keys.publicKey.n.toString());
  console.log("Private Key (d, n):", keys.privateKey.d.toString(), keys.privateKey.n.toString());
} else {
  throw new Error("RSA keys not found. Please run generateKeys.js first.");
}

module.exports = keys;

