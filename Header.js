import React from 'react'
import "./Header.css";
import { NavLink } from 'react-router-dom';

function Header  () {
  return (
  <div>
    <div className='head1'>
      <div className='head'>Encrypt And Decrypt</div>
    </div>
    <div className='head2'>
     <NavLink className="links1" to="/ceaser">Ceaser-Cipher</NavLink>
     <NavLink className="links1" to="/mono">Mono</NavLink>
     <NavLink className="links1" to="/poly">Ploy</NavLink>
     <NavLink className="links1" to="/play">Play-Fair</NavLink>
     <NavLink className="links1" to="/hill">Hill-Cipher</NavLink>
     <NavLink className="links1" to="/des">DES</NavLink>
     <NavLink className="links1" to="/aes">AES</NavLink>
     <NavLink className="links1" to="/rsa">RSA</NavLink>
     
    </div>
    <div className='content'>
    </div>
    
  </div>
  )
}

export default Header