import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './Register/register.jsx'
import Login from '../src/Login/login.jsx'
import Home from "../src/Home/home.jsx"

function App() {
  

  return (
    <Router>
       <main className = "App">
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Register/>}/>
          <Route path="/home" element={<Home/>}/>

        </Routes>
      
      
      </main>

    </Router>
   
    
  );
}

export default App
