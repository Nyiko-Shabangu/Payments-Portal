import React from 'react';
import './LogOut.css';

function LogOut() {

    const handleLogout = () => {
        // Clear the token, user role, and username from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userName');
        //redirects user to main page (Login sugbmition form)
        window.location.href ='/';
    };

return(
<>
    {/* LogOut form*/}
    <div className='Maincontainer'>
        <div className="logout-container">
            <div className="logout-box">
                <h2>Log-Out form</h2>
                <h4>Please log out of your account</h4>
                <button class ="logout-btn" onClick={handleLogout}>Logout</button>  
            </div>
        </div>
    </div>
</>
);}

export default LogOut;