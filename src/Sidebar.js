// Sidebar.js
import React, { useState, useEffect } from 'react';
import './App.css';

function Sidebar({ onFilterChange, onSortChange, productCategory }) {
  const [sortingOption, setSortingOption] = useState('');
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    // Extract unique categories from the productCategory array
    const categories = [...new Set(productCategory)];
    setUniqueCategories(categories);
  }, [productCategory]);

  const handleSortChange = (option) => {
    setSortingOption(option);
    onSortChange(option);
  };

  const handleCategoryChange = (category) => {
    // Toggle the selected category
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((selectedCategory) => selectedCategory !== category)
      : [...selectedCategories, category];
  
    // Set the selected categories
    setSelectedCategories(updatedCategories);
  
    // Notify the parent component of the filter change with selected categories
    onFilterChange(updatedCategories);
  };
  

  return (
    <div className="Sidebar">
      <div id="margin">
      {/* Sorting options */}
      <div>
        <strong>Sort by:</strong>
        <select value={sortingOption} onChange={(e) => handleSortChange(e.target.value)}>
          <option value="">-- Select --</option>
          <option value="price-high-to-low">Price High to Low</option>
          <option value="price-low-to-high">Price Low to High</option>
          <option value="rating-high-to-low">Rating High to Low</option>
          <option value="alphabet-ascending">Alphabet A-Z</option>
          <option value="alphabet-descending">Alphabet Z-A</option>
        </select>
      </div>

      {/* Category filters */}
      <div>
        <strong id="filter">Filter by Category:</strong>
        {uniqueCategories.map((category) => (
          <div key={category}>
            <input
              type="checkbox"
              id={category}
              name={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Sidebar;
