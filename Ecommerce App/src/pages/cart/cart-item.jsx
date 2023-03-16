import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const CartItem = (props) => {
  const {
    id,
    productName,
    price,
    productImage,
    gender,
    type,
    color,
    sizes,
    selectedSize,
  } = props.data;

  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  let { selectedID } = props.data;

  // let unique_id = uuidv4();
  // selectedID = unique_id;

  return (
    <div className="cart-item">
      <Link to={`/${id}?${selectedID}`}>
        <img src={productImage} />
      </Link>
      <div className="description">
        <Link to={`/${id}?${selectedID}`}>
          <p>
            <b>{productName}</b>
          </p>
        </Link>
        <p>${price}</p>
        <p className="cart-item__size">
          Size: <span>{selectedSize}</span>
        </p>
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
