const crypto = require('crypto');

// Extended Euclidean algorithm to find modular inverse
function extended_gcd(a, b) {
    if (b === 0n) {
        return [a, 1n, 0n];
    }
    const [gcd, x1, y1] = extended_gcd(b, a % b);
    const x = y1;
    const y = x1 - (a / b) * y1;
    return [gcd, x, y];
}

// Modular inverse function
function mod_inverse(a, m) {
    const [gcd, x] = extended_gcd(a, m);
    if (gcd !== 1n) {
        throw new Error('Modular inverse does not exist');
    }
    return (x % m + m) % m;
}

// Modular exponentiation function
function mod_exp(base, exp, mod) {
    let result = 1n;
    while (exp > 0n) {
        if (exp % 2n === 1n) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        exp = exp / 2n;
    }
    return result;
}

// Generate RSA key pair
function generate_rsa_keys(bits) {
    const p = generate_prime(bits / 2);
    const q = generate_prime(bits / 2);
    const n = p * q;
    const phi = (p - 1n) * (q - 1n);
    const e = 65537n; // Public exponent, often a fixed value for simplicity
    const d = mod_inverse(e, phi); // Private exponent
    return { publicKey: { e, n }, privateKey: { d, n } };
}

// Check if a number is prime (basic implementation)
function is_prime(num) {
    if (num <= 1n) return false;
    if (num <= 3n) return true;
    if (num % 2n === 0n || num % 3n === 0n) return false;
    let i = 5n;
    while (i * i <= num) {
        if (num % i === 0n || num % (i + 2n) === 0n) return false;
        i += 6n;
    }
    return true;
}

// Generate large prime number
function generate_prime(bits) {
    let primeCandidate;
    do {
        primeCandidate = crypto.randomBytes(Math.ceil(bits / 8)).readBigInt64LE() >> 1n;
    } while (!is_prime(primeCandidate));
    return primeCandidate;
}

// Encrypt message using RSA
function rsa_encrypt(message, publicKey) {
    const { e, n } = publicKey;
    const messageBigInt = BigInt(`0x${Buffer.from(message).toString('hex')}`);
    const encryptedBigInt = mod_exp(messageBigInt, e, n);
    return encryptedBigInt.toString(16); // Return hex string
}

// Decrypt message using RSA
function rsa_decrypt(encryptedMessage, privateKey) {
    try {
      console.log("Encrypted message received:", encryptedMessage);
      const { d, n } = privateKey;
      console.log("Private key components:", { d, n });
  
      let encryptedHex = encryptedMessage;
      if (encryptedMessage instanceof Buffer) {
        encryptedHex = encryptedMessage.toString('hex');
      } else if (typeof encryptedMessage === 'object' && encryptedMessage.buffer) {
        encryptedHex = encryptedMessage.buffer.toString('hex');
      }
  
      if (!encryptedHex) {
        throw new Error("Encrypted message is empty");
      }
  
      console.log("Encrypted hex:", encryptedHex);
      const encryptedBigInt = BigInt(`0x${encryptedHex}`);
      console.log("Encrypted BigInt:", encryptedBigInt);
      const decryptedBigInt = mod_exp(encryptedBigInt, d, n);
      const decryptedHex = decryptedBigInt.toString(16);
      const decryptedBuffer = Buffer.from(decryptedHex, 'hex');
      return decryptedBuffer.toString();
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt the message');
    }
  }

module.exports = { generate_rsa_keys, rsa_encrypt, rsa_decrypt };



