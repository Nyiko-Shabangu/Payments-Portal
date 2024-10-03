import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './Components/auth/Login'
import Registeration from './Components/auth/registeration';
import Protected from './Components/ProtectedPage';

function App() {
  return (
   <Router>
      <div className ='App'>
          <Routes>
                <Route path = "/" element ={<Login/>}/>
                <Route path = "/TestRegisteration" element ={<Registeration/>}/>
                <Route path = "/ProtectedPage" element ={<Protected/>}/>
          </Routes>
        </div>
    </Router>
     
  );
}

export default App;
