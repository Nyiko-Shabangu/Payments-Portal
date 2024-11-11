import React, {useState, useEffect} from 'react';
import './Login.css';

function Login() {
  //UseState Hooks Declared
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accountnumber, setAccountNumber] = useState('');
  const [error, setError] = useState('');

  //React Hook
  useEffect(() => {
    
    //retrieve token stored on local storage of signed in or not signed in user 
    const token = localStorage.getItem('token'); 
    
    //Keeps the current page or navigates to logout form
    if (token != null) {
      window.location.href ='/logout';
    } 

    //dependancy is empty so it only runs once
  }, []);

  //event handler function thats used in components 
  const handleSubmit = async (e) => {
  
    //keeps form from emptying
    e.preventDefault();
    setError('');
    
    //try to post login information 
    try {
      //path
      const response = await fetch('https://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //values sent to backend for validation  
        body: JSON.stringify({ username, password, accountnumber }),
      });

      //if post was failure
      if (!response.ok) {
        // Parse the response to get the error message
        const data = await response.json();
        throw new Error(data.message || 'Something went wrong'); 
      }

      //await for response
      const data = await response.json();

      //receives if error occurs
      if (data.err) {
        setError(data.message); 
      } else {
        //else if success retrieve and save token, role and username on local storage 
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.userRole);
        localStorage.setItem('userName', data.userName);
        
        //detemining where to navigate user based on their role
        if(data.userRole === 'Admin'){
          window.location.href ='/admin';
        }else if (data.userRole === 'Client'){
          window.location.href ='/transaction';
        }       
      }
    } catch (err) {
      setError(err.message); //catch error and display to user
    }
};
return (

<>
  <br/>
  <div className="login-container">
    <div className="login-box">
      <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
              <input
                type="text"
                maxLength="15"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
          </div>
          <div className="input-group">
            <label>Account Number</label>
              <input
                type="text"
                maxLength="20"
                value={accountnumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              />
          </div>
          <div className="input-group">
            <label>Password</label>
              <input
                type="password"
                maxLength="15"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
          </div>

          {/* Display error message to user */}       
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">Login</button>
        
        </form>
      <br/>      
    </div>  
  </div>
</>
);}

export default Login;