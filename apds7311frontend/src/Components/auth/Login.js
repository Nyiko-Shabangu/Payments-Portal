import React, { useState } from 'react';

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

const data =await response.json();

if (data.error){

  setError(data.error)
}else{
localStorage.setItem('tokem',data.token);
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
      <h1>Hello</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input name ='Oops' autoComplete='true'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}  // Update the username state
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Update the password state
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;