import "./App.css";

import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Cart from "./pages/Cart";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Product } from "./interfaces/products";
import { ProductDetails } from "./pages/ProductDetails";
import { Register } from "./pages/Register";
import { Toaster } from "react-hot-toast";

const getInitialCart = (): Product[] => {
  const savedCartItems = localStorage.getItem("cartItems");
  return savedCartItems ? JSON.parse(savedCartItems) : [];
};

function App() {
  const [cart, setCart] = useState<Product[]>(getInitialCart);

  useEffect(() => {
    const savedCartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );
    setCart(savedCartItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) =>
          item.productId === product.productId &&
          item.size[0] === product.size[0] &&
          item.gender[0] === product.gender[0]
      );

      if (existingProductIndex >= 0) {
        const updatedCart = prevCart.map((item, index) => {
          if (index === existingProductIndex) {
            return {
              ...item,
              quantity: (item.quantity || 0) + 1,
            };
          }
          return item;
        });
        return updatedCart;
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const clearCart = () => {
    localStorage.clear();
    setCart([]);
  };

  const removeFromCart = (productId: number, gender: string, size: string) => {
    setCart(
      cart.filter(
        (item) =>
          item.productId !== productId ||
          item.gender[0] !== gender ||
          item.size[0] !== size
      )
    );
  };

  const updateCartItemQuantity = (
    productId: number,
    gender: string,
    size: string,
    quantity: number
  ) => {
    setCart((cart) => {
      const newCart = cart
        .map((item) => {
          if (
            item.productId === productId &&
            item.gender[0] === gender &&
            item.size[0] === size
          ) {
            return { ...item, quantity: quantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
      return newCart;
    });
  };

  const cartItemCount = cart.reduce(
    (count, item) => count + (item.quantity || 0),
    0
  );

  return (
    <div className="App">
      <AuthProvider>
        <Toaster />
        <Router>
          <Navbar cartItemCount={cartItemCount} />
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/products/:id"
              element={<ProductDetails addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cart}
                  removeFromCart={removeFromCart}
                  updateCartItemQuantity={updateCartItemQuantity}
                  clearCart={clearCart}
                />
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
