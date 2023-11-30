import React from 'react';
import './App.css';
import { FaRegTrashAlt } from "react-icons/fa";
function Cart({ cart, setCart }) {
  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map((item) => ({
      ...item,
      currentQuantity: item.product.id === productId ? newQuantity : item.currentQuantity,
    }));

    setCart(updatedCart);
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    setCart(updatedCart);
  };

  return (
    <div className="Cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Sub Total</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="cart-item">
                  <td>
                    <strong>{item.product.title}</strong>
                  </td>
                  <td>
                  <button onClick={() => item.currentQuantity > 1 && updateQuantity(item.product.id, item.currentQuantity - 1)}>-</button>
                    <span>{item.currentQuantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.currentQuantity + 1)}>+</button>
                  </td>
                  <td>${item.product.price ? item.product.price.toFixed(2) : 'N/A'}</td>
                  <td>${item.product.price && item.currentQuantity
                    ? (item.product.price * item.currentQuantity).toFixed(2)
                    : 'N/A'
                  }</td>
                  <td>
                    <button onClick={() => handleRemoveItem(item.product.id)}><FaRegTrashAlt/></button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="cart-total">
                <td colSpan="3">
                  <strong>Total:</strong>
                </td>
                <td>
                  <strong>${calculateTotal(cart).toFixed(2)}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </>
      )}
    </div>
  );
}

// Function to calculate the total price of the items in the cart
function calculateTotal(cart) {
  return cart.reduce(
    (total, item) => total + (item.product?.price || 0) * item.currentQuantity,
    0
  );
}

export default Cart;
