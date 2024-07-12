const {SBOX,INV_SBOX} =  require('./SBox.js');
//import { RCON } from './RCON.js';
const RCON = require('./RCON.js')

//console.log = function() {} //to Enable and disable console.log

function printState(state) {
  /*if (state.length !== 16) {
    console.error("State must be an array of 16 elements.");
    return;
  }*/

  while (state.length < 16) {
      state.push(0);
  }
  
  for (let row = 0; row < 4; row++) {
    let rowValues = [];
    for (let col = 0; col < 4; col++) {
      rowValues.push(state[row + col*4]/*.toString(16).padStart(2, '0')*/);
    }
    console.log(rowValues.join(' '));
  }
}


function invSubBytes(state) {
  for (let i = 0; i < 16; i++) {
    state[i] = INV_SBOX[state[i]];
  }
}

function invShiftRows(state) {
  const temp = [
    state[0], state[1], state[2], state[3],
    state[4], state[5], state[6], state[7],
    state[8], state[9], state[10], state[11],
    state[12], state[13], state[14], state[15]
  ];
  
  state[1] = temp[13]; state[5] = temp[1]; state[9] = temp[5]; state[13] = temp[9];
  state[2] = temp[10]; state[6] = temp[14]; state[10] = temp[2]; state[14] = temp[6];
  state[3] = temp[7]; state[7] = temp[11]; state[11] = temp[15]; state[15] = temp[3];
}

function mulBy02(num) {
  return ((num << 1) & 0xFF) ^ (((num >> 7) & 1) * 0x1B);
}

function mulBy09(num) {
  return mulBy02(mulBy02(mulBy02(num))) ^ num;
}

function mulBy0B(num) {
  return mulBy02(mulBy02(mulBy02(num))) ^ mulBy02(num) ^ num;
}

function mulBy0D(num) {
  return mulBy02(mulBy02(mulBy02(num))) ^ mulBy02(mulBy02(num)) ^ num;
}

function mulBy0E(num) {
  return mulBy02(mulBy02(mulBy02(num))) ^ mulBy02(mulBy02(num)) ^ mulBy02(num);
}

function invMixColumns(state) {
  for (let c = 0; c < 4; c++) {
    const a = [
      state[c], state[4 + c], state[8 + c], state[12 + c]
    ];
    
    const b = [
      mulBy0E(a[0]) ^ mulBy0B(a[1]) ^ mulBy0D(a[2]) ^ mulBy09(a[3]),
      mulBy09(a[0]) ^ mulBy0E(a[1]) ^ mulBy0B(a[2]) ^ mulBy0D(a[3]),
      mulBy0D(a[0]) ^ mulBy09(a[1]) ^ mulBy0E(a[2]) ^ mulBy0B(a[3]),
      mulBy0B(a[0]) ^ mulBy0D(a[1]) ^ mulBy09(a[2]) ^ mulBy0E(a[3])
    ];
    
    state[c] = b[0];
    state[4 + c] = b[1];
    state[8 + c] = b[2];
    state[12 + c] = b[3];
  }
}

function addRoundKey(state, roundKey) {
  for (let i = 0; i < 16; i++) {
    state[i] ^= roundKey[i];
  }
}

function keyExpansion(key) {
  const expandedKey = new Array(176);
  for (let i = 0; i < 16; i++) {
    expandedKey[i] = key[i];
  }
  
  let bytesGenerated = 16;
  let rconIteration = 1;
  
  while (bytesGenerated < 176) {
    let temp = [
      expandedKey[bytesGenerated - 4],
      expandedKey[bytesGenerated - 3],
      expandedKey[bytesGenerated - 2],
      expandedKey[bytesGenerated - 1]
    ];
    
    if (bytesGenerated % 16 === 0) {
      temp = [
        SBOX[temp[1]] ^ RCON[rconIteration],
        SBOX[temp[2]],
        SBOX[temp[3]],
        SBOX[temp[0]]
      ];
      rconIteration++;
    }
    
    for (let i = 0; i < 4; i++) {
      expandedKey[bytesGenerated] = expandedKey[bytesGenerated - 16] ^ temp[i];
      bytesGenerated++;
    }
  }
  
  return expandedKey;
}

function aesDecrypt(ciphertext, key) {
  const state = ciphertext.slice();
  const expandedKey = keyExpansion(key);
  
  addRoundKey(state, expandedKey.slice(160, 176));
  console.log(`\nResult after Pre-round Transformation:`);
  printState(state);
  
  for (let round = 9; round > 0; round--) {
    console.log(`\n\nROUND ${10-round}`);
    
    invShiftRows(state);
    console.log(`\nResult after InvShiftRows:`);
    printState(state);

    invSubBytes(state);
    console.log(`\nResult after InvSubBytes:`);
    printState(state);
    
    addRoundKey(state, expandedKey.slice(round * 16, (round + 1) * 16));
    console.log(`\nResult after addRoundKey:`);
    printState(state);
    
    invMixColumns(state);
    console.log(`\nResult after InvMixColumns:`);
    printState(state);
  }

  console.log(`\n\nROUND 10`);
  invShiftRows(state);
  console.log(`\nResult after InvShiftRows:`);
  printState(state);
  
  invSubBytes(state);
  console.log(`\nResult after InvSubBytes:`);
  printState(state);
  
  addRoundKey(state, expandedKey.slice(0, 16));
  console.log(`\nDecrypted Resultant Block:`);
  printState(state);
  
  return state;
}

function stateToString(state) {
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += String.fromCharCode(state[i]);
  }
  return result;
}

// Example usage
const key = [
  0x2b, 0x28, 0xab, 0x09,
  0x7e, 0xae, 0xf7, 0xcf,
  0x15, 0xd2, 0x15, 0x4f,
  0x16, 0xa6, 0x88, 0x3c
];

function stringToState(input) {
  const state = new Array(input.length).fill(0); // AES state is a 4x4 matrix (16 bytes)
  
  for (let i = 0; i < input.length; i++) {
    /*const charCode = input.charCodeAt(i);
    const row = i % 4;
    const col = Math.floor(i / 4);
    state[row * 4 + col] = charCode;*/
    state[i] = input.charCodeAt(i);
  }
  
  return state;
}

function base64ToState(base64) {
  return atob(base64).split('').map(c => c.charCodeAt(0));
}

//const inputString = "2KWP0InmVUDXpfGpVavw7Q==Oh//cAB3ubv4+EtMSIUXmw==";
/*const state = [109, 129, 149,  66,  58,
  237, 108,  39, 108,  97,
  154,  66,   8, 213, 157,
  104, 128,   3, 163,  11, 152, 121,
  153,  26,   6, 138,  92,  45,
  181, 242, 101,  57]*/


function Decryption(inputString){
  console.log("Ciphertext:");
  console.log(inputString);
  const state = stringToState(inputString);
  console.log("Ciphertext state:");
  console.log(state);

  const plaintext = [];
  for (let i = 0; i < inputString.length; i += 24) {
    const base64Block = inputString.slice(i, i + 24);
    const block = base64ToState(base64Block);
    console.log("\n\nBlock "+ parseInt((i+1)/24));
    printState(block);

    plaintext.push(aesDecrypt(block, key));
  }

  let decryptedString = '';
  for (let block of plaintext) {
    decryptedString += stateToString(block);
  }

  /*console.log("Decrypted Plaintext:");
  console.log(plaintext);*/

  return decryptedString;
}

// const decryptedString = Decryption(inputString);
// console.log("\nDecrypted string:");
// console.log(decryptedString);

//const decryptedPlaintext = aesDecrypt(ciphertext, key);

module.exports = {
  Decryption,
};