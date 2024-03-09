import React , {useState} from 'react'
import Login from './Componets/Login'
import Signup from './Componets/Signup'
import Display from './Componets/Display'
import "./App.css"
import Insert from './Componets/Insert'

import {
    BrowserRouter as Router,
    Switch,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import PictureInsert from './Componets/PictureInsert'
function App() {
    return ( 
      <>
        <Router>
        <Routes>
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/PictureInsert" element={<PictureInsert/>} />
          <Route path="/Display" element={<Display/>}/>
          <Route path="/Insert" element={<Insert/>}/>
          <Route path="/" element={<Login/>} />
          
        </Routes>
    </Router>
</>
    );
}

export default App;