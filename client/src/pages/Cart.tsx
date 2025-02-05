import "./Cart.css";

import { Product } from "../interfaces/products";
import React from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface CartProps {
  cartItems: Product[];
  removeFromCart: (productId: number, gender: string, size: string) => void;
  updateCartItemQuantity: (
    productId: number,
    gender: string,
    size: string,
    quantity: number
  ) => void;
  clearCart: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Grouping identical products so they won't get a row each
  const groupedCartItems = cartItems.reduce(
    (acc: { [key: string]: { item: Product; quantity: number } }, item) => {
      const key = `${item.productId}-${item.gender[0]}-${item.size[0]}`; // using productId, first gender, and size as key
      if (!acc[key]) {
        acc[key] = { item, quantity: 0 };
      }
      acc[key].quantity += item.quantity || 1;
      return acc;
    },
    {}
  );

  const handleCheckout = () => {
    if (!user) {
      navigate("/register");
    } else if (user && cartItems.length > 0) {
      const cartItems = localStorage.getItem("cartItems");

      if (cartItems === null) {
        return;
      }

      const basket = JSON.parse(cartItems);

      fetch("http://localhost:3000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, basket }),
      })
        .then((response) => response.json())
        .then((data) => {
          clearCart();
          navigate("/");
          toast.success("Order has been purchased!");
        })
        .catch((error) => {
          console.error("Error during checkout:", error);
        });
    }
  };

  const total = Object.values(groupedCartItems).reduce(
    (sum, { item, quantity }) => sum + item.price * quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1 className="cart-heading">Your Shopping Cart</h1>
      {Object.values(groupedCartItems).length > 0 ? (
        Object.values(groupedCartItems).map(({ item, quantity }) => (
          <div
            key={`${item.productId}-${item.gender[0]}-${item.size[0]}`}
            className="cart-item"
          >
            <button
              className="remove-button"
              onClick={() =>
                removeFromCart(item.productId, item.gender[0], item.size[0])
              }
            >
              ×
            </button>
            <img src={item.img} alt={item.name} />
            <div className="cart-item-details">
              <a href={`/products/${item.productId}`}>{item.name}</a>
              <p>Brand: {item.brand}</p>
              <p>Type: {item.type}</p>
              <p>Gender: {item.gender[0]}</p>
              <p>Size: {item.size[0]}</p>
              <div className="quantity-control">
                <p>Quantity:</p>
                <button
                  onClick={() =>
                    updateCartItemQuantity(
                      item.productId,
                      item.gender[0],
                      item.size[0],
                      Math.max(1, quantity - 1)
                    )
                  }
                >
                  -
                </button>
                <span className="quantity-number">{quantity}</span>
                <button
                  onClick={() =>
                    updateCartItemQuantity(
                      item.productId,
                      item.gender[0],
                      item.size[0],
                      quantity + 1
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <span style={{ fontSize: "1.2em", fontWeight: "bold" }}>
                {item.price * quantity} DKK
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="empty-message">Your cart is empty</p>
      )}
      {Object.values(groupedCartItems).length > 0 && (
        <div className="total-container">
          <button id="clearCartBtn" onClick={clearCart}>
            Clear Cart
          </button>
          <div className="total">Total: {total} DKK</div>
        </div>
      )}
      <div id="buttons-cart-container">
        <button id="continueshoppingbtn" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
        <button id="Checkout" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
