import React from "react";
import { PRODUCTS } from "../../products";
import { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const Cart = () => {
  const { cartItems, getTotalCartAmount, cartItemsLength } =
    useContext(ShopContext);
  const navigate = useNavigate();

  let cItems = document.querySelectorAll(".cart-item__size");
  let sizesArray = new Array();
  cItems.forEach((item, i) => {
    sizesArray[i] = item.innerHTML;
  });

  let unique_id = uuidv4();
  let small_id = unique_id.slice(0, 4);
  // selectedID = unique_id;

  let idsArray = new Array();
  PRODUCTS.forEach((product, i) => {
    idsArray[i] = product.selectedID;
  });

  return (
    <div className="cart">
      {getTotalCartAmount() > 0 ? (
        <div>
          <h1>Your Cart Items</h1>
        </div>
      ) : null}
      <div className="cart-items">
        {PRODUCTS.map((product) => {
          if (
            cartItems[product.id] !== 0 &&
            cartItems[product.selectedID] !== null
          ) {
            return (
              <CartItem data={product} id={(product.selectedID = small_id)} />
            );
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
