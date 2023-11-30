// Head.js
import React, { useState } from 'react';
import logo from './logoimg.svg';
import text from './text.svg';
// import { BiSearchAlt2 } from "react-icons/bi";
import './App.css';

function Head({ onFilterChange }) {
  const [filterTitle, setFilterTitle] = useState('');

  const handleFilterChange = () => {
    onFilterChange(filterTitle);
  };
  return (
    <div className="Head">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="text">
        <img src={text} alt="text" />
      </div>
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          className="search-box"
          size={50}
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
        />
        <button
          type="button"
          className="search-button"
          onClick={handleFilterChange}>Search</button>
      </div>
    </div>
  );
}

export default Head;
