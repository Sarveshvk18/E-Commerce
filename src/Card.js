import React, { useState } from 'react';
import { MdOutlineStar } from "react-icons/md";
import './App.css';

function Card({ product, addToCart, cart }) {
  const [showDescription, setShowDescription] = useState(false);
  const isProductAdded = cart.some((item) => item.product.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="Card">
      <div key={product.id}>
        <img id="product" src={product.image} alt="Logo" />
        <h3>{product.title}<button id="leave" onClick={toggleDescription}>
                {showDescription ? `${product.description}` : '...Read More'}
              </button></h3>
        <p>Price: ${product.price} | <MdOutlineStar />{product.rating.rate}({product.rating.count})</p>
        <div className="button-container">
          {isProductAdded ? (
            <p>Added to Cart</p>
          ) : (
            <>
              <button id="button" onClick={handleAddToCart}>Add to Cart</button>
    
            </>
          )}
        </div>
      
      </div>
    </div>
  );
}

export default Card;
