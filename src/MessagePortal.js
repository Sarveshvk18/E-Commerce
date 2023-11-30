// MessagePortal.js
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const MessagePortal = ({ message, setMessage }) => {
    useEffect(() => {
      if (message) {
        const timer = setTimeout(() => {
          setMessage('');
        }, 3000);
  
        return () => clearTimeout(timer);
      }
    }, [message, setMessage]);
  
    return ReactDOM.createPortal(
      <div className={`global-message ${message ? 'show' : ''}`}>
        <p>{message}</p>
      </div>,
      document.body
    );
  };
  
  export default MessagePortal;
