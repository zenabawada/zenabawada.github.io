import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { useParams } from "react-router-dom";
import { PRODUCTS } from "../../products";
import { Link } from "react-router-dom";

import "./productVRpage.css";

export const ProductPageVR = (props) => {
  const { productId } = useParams();
  const thisProduct = PRODUCTS.find((prod) => prod.id == productId);
  const equalPayments = 4;
  const paymentsAmount = thisProduct.price / equalPayments;

  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemAmount = cartItems[productId];

  return (
    <div className="product-details__VR">
      <div className="image">
        <iframe
          src={thisProduct.frame}
          frameborder="0"
          width="100%"
          height="480"
        ></iframe>
      </div>
      <div className="info">
        <h1 className="p-title">{thisProduct.productName}</h1>
        <span className="p-price">${thisProduct.price}</span>
        <p>{thisProduct.description}</p>
        <Link to={`/${thisProduct.id}`}>
          <button className="addToCartBtn addToCartBtn_ProductMobile">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
};
