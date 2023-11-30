import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import MessagePortal from './MessagePortal';
import Login from './login';
import Head from './Head';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Main from './Main';
import Cart from './Cart';
import Foot from './Foot';
import './App.css';

function ProductsRoute({ cart: routeCart, setCart: setRouteCart, setMessage }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterTitle, setFilterTitle] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5007/products/')
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // Filter by title when filterTitle changes
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(filterTitle.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [filterTitle, products]);

  const addToCart = (product) => {
    const existingProductIndex = routeCart.findIndex((item) => item.product.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...routeCart];
      updatedCart[existingProductIndex].currentQuantity += 1;
      setRouteCart(updatedCart);
    } else {
      const updatedCart = [...routeCart, { product, currentQuantity: 1 }];
      setRouteCart(updatedCart);
    }
    setMessage(`${product.title} Added to the Cart!`);
  };

 
  const productCategory = products.map((product) => product.category);

  const handleSortChange = (option) => {
    let sortedProducts;
  
    switch (option) {
      case 'price-low-to-high':
        sortedProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
        break;
      case 'price-high-to-low':
        sortedProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
        break;
      case 'rating-high-to-low':
        sortedProducts = [...filteredProducts].sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'alphabet-ascending':
        sortedProducts = [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'alphabet-descending':
        sortedProducts = [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // No sorting, keep the original order
        sortedProducts = [...filteredProducts];
    }
  
    setFilteredProducts(sortedProducts);
  
    // Dummy log for demonstration
    console.log(`Sorting option changed to: ${option}`);
  };
  
  const handleFilterChange = (selectedCategories) => {
    // Filter products based on selected categories
    const filtered = products.filter((product) =>
      selectedCategories.length === 0 || selectedCategories.includes(product.category)
    );
    setFilteredProducts(filtered);
  };

  

  return (
    <div id="home">
      <Head
        onFilterChange={setFilterTitle}
      />
      <div id="mainad">
        <Sidebar onFilterChange={handleFilterChange} onSortChange={handleSortChange} productCategory={productCategory}/>
        <Main products={filteredProducts} addToCart={addToCart} cart={routeCart} />
      </div>
    </div>
  );
}

function CartRoute({ cart, setCart }) {
  return (
    <div id="home">
      <Cart
        cart={cart}
        setCart={setCart}
      />
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  //Local storage for cart
  useEffect(() => {
    console.log(cart)
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  useEffect(() => {
    
    const cart = JSON.parse(localStorage.getItem('cart'));
    console.log("cart");
    console.log(cart);
    if (cart) {
      setCart(cart);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const displayMessage = (text) => {
    setMessage(text);
  };
  const handleLogout = () => {
    // Perform logout logic here, such as clearing user authentication state.
    // For example, if you are using a token-based authentication, you might clear the token.
    
    // Update the login status to false
    setLoggedIn(false);

    // Clear the cart and other user-related data if needed
    setCart([]);
  };
  return (
    <BrowserRouter>
    <div className="App">
      {isLoggedIn ? (
        <>
          <Navbar cart={cart} onLogout={handleLogout}/>
          <MessagePortal message={message} setMessage={setMessage} />
          <Routes>
            <Route
              path="/home"
              element={<ProductsRoute cart={cart} setCart={setCart} setMessage={displayMessage} />}
            />
            <Route
              path="/cart"
              element={<CartRoute cart={cart} setCart={setCart} />}
            />
          </Routes>
          <Foot />
        </>
      ) : (
        <Login onLogin={() => setLoggedIn(true)} />
      )}
    </div>
  </BrowserRouter>
  );
}

export default App;
