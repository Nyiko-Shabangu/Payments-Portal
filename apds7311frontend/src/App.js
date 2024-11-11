import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/auth/Login.js';
import NavigationBar from './Components/commonDenominator/Navigationbar.js';
import TransactionPage from './Components/post/TransactionPage.js';
//import Registeration from './Components/auth/Register.js';
import AdminPage from './Components/Admin.js';
import LogOut from './Components/LogOut.js';
import './App.css'
import AccessDeneid from './UnathorizedPage.js'

function App() {
  return (
  <>
  <Router> 
      <br/>
      {/* Welcome Message displayed on all pages */}
      <h1 style={{ textAlign: 'center' }}>Welcome to the Payment System</h1>   
      <br/>
      {/* Navigation Bar displayed on all pages */}
      <NavigationBar />
      {/* Routes declared */}

      {/*https://www.w3schools.com/react/react_router.asp*/} 
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/fail" element={<AccessDeneid />} />
      </Routes> 
  </Router>
</>

);}

export default App;
