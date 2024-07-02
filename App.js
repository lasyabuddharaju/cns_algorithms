import React from 'react'
import Header from './container/Header.js'
import Mono from './container/mono.js'
import Poly from './container/poly.js'
import Ceaser from './container/ceaser.js'
import Play from './container/play.js'
import Hill from './container/hill.js'
import AES from './container/aes.js'
import DES from './container/des.js'
import RSA from './container/rsa.js'



import { HashRouter as Router, Routes, Route } from 'react-router-dom';


function App ()  {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route path='/header' element={<Header/>}/>
          <Route path='/mono' element={<Mono/>}/>
          <Route path='/poly' element={<Poly/>}/>
          <Route path='/ceaser' element={<Ceaser/>}/>
          <Route path='/play' element={<Play/>}/>
          <Route path='/hill' element={<Hill/>}/>
          <Route path='/aes' element={<AES/>}/>
          <Route path='/des' element={<DES/>}/>
          <Route path='/rsa' element={<RSA/>}/>


      </Routes>
      </div>
    </Router>
  )
}

export default App