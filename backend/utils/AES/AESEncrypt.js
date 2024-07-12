// import {SBOX} from './SBox.js';
// import { RCON } from './RCON.js';
const {SBOX,INV_SBOX} =  require('./SBox.js');
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

function subBytes(state) {
  for (let i = 0; i < 16; i++) {
    state[i] = SBOX[state[i]];
  }
}

function shiftRows(state) {
  const temp = [
    state[0], state[1], state[2], state[3],
    state[4], state[5], state[6], state[7],
    state[8], state[9], state[10], state[11],
    state[12], state[13], state[14], state[15]
  ];
  
  state[1] = temp[5]; state[5] = temp[9]; state[9] = temp[13]; state[13] = temp[1];
  state[2] = temp[10]; state[6] = temp[14]; state[10] = temp[2]; state[14] = temp[6];
  state[3] = temp[15]; state[7] = temp[3]; state[11] = temp[7]; state[15] = temp[11];
}

function mulBy02(num) {
  return ((num << 1) & 0xFF) ^ (((num >> 7) & 1) * 0x1B);
}

function mulBy03(num) {
  return mulBy02(num) ^ num;
}

function mixColumns(state) {
  for (let c = 0; c < 4; c++) {
    const a = [
      state[c], state[4 + c], state[8 + c], state[12 + c]
    ];
    
    const b = [
      mulBy02(a[0]) ^ mulBy03(a[1]) ^ a[2] ^ a[3],
      a[0] ^ mulBy02(a[1]) ^ mulBy03(a[2]) ^ a[3],
      a[0] ^ a[1] ^ mulBy02(a[2]) ^ mulBy03(a[3]),
      mulBy03(a[0]) ^ a[1] ^ a[2] ^ mulBy02(a[3])
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

function aesEncrypt(plaintext, key) {
  const state = plaintext.slice();
  const expandedKey = keyExpansion(key);
  
  addRoundKey(state, expandedKey.slice(0, 16));
  console.log(`\nResult after Pre-round Transformation:`);
  printState(state);
  
  for (let round = 1; round < 10; round++) {
    console.log(`\n\nROUND ${round}`);
    subBytes(state);
    console.log(`\nResult after Subbytes:`);
    printState(state);
    shiftRows(state);
    console.log(`\nResult after shiftRows:`);
    printState(state);
    mixColumns(state);
    console.log(`\nResult after mixColumns:`);
    printState(state);
    addRoundKey(state, expandedKey.slice(round * 16, (round + 1) * 16));
    console.log(`\nResult after addRoundKey:`);
    printState(state);
  }
  
  console.log(`\n\nROUND 10`);
  
  subBytes(state);
  console.log(`\nResult after Subbytes:`);
  printState(state);

  shiftRows(state);
  console.log(`\nResult after shiftRows:`);
  printState(state);

  addRoundKey(state, expandedKey.slice(160, 176));
  console.log(`\nEncrypted Resultant Block:`);
  printState(state);
  
  return state;
}

const key = [
  0x2b, 0x28, 0xab, 0x09,
  0x7e, 0xae, 0xf7, 0xcf,
  0x15, 0xd2, 0x15, 0x4f,
  0x16, 0xa6, 0x88, 0x3c
];

// Example usage
//const inputString = "Cryptography it seems lol";

/*function stateToString(state) {
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += String.fromCharCode(state[i]);
  }
  return result;
}*/

function stringToState(input) {
  const state = new Array(16).fill(0); // AES state is a 4x4 matrix (16 bytes)
  
  for (let i = 0; i < input.length; i++) {
    /*const charCode = input.charCodeAt(i);
    const row = i % 4;
    const col = Math.floor(i / 4);
    state[row * 4 + col] = charCode;*/
    state[i] = input.charCodeAt(i);
  }
  
  return state;
}

function stateToBase64(state) {
  return btoa(String.fromCharCode.apply(null, state));
}

function Encryption(input){
  console.log("Plaintext String: "+ input);

  const state = stringToState(input);
  
  console.log("Plaintext state:");
  console.log(state);

  const ciphertext = [];
  for (let i = 0; i < state.length; i += 16) {
    const block = state.slice(i, i + 16);
    console.log("\n\nBlock "+ parseInt((i+1)/16));
    printState(block);
    ciphertext.push(aesEncrypt(block, key));
  }

  //console.log("Ciphertext:");
  //console.log(ciphertext);

  let encryptedString = '';
  for (let block of ciphertext) {
    //encryptedString += stateToString(block);
    encryptedString += stateToBase64(block);
  }
  return encryptedString;
}

const encryptedString = Encryption(inputString);
console.log("\n\nEncrypted String:");
console.log(encryptedString);

module.exports = {
  Encryption,
}

