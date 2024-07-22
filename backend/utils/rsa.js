const crypto = require('crypto');

function extended_gcd(a, b) {
    if (b === 0n) {
        return [a, 1n, 0n];
    }
    const [gcd, x1, y1] = extended_gcd(b, a % b);
    const x = y1;
    const y = x1 - (a / b) * y1;
    return [gcd, x, y];
}

function mod_inverse(a, m) {
    const [gcd, x] = extended_gcd(a, m);
    if (gcd !== 1n) {
        throw new Error('Modular inverse does not exist');
    }
    return (x % m + m) % m;
}

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

function generate_rsa_keys(bits) {
    console.log("Generating RSA keys");
    const p = generate_prime(bits / 2);
    const q = generate_prime(bits / 2);
    const n = p * q;
    const phi = (p - 1n) * (q - 1n);
    const e = 65537n;
    const d = mod_inverse(e, phi);
    console.log("RSA keys generated");
    return { publicKey: { e, n }, privateKey: { d, n } };
}

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

function generate_prime(bits) {
    let primeCandidate;
    do {
        primeCandidate = crypto.randomBytes(Math.ceil(bits / 8)).readBigInt64LE() >> 1n;
    } while (!is_prime(primeCandidate));
    return primeCandidate;
}

function rsa_encrypt(message, publicKey) {
    const { e, n } = publicKey;
    if (!message || message === '') {
        return '0';
    }
    console.log("Encrypting message:", message);
    const messageBuffer = Buffer.from(message, 'utf-8');
    const messageBigInt = BigInt('0x' + messageBuffer.toString('hex'));
    const encryptedBigInt = mod_exp(messageBigInt, e, n);
    console.log("Message encrypted");
    return encryptedBigInt.toString(16);
}

function rsa_decrypt(encryptedMessage, privateKey) {
    try {
        const { d, n } = privateKey;
        if (encryptedMessage === '0') {
            return '';
        }
        console.log("Decrypting message:", encryptedMessage);
        const encryptedBigInt = BigInt('0x' + encryptedMessage);
        const decryptedBigInt = mod_exp(encryptedBigInt, d, n);
        const decryptedHex = decryptedBigInt.toString(16);
        const paddedHex = decryptedHex.length % 2 ? '0' + decryptedHex : decryptedHex;
        const decryptedBuffer = Buffer.from(paddedHex, 'hex');
        console.log("Message decrypted");
        return decryptedBuffer.toString('utf-8').replace(/\0/g, '');
    } catch (error) {
        console.error('Decryption error:', error);
        return '';
    }
}

function normalizeEmail(email) {
    console.log("Normalizing email:", email);
    return email.trim().toLowerCase();
}

module.exports = { generate_rsa_keys, rsa_encrypt, rsa_decrypt, normalizeEmail };