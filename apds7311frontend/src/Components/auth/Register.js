/*import React, {useState} from 'react';
import './Register.css';

function Register() {
    
  const [name, setName] = useState('Rico');
  const [surname, setSurname] = useState('Stander');
  const [username, setUsername] = useState('RicoStander01');
  const [idNumber, setIdNumber] = useState('627493622');
  const [accountNumber, setAccountNumber] = useState('3456789098765');
  const [password, setPassword] = useState('RicoStander'); 
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();  
    setError('');

    try {
      const response = await fetch('https://localhost:5000/api/auth/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, username, idNumber, accountNumber, password })
      });

  
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      }
     } catch (err) {
      setError('Please ensure that all fields contain correct data');
    }
  };
  return (
<>

<div className="registeration-container">
      <div className="registeration-box">
      
      <h2>Registeration</h2>
      
        <form onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label>Name:</label>
            <input 
              type="text"
              maxLength="10"
              value={name}
              onChange={(e) => setName(e.target.value)} 
            />
          </div>

          <div className="input-group">
            <label>Surname:</label>
            <input 
              type="text"
              maxLength="10"
              value={surname}
              onChange={(e) => setSurname(e.target.value)} 
            />
          </div>  

          <div className="input-group">
            <label>Username:</label>
            <input 
              type="text"
              maxLength="10"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          
          <div className="input-group">
            <label>ID Number:</label>
            <input 
              type="text"
              maxLength="13"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)} 
            />
          </div>


          <div className="input-group">
            <label>Account Number:</label>
            <input 
              type="text"
              maxLength="20"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)} 
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              maxLength="15"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <br/>
          <button className="registeration-btn" type="submit">Register</button>
      
      </form>
    </div>
  </div>
</>
  );
}

  export default Register;*/