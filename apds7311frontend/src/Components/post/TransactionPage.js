import React, {useState} from 'react';


function TransactionPage() {

  const [amount, setAmount] = useState('Rico');
  const [currency, setCurrency] = useState('');
  const [provider, setProvider] = useState('');
  const [accountnumber, setAccountNumber] = useState('');
  const [swiftcode, setSwiftCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();  // No argument needed here
    setError('');
    // Add your logic for login submission here
    
try {


const response = await fetch('http://localhost:5000/api/auth/transaction',{
method:'POST',
headers:{'Content-Type':'application/json'},
body: JSON.stringify({amount,currency,provider,accountnumber,swiftcode})
});

const data =await response.json();

if (data.error){

  setError(data.error)
}else{
localStorage.setItem('token',data.token);
//window.location.href ='/ProtectedPage';
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
      <label>AccountNumber:</label>
        <input name ='Oops' autoComplete='true'
          type="text"
          value={accountnumber}
          onChange={(e) => setAccountNumber(e.target.value)}  // Update the username state
        /> <br/>
         <label>provider:</label>
        <input name ='Oops' autoComplete='true'
          type="text"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}  // Update the username state
        /> <br/>
        <label>Choose currency:</label>
        <input name ='Oops' autoComplete='true'
          type="text"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}  // Update the username state
        /> <br/>
        <label>Amount:</label>
        <input
          type="password"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}  // Update the password state
        /><br/>
        <label>SwiftCode:</label>
        <input name ='Oops' autoComplete='true'
          type="text"
          value={swiftcode}
          onChange={(e) => setSwiftCode(e.target.value)}  // Update the username state
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <br/>
        <button type="submit">Process</button>
      </form>
    </>
       
    );
  }

  export default TransactionPage;