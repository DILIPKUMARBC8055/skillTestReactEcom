import React from "react";
import { useSelector } from "react-redux";
import { cartSelector } from "../features/Cart/cartReducer";
import "./Cart.css";

const Cart = () => {
  const cartItems = useSelector(cartSelector).items;
  

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
