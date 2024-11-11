import React, { useState, useEffect } from 'react';

function Admin() {

  // Retrieve token from local storage
  const token = localStorage.getItem('token');

  useEffect(() => {
      
    // Get user role from local storage
    const userTypeFromStorage = localStorage.getItem('role'); 
    
    //if token is not null and is ADMIN 
    if (token != null && userTypeFromStorage === 'Admin') {
        
         //verify token 
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
            })
            .catch((error) => {
              console.error('Error verifying token:', error);
              window.location.href = '/fail'; // Redirect to the fail page
            });
  
      } else {
        
        window.location.href ='/fail';
      
      }
    });

    const [data, setData] = useState([]);
    const [error, setError] = useState('');


    //react hook
    useEffect(() => {
        
      //trye and fetcah all transations data
      const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:5000/api/auth/allTransactions');
                
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();
                
                setData(result);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (data.length === 0) {
        return <div>Loading...</div>;
    }

return (
<>
<br/><br/>
  <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <th>Username</th>
        <th>Provider</th>
        <th>Account Number</th>
        <th>Currency</th>
        <th>Amount</th>
        <th>Swift Code</th>
      </tr>
    </thead>
    
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          <td>{item.userUsername}</td>
          <td>{item.provider}</td>
          <td>{item.accountnumber}</td>
          <td>{item.currency}</td>
          <td>{item.amount}</td>
          <td>{item.swiftcode}</td>
    
          <td>
            <button>Approve Payment</button>
            <button>View Customer Information</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</>
);}

export default Admin;
