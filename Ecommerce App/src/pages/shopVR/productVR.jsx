import React from "react";
import { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { Link } from "react-router-dom";
import { ProductPage } from "../product/productpage";
import { Helmet } from "react-helmet";

export const ProductVR = (props) => {
  const { id, productName, price, productImage, gender, type, color, frame } =
    props.data;
  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemAmount = cartItems[id];

  return (
    <div className="product-single__VR" key={id}>
      <Helmet>
        <script
          src="https://kit.fontawesome.com/e00cc96603.js"
          crossorigin="anonymous"
          async="true"
        ></script>
      </Helmet>

      <div className="product-shop__image__VR">
        <iframe src={frame} frameborder="0" width="100%" height="480"></iframe>
      </div>
      <div className="description shop VRdescription">
        <p>
          <b> {productName} </b>
        </p>
        {/* <p>${price}</p> */}
      </div>
      <div>
        <Link to={`/try3d/${id}`}>
          <button className="product-shop__VR-text">Product Details</button>
        </Link>
      </div>

      {/* <button
        className="addToCartBtn addToCartBtn_ShopMobile"
        onClick={() => addToCart(id)}
      >
        Add To Cart {cartItemAmount > 0 && <>({cartItemAmount})</>}
      </button> */}
    </div>
  );
};
