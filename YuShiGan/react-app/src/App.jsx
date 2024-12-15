import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import reactLogo from './assets/react.svg'

import './App.css'
import Register from './Register/register.jsx'
import Login from '../src/Login/login.jsx'
import Home from "../src/Home/home.jsx"
import Payment from "../src/Payment/payment.jsx"
import Confirmation from "../src/Confirmation/confirmation.jsx"
import Dashboard from "../src/admin/dashBoard.jsx"

import AdminRoute from "../src/admin/adminRoute.jsx"
import UserRoute from "./user/userRoute.jsx"

import { Provider } from 'react-redux';
import store from "./store.js";


function App() {
  

  return (
    <Provider store={store}>
        <Router>
        <main className = "App">
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Register/>}/>
            <Route path="/home" element={<Home/>}/>

            
            

            {/* <Route path="/home"element={
              <UserRoute>
                <Home/>
              </UserRoute>

            }/> */}

            <Route path="/payment"element={
              <UserRoute>
                <Payment/>
              </UserRoute>
            }/>
            <Route path="/confirmation"element={
              <UserRoute>
                <Confirmation/>
              </UserRoute>
            }/>


            
            <Route path="/admin/dashboard" element={
              <AdminRoute>
                <Dashboard/>
              </AdminRoute>
            }/>

          </Routes>
        </main>
      </Router>

    </Provider>
    
   
   
    
  );
}

export default App
