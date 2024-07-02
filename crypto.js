import { encrypt, decrypt } from 'caesar-encrypt'
import MonoAlphabeticCipher from 'text-ciphers/monoalphabetic'
import CryptoJS from 'crypto-js'

//Caesar Cipher
export function CaesarEncrypt(input,shifts) {
return encrypt(input, shifts)
}
export function CaesarDecrypt(input,shifts) {
return decrypt(input, shifts)
}

//Mono alphabetic Cipher

export function generateRandomKey() {
  let key = '';
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const shuffledAlphabet = alphabet.split('').sort(() => Math.random() - 0.5);

  for (let i = 0; i < 26; i++) {
    key += shuffledAlphabet[i];
  }
  return key;
}
export function MonoEncrypt(input,key) {

const monoalphabeticCipher = new MonoAlphabeticCipher({
        substitution: key
    });

   return monoalphabeticCipher.encipher(input);
}
export function MonoDecrypt(input,key) {
    const monoalphabeticCipher = new MonoAlphabeticCipher({
        substitution: key
    });

   return monoalphabeticCipher.decipher(input).toUpperCase();
}

//Vigenere Cipher

function generateKey(str,key)
{

     key=key.split("");
    if(str.length == key.length)
        return key.join("");
    else
    {
        let temp=key.length;
        for (let i = 0;i<(str.length-temp) ; i++)
        {

            key.push(key[i % ((key).length)])
        }
    }
    return key.join("");
}
function cipherText(str,key)
{
    let cipher_text="";

    for (let i = 0; i < str.length; i++)
    {
        let x = (str[i].charCodeAt(0) + key[i].charCodeAt(0)) %26;
        x += 'A'.charCodeAt(0);
        cipher_text+=String.fromCharCode(x);
    }
    return cipher_text;
}

function originalText(cipher_text,key)
{
    let orig_text="";

    for (let i = 0 ; i < cipher_text.length ; i++)
    {
        let x = (cipher_text[i].charCodeAt(0) -
                    key[i].charCodeAt(0) + 26) %26;
        x += 'A'.charCodeAt(0);
        orig_text+=String.fromCharCode(x);
    }
    return orig_text;
}


export function PolyEncrypt(str,keyword) {

  let key = generateKey(str, keyword);

  let cipher_text = cipherText(str, key);

  return cipher_text.toUpperCase();

}
export function PolyDecrypt(str,keyword) {

  let key = generateKey(str, keyword);
 return  originalText(str, key).toUpperCase();
}


//Hill Cipher

function determinant(matrix) {
  return matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
         matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
         matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]);
}

function adjoint(matrix) {
  let result = [
      [
          (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) % 26,
          -(matrix[0][1] * matrix[2][2] - matrix[0][2] * matrix[2][1]) % 26,
          (matrix[0][1] * matrix[1][2] - matrix[0][2] * matrix[1][1]) % 26,
      ],
      [
          -(matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) % 26,
          (matrix[0][0] * matrix[2][2] - matrix[0][2] * matrix[2][0]) % 26,
          -(matrix[0][0] * matrix[1][2] - matrix[0][2] * matrix[1][0]) % 26,
      ],
      [
          (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]) % 26,
          -(matrix[0][0] * matrix[2][1] - matrix[0][1] * matrix[2][0]) % 26,
          (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) % 26,
      ]
  ];

  for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].length; j++) {
          if (result[i][j] < 0) {
              result[i][j] += 26;
          }
      }
  }

  return result;
}


function multiply(a,str){
  let d=[],t;

     for(let i=0;i<3;i++){
       t=0;
       for(let j=0;j<3;j++){
         t+=a[i][j]*str[j]
       }
       d.push(t%26)
     }
     return d
}

function convertedText(d){
 let cipher = "";
   for (let i = 0; i < d.length; i++) {
       cipher += String.fromCharCode(d[i]+65);
   }
   return cipher
}

function getMatrix(letters){
  let asciiValues = [];

for (let i = 0; i < letters.length; i++) {
    asciiValues.push(letters.charCodeAt(i)-65);
}

let matrix = [];
for (let i = 0; i < 3; i++) {
    matrix[i] = [];
    for (let j = 0; j < 3; j++) {
        matrix[i][j] = asciiValues[i * 3 + j];
    }
}

return matrix;
}

function findMultiplicativeInverse(a) {
  let n=26;
  a = (a % n + n) % n;
  for (let b = 1; b < n; b++) {
      if ((a * b) % n === 1) {
          return b;
      }
  }
  return null;
}


function isAlphabet(character) {
  return /^[a-zA-Z]$/.test(character);
}
export function HillEncrypt(msg,keyword) {

    let a = getMatrix(keyword)

    let c = [];
    for (let i = 0; i < msg.length; i++) {
      if(isAlphabet(msg[i]))
        c.push(msg.charCodeAt(i)-65);
    }

    while(c.length%3!==0){
      c.push(16)
    }

    let nested1 = [];
    for (let i = 0; i < c.length; i += 3) {
        nested1.push(c.slice(i, i + 3));
    }


  let len=c.length;
  let p=len/3,d="";

  let cipher=""
  for(let z=0;z<p;z++){
    d= multiply(a,nested1[z])
    cipher+=convertedText(d)
  }

return cipher

}
export function HillDecrypt(cipher,keyword) {

let mat = getMatrix(keyword)

let det =determinant(mat)%26
if(det<0) det+=26

let mulInv= findMultiplicativeInverse(det);

let adj = adjoint(mat);


let b = [];
  for (let i = 0; i < 3; i++) {
      b[i] = [];
      for (let j = 0; j < 3; j++) {
          b[i][j] = (adj[i][j] *mulInv)%26 ;
      }
  }


    let c = [];
    for (let i = 0; i < cipher.length; i++) {
        c.push(cipher.charCodeAt(i)-65);
    }
     while(c.length%3!==0){
      c.push(0)
    }

    let nested2 = [];
    for (let i = 0; i < c.length; i += 3) {
        nested2.push(c.slice(i, i + 3));
    }


  let len=cipher.length;
  let p=len/3,d="";

  let decipher=""

  for(let z=0;z<p;z++){
    d= multiply(b,nested2[z])
    decipher+=convertedText(d)
  }

  while (decipher.endsWith('Q')) {
    decipher =decipher.slice(0, -1);
}
  return decipher
}


//PlayFair Cipher

function generateKeyTable(key, ks, keyT) {
  let i, j, k;

  // a 26 character hashmap
  // to store count of the alphabet
  let dicty = new Array(26).fill(0);
  for (i = 0; i < ks; i++) {
      let r = key[i].charCodeAt(0) - 97;

      if (key[i] != 'j') {
          dicty[r] = 2;
      }

  }

  dicty['j'.charCodeAt(0) - 97] = 1;
  i = 0;
  j = 0;

  for (k = 0; k < ks; k++) {
      let r = key[k].charCodeAt(0) - 97;
      if (dicty[r] == 2) {
          dicty[r] -= 1;
          keyT[i][j] = key[k];
          j++;
          if (j == 5) {
              i++;
              j = 0;
          }
      }
  }

  for (k = 0; k < 26; k++) {
      if (dicty[k] == 0) {
          keyT[i][j] = String.fromCharCode(k + 97);
          j++;
          if (j == 5) {
              i++;
              j = 0;
          }
      }
  }
  return keyT;
}

// Function to search for the characters of a digraph
// in the key square and return their position
function search(keyT, a, b, arr) {
  let i, j;

  if (a == 'j')
      a = 'i';
  else if (b == 'j')
      b = 'i';

  for (i = 0; i < 5; i++) {

      for (j = 0; j < 5; j++) {

          if (keyT[i][j] == a) {
              arr[0] = i;
              arr[1] = j;
          }
          else if (keyT[i][j] == b) {
              arr[2] = i;
              arr[3] = j;
          }
      }
  }
  return arr;
}



// Function to make the plain text length to be even
function prepare(str, ptrs) {
  if (ptrs % 2 != 0) {
      str += 'z';
  }

  return [str, ptrs];
}

// Function for performing the encryption
function Playencrypt(str, keyT, ps) {
  let i;
  let a = new Array(4).fill(0);
  let newstr = new Array(ps);

  for (i = 0; i < ps; i += 2) {
      let brr = search(keyT, str[i], str[i + 1], a);
      let k1 = brr[0];
      let k2 = brr[1];
      let k3 = brr[2];
      let k4 = brr[3];
      if (k1 == k3) {
          newstr[i] = keyT[k1][(k2 + 1) % 5];
          newstr[i + 1] = keyT[k1][(k4 + 1) % 5];
      }
      else if (k2 == k4) {
          newstr[i] = keyT[(k1 + 1) % 5][k2];
          newstr[i + 1] = keyT[(k3 + 1) % 5][k2];
      }
      else {
          newstr[i] = keyT[k1][k4];
          newstr[i + 1] = keyT[k3][k2];
      }
  }
  let res = "";

  for (let i = 0; i < newstr.length; i++) { res += newstr[i]; }
  return res;
}

export function PlayfairEncrypt(str, key) {
  let ps, ks;
  let keyT = new Array(5);

  for (let i = 0; i < 5; i++) {
      keyT[i] = new Array(5);
  }
  str = str.trim();
  key = key.trim();
  str = str.toLowerCase();

  key = key.toLowerCase();
  ps = str.length;
  ks = key.length;
  [str, ps] = prepare(str, ps);

  let kt = generateKeyTable(key, ks, keyT);
  return Playencrypt(str, kt, ps);
}

function toLowerCase(plain) {
  // Convert all the characters of a string to lowercase
  return plain.toLowerCase();
  }

  function removeSpaces(plain) {
  // Remove all spaces in a string
  // can be extended to remove punctuation
  return plain.split(' ').join('');
  }

  function generateKeyTable2(key) {
  // generates the 5x5 key square
  var keyT = new Array(5).fill(null).map(() => new Array(5).fill(''));
  var dicty = {};
  for (var i = 0; i < 26; i++) {
    dicty[String.fromCharCode(i + 97)] = 0;
  }

  for (var i = 0; i < key.length; i++) {
    if (key[i] != 'j') {
    dicty[key[i]] = 2;
    }
  }
  dicty['j'] = 1;

  var i = 0, j = 0, k = 0;
  while (k < key.length) {
    if (dicty[key[k]] == 2) {
    dicty[key[k]] -= 1;
    keyT[i][j] = key[k];
    j += 1;
    if (j == 5) {
      i += 1;
      j = 0;
    }
    }
    k += 1;
  }

  for (var k in dicty) {
    if (dicty[k] == 0) {
    keyT[i][j] = k;
    j += 1;
    if (j == 5) {
      i += 1;
      j = 0;
    }
    }
  }

  return keyT;
  }

  function search2(keyT, a, b) {
  // Search for the characters of a digraph in the key square and return their position
  var arr = [0, 0, 0, 0];

  if (a == 'j') {
    a = 'i';
  } else if (b == 'j') {
    b = 'i';
  }

  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
    if (keyT[i][j] == a) {
      arr[0] = i;
      arr[1] = j;
    } else if (keyT[i][j] == b) {
      arr[2] = i;
      arr[3] = j;
    }
    }
  }

  return arr;
  }

  function mod5(a) {
  // Function to find the modulus with 5
  if (a < 0) {
    a += 5;
  }
  return a % 5;
  }
  function Playdecrypt(str, keyT) {
  // Function to decrypt
  var ps = str.length;
  var i = 0;
  while (i < ps) {
  var a = search2(keyT, str[i], str[i + 1]);
  if (a[0] == a[2]) {
  str = str.slice(0, i) + keyT[a[0]][mod5(a[1] - 1)] + keyT[a[0]][mod5(a[3] - 1)] + str.slice(i + 2);
  } else if (a[1] == a[3]) {
  str = str.slice(0, i) + keyT[mod5(a[0] - 1)][a[1]] + keyT[mod5(a[2] - 1)][a[1]] + str.slice(i + 2);
  } else {
  str = str.slice(0, i) + keyT[a[0]][a[3]] + keyT[a[2]][a[1]] + str.slice(i + 2);
  }
  i += 2;
  }
  return str;
  }


export function PlayfairDecrypt(str, key) {
  key = removeSpaces(toLowerCase(key));
  str = removeSpaces(toLowerCase(str));
  var keyT = generateKeyTable2(key);
  return Playdecrypt(str, keyT);
  }


  //DES

  export function DESEncrypt(plaintext, key) {
      class DES {
            constructor(key) {
              this.key = CryptoJS.enc.Hex.parse(key);
            }

encrypt(plaintext) {
	const encrypted = CryptoJS.DES.encrypt(
	plaintext,
	this.key,
	{ mode: CryptoJS.mode.ECB }
	);
	return encrypted.ciphertext.toString();
}
}

const des = new DES(key);
return des.encrypt(plaintext);
  }

  export function DESDecrypt(ciphertext, key) {
    class DES {
      constructor(key) {
        this.key = CryptoJS.enc.Hex.parse(key);
      }


  decrypt(ciphertext) {
    const ciphertextHex = CryptoJS.enc.Hex.parse(ciphertext);

    const decrypted = CryptoJS.DES.decrypt(
    { ciphertext: ciphertextHex },
    this.key,
    { mode: CryptoJS.mode.ECB }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);

  }}
  const des = new DES(key);
  return des.decrypt(ciphertext);
}
  //AES

  export function AESEncrypt(plaintext, key) {
    return CryptoJS.AES.encrypt(plaintext, key).toString();
  }

  export function AESDecrypt(ciphertext, key) {
  var bytes  = CryptoJS.AES.decrypt(ciphertext,key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

//RSA

function modExp(base, exp, mod) {
  if (mod === 1) return 0;
  let result = 1;
  base = base % mod;
  while (exp > 0) {
      if (exp % 2 === 1) {
          result = (result * base) % mod;
      }
      exp = Math.floor(exp / 2);
      base = (base * base) % mod;
  }
  return result;
}

function modInverse(e, phi) {
  let d = 0;
  let x1 = 0;
  let x2 = 1;
  let y1 = 1;
  let temp_phi = phi;
  while (e > 0) {
      let temp1 = Math.floor(temp_phi / e);
      let temp2 = temp_phi - temp1 * e;
      temp_phi = e;
      e = temp2;
      let x = x2 - temp1 * x1;
      let y = d - temp1 * y1;
      x2 = x1;
      x1 = x;
      d = y1;
      y1 = y;
  }
  if (temp_phi === 1) {
      return d + phi;
  }
}


function generatePublicExponent(p, q) {
  const phi = (p - 1) * (q - 1);
  let e = 3;
  while (gcd(e, phi) !== 1) {
      e += 2;
  }
  return e;
}


function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

export function  generateKeys(p, q) {
  const n = p * q;
  const e = generatePublicExponent(p, q);
  const phi = (p - 1) * (q - 1);
  let d = modInverse(e, phi);
  return {
      publicKey: { n, e },
      privateKey: { n, d }
  };
}

function convertMessageToAscii(message, exp, mod) {
  let asciiValues = [];
  for (let i = 0; i < message.length; i++) {
      // Convert each character into its ASCII value using modular exponentiation
      let ascii = modExp(message.charCodeAt(i), exp, mod);
      asciiValues.push(ascii);
  }
  // Concatenate the ASCII values separated by space
  return asciiValues.join(' ');
}

function parseAsciiString(asciiString) {
  return asciiString.split(' ').map(Number);
}

// Function to convert an array of ASCII values into a string of characters
function convertAsciiToString(asciiArray) {
  return asciiArray.map(charCode => String.fromCharCode(charCode)).join('');
}

// Function to decrypt an ASCII string using RSA private key components
function decryptAsciiString(asciiString, ed, n) {
  const asciiArray = parseAsciiString(asciiString);
  const decryptedArray = asciiArray.map(base => modExp(base, ed, n));
  return convertAsciiToString(decryptedArray);
}

export function RSAEncrypt(message, n,ed) {
  const encryptedMessage = convertMessageToAscii(message, ed, n);
return encryptedMessage;
}

export function RSADecrypt(message, n,ed) {
  const decryptedMessage = decryptAsciiString(message, ed, n);
    return decryptedMessage;
}

//Diffie Hellman

function power(a, b, p) 
{
	if (b == 1)
		return a;
	else
		return((Math.pow(a, b)) % p);
}
export async function DHSharedKey(P,G,a,b) {

  let x = power(G, a, P);
  let y = power(G, b, P);

 let ka = power(y, a, P);
let kb = power(x, b, P);
let sharedKey;
if(ka === kb)
{
  sharedKey = ka;
}

return [ka, kb, sharedKey];
}

export async function MD5Hash(message) {
  const MD5hash = CryptoJS.MD5(message);
  return MD5hash.toString(CryptoJS.enc.Base64)
}
export async function SHA1Hash(message) {
  const SHA1hash = CryptoJS.SHA1(message);
  return SHA1hash.toString(CryptoJS.enc.Base64)
}