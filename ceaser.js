import React, { useState } from 'react'
import './mono.css'
import Header from './Header'
import {CaesarEncrypt,CaesarDecrypt} from './crypto'

const Ceaser = () => {
    const [plaintext, setPlaintext] = useState('');
    const [shift, setShift] = useState('');
    const [cipherText, setCipherText] = useState('');

    const Encrypt =()=>{
        const res = CaesarEncrypt(plaintext,shift)
        setCipherText(res)
    }
    const Decrypt =()=>{
        const res = CaesarDecrypt(plaintext,shift)
        setCipherText(res)
    }
  return (
    <div>
    <Header/>
    <div className='moono'>
<div className="monoalphabetic-container">
  <h1 className="monoalphabetic-title">Ceaser Cipher</h1>
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
    <label className="monoalphabetic-label">Enter Shift:</label>
    <input
      type="text"
      value={shift}
      onChange={(e) => setShift(e.target.value)}
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
export default Ceaser