import React, { useState } from 'react'
import './mono.css'
import Header from './Header'
import {RSAEncrypt,RSADecrypt,generateKeys} from './crypto'

const Rsa = () => {
    const [plaintext, setPlaintext] = useState('');
    const [prime1, setPrime1] = useState('');
    const [prime2, setPrime2] = useState('');
    const [shift, setShift] = useState('');
    const [keys,setKeys]=useState('');
    const [enterkey1,setEnterkey1]=useState('');
    const [enterkey2,setEnterkey2]=useState('');

    const [cipherText, setCipherText] = useState('');

    const Encrypt =()=>{
        const res = RSAEncrypt(plaintext,enterkey1,enterkey2)
        setCipherText(res)
    }
    const Generate=()=>{
        const { publicKey, privateKey } = generateKeys(prime1, prime2);
        const publicKeyString = `Public Key: {${JSON.stringify(publicKey.n)}, ${JSON.stringify(publicKey.e)}}`;
        const privateKeyString = `Private Key: {${JSON.stringify(privateKey.n)}, ${JSON.stringify(privateKey.d)}}`;
        const combinedKeys =` ${publicKeyString}\n${privateKeyString}`;
            setKeys(combinedKeys)
    }
    const Decrypt =()=>{
        const res = RSADecrypt(plaintext,enterkey1,enterkey2)
        setCipherText(res)
    }
  return (
    <div>
    <Header/>
    <div className='moono'>
<div className="monoalphabetic-container">
  <h1 className="monoalphabetic-title">RSA</h1>
  

  <div className="monoalphabetic-input-container">
    <label className="monoalphabetic-label">Enter Two Prime Numbers</label>
    <div className='rsa-input'>
    <input
      type="text"
      value={prime1}
      onChange={(e) => setPrime1(e.target.value)}
      className="rsa-input-primes"
    />
    <input
      type="text"
      value={prime2}
      onChange={(e) => setPrime2(e.target.value)}
      className="rsa-input-primes"
    />
    </div>
  </div>

  <button className='primeskeybutton' onClick={Generate}>Generate Key</button>
  <div className="primes-key">
    {keys}
  </div>

  <div className="monoalphabetic-input-container">
    <label className="monoalphabetic-label">Enter Text:</label>
    <input
      type="text"
      value={plaintext}
      onChange={(e) => setPlaintext(e.target.value)}
      className="monoalphabetic-input"
    />
  </div>
  


  <div className="monoalphabetic-input-container">
    <label className="monoalphabetic-label">Input Primes</label>
    <div className='rsa-input'>
    <input
      type="text"
      value={enterkey1}
      onChange={(e) => setEnterkey1(e.target.value)}
      className="rsa-input-primes"
    />
    <input
      type="text"
      value={enterkey2}
      onChange={(e) => setEnterkey2(e.target.value)}
      className="rsa-input-primes"
    />
    </div>
  </div>

  <div className='monoalphabetic-buttons'>
    
  <button
   onClick={Encrypt}
   className="monoalphabetic-button">
    Encrypt
  </button>

  <button 
  onClick={Decrypt}
   className="monoalphabeticdecrypt-button">
    Decrypt
  </button>
  </div>
  <div className="monoalphabetic-result">
     Output:{cipherText}
  </div>
</div>
    </div>
</div>
  )
}

export default Rsa