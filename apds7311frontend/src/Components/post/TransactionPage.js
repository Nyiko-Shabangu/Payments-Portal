import React, {useState, useEffect} from 'react';
import './Transaction.css';
import MessageBox from './MessageBox.js';

function TransactionPage() {
  
  //UseState Hooks Declared
  const [amount, setAmount] = useState('');
  const [accountnumber, setAccountNumber] = useState('');
  const [swiftcode, setSwiftCode] = useState('');
  const [error, setError] = useState('');
  const [selectedOptionProvider, setSelectedOptionProvider] = useState('');
  const [selectedOptionCurrency, setSelectedOptionCurrency] = useState('');
  const [unauthorized, setUnauthorized] = useState(false);
  const [successTransaction,setSucessTransaction] = useState(false);

  const handleCloseMessage = () =>{setSucessTransaction(false)};

  //React Hook
  useEffect(() => {

    // Retrieve token from local storage
    const token = localStorage.getItem('token'); 

    // Get user role from local storage
    const userTypeFromStorage = localStorage.getItem('role'); 
    
    //Display default message on submission form
    setSelectedOptionProvider('Please Select Provider')
    setSelectedOptionCurrency('Please Select Currency');

    //if token is succefull retriev and not null 
    if (token != null && userTypeFromStorage === 'Client') {
      
        //validate the token
        fetch('https://localhost:5000/api/auth/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Send token in Authorization header
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json(); // Token is valid
            } else {
              throw new Error('Token is invalid or expired');
            }
          })
          .then((data) => {
            // You can do something with the valid response if necessary
            console.log('Token verified successfully:', data);
            setUnauthorized(true); // Token is valid, allow access
          })
          .catch((error) => {
            console.error('Error verifying token:', error);
            setUnauthorized(false); // Token is invalid, deny access
            window.location.href = '/fail'; // Redirect to the fail page
          });

    } else {
      
      setUnauthorized(false);

      //navigate user to unaothorized page
      window.location.href ='/fail';
    
    }
  }, []);

const handleChangeProvider = (e) => {
  setSelectedOptionProvider(e.target.value);
};

const handleChangeCurrency = (e) => {
  setSelectedOptionCurrency(e.target.value);
};

const handleSubmit = async (e) => {
  
  //prohids the form from resetting
  e.preventDefault();
  
  //retrieve username to includ along post information 
  const userName = localStorage.getItem('userName');
  
  try {
    
    //https post
    const response = await fetch('https://localhost:5000/api/auth/transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' 
      },
      //send user inputs to backend
      body: JSON.stringify({ selectedOptionProvider, selectedOptionCurrency, accountnumber, amount, swiftcode, userName }),
    });

  
    // Check if response is ok
    if (!response.ok) {
      const data = await response.json();
      setError(data.error || 'Failed to process transaction');
      return;
    
    }else{
      //reset all hooks for resubmission of tranaction form
      setSucessTransaction(true)
      setAmount('')
      setSwiftCode('')
      setAccountNumber('')
      setSelectedOptionProvider('')
      setSelectedOptionCurrency('')
      setError('')
    }
  } catch (err) {
    setError('Something went wrong. Please try again.');
  }
};

return (
<>
  {/*Check if user is authorized*/}   
  {unauthorized ? (
    <div className="transaction-container">  
      <div className="transaction-box">
        <h2>Transaction Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Select Provider:</label>
              <select value={selectedOptionProvider} onChange={handleChangeProvider}>
                <option value="">Select a provider</option>
                <option value="Swift">Swift</option>
                <option value="Paypal">Paypal</option>
                <option value="GlobalACH">Global ACH</option>
              </select>
              <p style={{ color: 'green'}}>Selected Option: {selectedOptionProvider}</p>
            </div>

            <div className="input-group">
              <label>Select Currency:</label>
              <select value={selectedOptionCurrency} onChange={handleChangeCurrency}>
                <option value="">Select a currency</option>
                <option value="Zar">Zar</option>
                <option value="USDollar">US Dollar</option>
                <option value="BritishPound">British Pound</option>
              </select>
              <p style={{ color: 'green' }}>Selected Option: {selectedOptionCurrency}</p>
            </div>

            <div className="input-group">
              <label>Account Number:</label>
              <input
                type="text"
                value={accountnumber}
                maxLength={10}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Choose Amount:</label>
              <input
                type="text"
                value={amount}
                maxLength={10}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Code:</label>
              <input
                type="text"
                maxLength={10}
                value={swiftcode}
                onChange={(e) => setSwiftCode(e.target.value)}
              />
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="transaction-btn">Process</button>
          </form>
        </div>
      </div>    
    ) : (
      <div>
        <h2>Unauthorized Access</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    )}  
  
  {successTransaction && (
    <MessageBox
      message="Transaction has successfully been posted!"
      onClose={handleCloseMessage}
      type="success"/>  
  )}
       
</>
);}

export default TransactionPage;