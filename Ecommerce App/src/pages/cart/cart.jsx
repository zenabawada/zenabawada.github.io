import React from "react";
import { PRODUCTS } from "../../products";
import { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import "./cart.css";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const navigate = useNavigate();
  return (
    <div className="cart">
      {getTotalCartAmount() > 0 ? (
        <div>
          <h1>Your Cart Items</h1>
        </div>
      ) : null}
      <div className="cart-items">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
        })}
      </div>
      {getTotalCartAmount() > 0 ? (
        <div className="checkout">
          <p>Subtotal: ${getTotalCartAmount().toFixed(2)}</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button>Checkout</button>
        </div>
      ) : (
        <h1>Your cart is empty</h1>
      )}
    </div>
  );
};
