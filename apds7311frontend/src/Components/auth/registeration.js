import React, {useState} from 'react';


function Registeration() {
    
  const [name, setName] = useState('Rico');
  const [surname, setSurname] = useState('Stander');
  const [username, setUsername] = useState('RicoStander01');
  const [idNumber, setIdNumber] = useState('627493622');
  const [accountNumber, setAccountNumber] = useState('3456789098765');
  const [password, setPassword] = useState('RicoStander'); 
  const [error, setError] = useState('');



  const handleSubmit1 = async (e) => {
    e.preventDefault();  // No argument needed here
    setError('');
    // Add your logic for login submission here
    try {
      const response = await fetch('http://localhost:5000/api/auth/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, username, idNumber, accountNumber, password })
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
      //  localStorage.setItem('token', data.token);  // Fixed typo
      //  window.location.href = '/ProtectedPage';
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit1}>
        <label>Name:</label>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} 
        /><br/>

        <label>Surname:</label>
        <input 
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)} 
        /><br/>

        <label>Username:</label>
        <input 
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
        /><br/>

        <label>ID Number:</label>
        <input 
          type="text"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)} 
        /><br/>

        <label>Account Number:</label>
        <input 
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)} 
        /><br/>

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        /><br/>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <button type="submit">Register</button>
      </form>
    </>
  );
}

  export default Registeration;