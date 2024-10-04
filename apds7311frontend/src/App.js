import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './Components/auth/Login'
import Protected from './Components/ProtectedPage';
import NavigationBar from './Components/commonDenominator/navigationBar.js';
import Hello from './Components/commonDenominator/header.js';
import TransactionPage from './Components/post/TransactionPage.js';
import Registeration from './Components/auth/Registeration.js';
import Phello from './Components/Admin.js';

function App() {
  return (
    
   <Router>
    <Hello/>
    <NavigationBar /> 
      <div className ='App'>
          <Routes>
                <Route path = "/login" element ={<Login/>}/>
                <Route path = "/registration" element ={<Registeration/>}/>
                <Route path = "/transactionpage" element ={<TransactionPage/>}/>
                <Route path = "/admin" element ={<Phello/>}/>
          </Routes>
        </div>
    </Router>
     
  );
}

export default App;
