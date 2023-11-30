import React, { useState } from 'react';
import axios from 'axios';
import logo from './android3.svg';
import text from './text.svg';
import './login.css'
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5007/login/login', {
        username: loginForm.username,
        password: loginForm.password,
      });

      if (response.data.success) {
        // Call the onLogin function passed as a prop
        onLogin();
        console.log('Login success');
        
        localStorage.setItem("name", JSON.stringify(response.data.name));
        navigate("/home");
      } else {
        // Handle unsuccessful login
        console.log('Login failed');
        setErrorMessage('Login failed. Please check your username and password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An unexpected error occurred during login.');
    }
  };

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5007/login/signup', {
        name: signupForm.name,
        username: signupForm.email,
        password: signupForm.newPassword,

      });

      if (response.data.success) {
        // You can handle a successful signup as needed (e.g., redirect to login)
        // onLogin();
        console.log('Signup successful');
        setIsLoginForm(!isLoginForm);
        setErrorMessage('Signin Successfully!');
      } else {
        // Handle unsuccessful signup
        console.log('Signup failed:', response.data.message);
        setErrorMessage('Signup failed. ' + response.data.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('An unexpected error occurred during signup.');
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
    // Update the individual state variables as well
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({
      ...signupForm,
      [name]: value,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    handleSignup();
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    setErrorMessage("");
  };

  return (
    <div id="login">
    <div className="login-container">
      {/* <h1 className="app-title">Andriod</h1> */}
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="text">
        <img src={text} alt="text" />
      </div>
      {isLoginForm ? (
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <fieldset>
            <legend><h4>Login:</h4></legend>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={loginForm.username}
              onChange={handleLoginChange}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginForm.password}
              onChange={handleLoginChange}
              required
            />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button type="submit">Login</button>
          </fieldset>
        </form>
      ) : (
        <form className="signup-form" onSubmit={handleSignupSubmit}>
          <fieldset>
            <legend>Sign Up:</legend>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={signupForm.name}
              onChange={handleSignupChange}
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={signupForm.email}
              onChange={handleSignupChange}
              required
            />
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={signupForm.newPassword}
              onChange={handleSignupChange}
              required
            />
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={signupForm.confirmPassword}
              onChange={handleSignupChange}
              required
            />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button type="submit">Sign Up</button>
          </fieldset>
        </form>
      )}
      <button className="toggle-button" onClick={toggleForm}>
        {isLoginForm ? 'Sign Up' : 'Go back to Login'}
      </button>
    </div>
    </div>
  );
  
}

export default Login;