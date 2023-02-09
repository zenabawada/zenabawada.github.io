import React from "react";
import { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { Link } from "react-router-dom";
import { ProductPage } from "../product/productpage";

export const Product = (props) => {
  const { id, productName, price, productImage, gender, type, color } =
    props.data;
  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemAmount = cartItems[id];

  return (
    <div className="product" key={id}>
      <Link to={`/${id}`}>
        <img src={productImage} />
        <div className="description shop">
          <p>
            <b> {productName} </b>
          </p>
          <p>${price}</p>
        </div>
      </Link>
      <button
        className="addToCartBtn addToCartBtn_ShopMobile"
        onClick={() => addToCart(id)}
      >
        Add To Cart {cartItemAmount > 0 && <>({cartItemAmount})</>}
      </button>
    </div>
  );
};
