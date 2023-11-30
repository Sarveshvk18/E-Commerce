import React from 'react';
import './App.css';
import { FiShoppingCart } from "react-icons/fi";
import logo from './androidgo.svg';
import { Link } from 'react-router-dom';

function Navbar({cart, onLogout }) {

  const handleLogout = () => {
    onLogout();
  };
  const totalQuantity = cart.reduce((total, item) => total + item.currentQuantity, 0);
  const name = JSON.parse(localStorage.getItem('name'));
  return (
    <div className="Navbar">
       <div class="titlelogo">
           <img src={logo} alt="Logo"/>
       </div>
       <div className="cart">
       <Link to="/home">
         <button id="home">Home</button></Link>
         <Link to="/Cart">
         <button>Cart</button></Link>
         <Link to="/login">
         <button onClick={handleLogout}>Logout</button></Link>
           Hi, {name}
           
          
        
           <Link to="/Cart" className="cartLink">
  <FiShoppingCart />
  <span className="totalQuantity">{totalQuantity}</span>
</Link>

       
      {/* <img src={lm} alt="lm"/>  */}
   
        
       </div>
    </div>
  );
}

export default Navbar;
