const fs = require('fs');
const path = require('path');
const { generate_rsa_keys } = require('./rsa');

const KEY_FILE = path.join(__dirname, 'rsa_keys.json');

if (!fs.existsSync(KEY_FILE)) {
  const keys = generate_rsa_keys(2048);
  
  console.log("Generated RSA Keys:");
  console.log("Public Key (e, n):", keys.publicKey.e.toString(), keys.publicKey.n.toString());
  console.log("Private Key (d, n):", keys.privateKey.d.toString(), keys.privateKey.n.toString());

  const serializableKeys = {
    publicKey: {
      e: keys.publicKey.e.toString(),
      n: keys.publicKey.n.toString()
    },
    privateKey: {
      d: keys.privateKey.d.toString(),
      n: keys.privateKey.n.toString()
    }
  };

  fs.writeFileSync(KEY_FILE, JSON.stringify(serializableKeys), 'utf8');
  console.log("Generated and saved new RSA keys");
} else {
  console.log("RSA keys already exist");
}


