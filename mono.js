import React, { useState } from 'react'
import './mono.css'
import Header from './Header'
import {MonoEncrypt,MonoDecrypt,generateRandomKey} from './crypto'

const Mono = () => {
    const [plaintext, setPlaintext] = useState('');
    const [shift, setShift] = useState('');
    const [cipherText, setCipherText] = useState('');

    const Encrypt =()=>{
        const res = MonoEncrypt(plaintext,shift)
        setCipherText(res)
        
    }
    const Generate =()=>{
        setShift(generateRandomKey)
        
    }
    const Decrypt =()=>{
        const res = MonoDecrypt(plaintext,shift)
        setCipherText(res)
    }

  return (
    <div>
    <Header/>
    <div className='moono'>
<div className="monoalphabetic-container">
  <h1 className="monoalphabetic-title">MonoAlphabetic Cipher</h1>
  <div className="monoalphabetic-input-container">
    <label className="monoalphabetic-label">Enter Text:</label>
    <input
      type="text"
      value={plaintext}
      onChange={(e) => setPlaintext(e.target.value)}
      className="monoalphabetic-input"
    />
  </div>

  <button className='randomkeybutton' onClick={Generate}>Generate Random Key</button>
  <div className="random-key">
     Random Key:{shift}
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

export default Mono