import React from 'react';
import './MessageBox.css'; // Import styles

const MessageBox = ({ message, onClose, type }) => {

return (

  <div className="position">
    <div className={`message-box ${type}`}>
      <p>{message}</p>
      <button className="close-btn" onClick={onClose}>Close</button>
    </div>
  </div>  
);}

export default MessageBox;