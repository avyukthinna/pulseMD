const { generate_rsa_keys } = require('../utils/rsa');
const { publicKey, privateKey } = generate_rsa_keys(2048);

module.exports = { publicKey, privateKey };
