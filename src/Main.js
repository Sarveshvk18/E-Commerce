import React from 'react';
import Card from './Card';
import './App.css';

function Main({ products, addToCart, cart }) {
  return (
    <div className="Main">
      <div className='margin'>
        {products.length === 0 ? (
          <p>No Products Available</p>
        ) : (
          products.map((product) => (
            <Card
              key={product.id}
              product={product}
              addToCart={addToCart}
              cart={cart}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Main;
