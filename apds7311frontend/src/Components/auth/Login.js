import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('Rico');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();  // No argument needed here
    setError('');
    // Add your logic for login submission here
try {


const response = await fetch('http://localhost:5000/api/auth/login',{
method:'POST',
headers:{'Content-Type':'application/json'},
body: JSON.stringify({username,password})
});

const data = await response.json();

  if (data.error){

    setError(data.error)
  }else{
  localStorage.setItem('token',data.token);
  window.location.href ='/ProtectedPage';
}

}
catch (err){
  if (err.response){

  setError(err.response.data.message);

  }else{
    setError('Something went wrong. PLease try again ')
  }

}
  };
  return (
    <>

      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input name ='Oops' autoComplete='true'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}  // Update the username state
        /><br/>
        <label>Account Number:</label>
        <input name ='Oops' autoComplete='true'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}  // Update the username state
        /><br/>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Update the password state
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <br/>
        <button type="submit">Login</button>
      </form>
      <br/>
      
      <div>
            <Link to="/registration">
                <label style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                    Click here to go to Target Page
                </label>
            </Link>
        </div>
    </>
  );
}

export default Login;