import React, { useState } from 'react'
import './mono.css'
import Header from './Header'
import {PlayfairEncrypt,PlayfairDecrypt} from './crypto'

const Play = () => {
    const [plaintext, setPlaintext] = useState('');
    const [key, setKey] = useState('');
    const [cipherText, setCipherText] = useState('');

    const Encrypt =()=>{
        const res = PlayfairEncrypt(plaintext,key)
        setCipherText(res)
    }
    const Decrypt =()=>{
        const res = PlayfairDecrypt(plaintext,key)
        setCipherText(res)
    }
  return (
    <div>
    <Header/>
    <div className='moono'>
<div className="monoalphabetic-container">
  <h1 className="monoalphabetic-title">PlayFair Cipher</h1>
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
    <label className="monoalphabetic-label">Enter Key:</label>
    <input
      type="text"
      value={key}
      onChange={(e) => setKey(e.target.value)}
      className="monoalphabetic-input"
    />
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

export default Play