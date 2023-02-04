import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { Link } from "react-router-dom";

export const CartItem = (props) => {
  const { id, productName, price, productImage, gender, type, color, sizes } =
    props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  return (
    <div className="cart-item">
      <Link to={`/${id}`}>
        <img src={productImage} />
      </Link>
      <div className="description">
        <Link to={`/${id}`}>
          <p>
            <b>{productName}</b>
          </p>
        </Link>
        <p>${price}</p>
        <div className="count-handler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );
};
