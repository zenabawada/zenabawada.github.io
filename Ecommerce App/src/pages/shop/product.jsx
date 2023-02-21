import React from "react";
import { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { Link } from "react-router-dom";
import { ProductPage } from "../product/productpage";
import { Helmet } from "react-helmet";

export const Product = (props) => {
  const { id, productName, price, productImage, gender, type, color, frame } =
    props.data;
  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemAmount = cartItems[id];

  return (
    <div className="product" key={id}>
      <Helmet>
        <script
          src="https://kit.fontawesome.com/e00cc96603.js"
          crossorigin="anonymous"
          async="true"
        ></script>
      </Helmet>
      <Link to={`/${id}`}>
        <div className="product-shop__image">
          <img src={productImage} />
          {frame ? (
            <Link to={`/tryar/${id}`}>
              <button className="product-shop__VR-btn">
                <i class="fa-solid fa-vr-cardboard"></i>
              </button>
            </Link>
          ) : null}
        </div>

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
