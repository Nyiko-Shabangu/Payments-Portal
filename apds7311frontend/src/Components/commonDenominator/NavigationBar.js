import React, { useState, useEffect } from 'react'; // Make sure to import useEffect and useState
import { Link, useNavigate } from 'react-router-dom';
import './Navigationbar.css'

const Navigationbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // Store the user role
  const token = localStorage.getItem('token');
  const [username,setUsername] = useState('')
 //const navigate = useNavigate();

 useEffect(() => {
  // Check for token and set user information if available
  const token = localStorage.getItem('token');
  if (token) {
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('userName');
    setUsername(username);
    setUserRole(role);
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
    setUserRole(null);
  }
}, [isLoggedIn]);


  // Function to check for specific role
  const hasRole = (role) => {
    return userRole && userRole === role;
  };

  return (
  <>
    <nav className="navbar">
      <div className="container">
        <ul className="nav-links">

        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/" >Login</Link>
            </li>
          </>
        ) : (
          <>
            {hasRole('Admin') && (
            <>
              <li>
                <Link to="/admin" >Transactions Processing</Link>
              </li>
              <li>
                <Link to="/LogOut" >{username} | Log Out</Link>
              </li>
            </>
            )}

            {hasRole('Client') && (
            <>
              <li>
                <Link to="/transaction" >Transaction</Link>
              </li>
              <li>
                <Link to="/LogOut" >{username} | Log Out</Link>
              </li>
            </>
            )}

          </>
        )}

      </ul>
    </div>
  </nav>
</>
);
}

export default Navigationbar;
