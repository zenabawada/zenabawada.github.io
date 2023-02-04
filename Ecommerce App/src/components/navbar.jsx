import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { ShopContext } from "../context/shop-context";
import { PRODUCTS } from "../products";

import "./navbar.css";

export const Navbar = (props) => {
  // const { id, productName, price, productImage, gender, type, color, sizes } =
  //   props.data;
  const { cartItems, updateCartItemCount, sumCartItems } =
    useContext(ShopContext);

  // let cartItemsInput = document.querySelector(".cart-items");
  // console.log(cartItemsInput.value);
  // if (cartItemsInput.value > 0) {
  //   cartItemsInput.style.display = "block";
  // } else {
  //   cartItemsInput.style.display = "none";
  // }

  return (
    <div className="navbar">
      <div className="shop-logo">
        <Link to="/">
          <h1>VeSHO</h1>
        </Link>
      </div>
      <div className="links">
        <Link className="nav-menu" to="/">
          Shop
        </Link>
        <Link to="/cart">
          <ShoppingCart size="32" />
          <div>
            {sumCartItems(cartItems) > 0 ? (
              <input
                className="cart-items"
                value={sumCartItems(cartItems)}
                type="button"
                // data={product}
              ></input>
            ) : (
              <div style={{ display: "none" }}></div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};
