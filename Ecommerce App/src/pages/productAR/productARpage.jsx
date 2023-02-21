import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { useParams } from "react-router-dom";
import { PRODUCTS } from "../../products";
import "./productARpage.css";

export const ProductPageAR = (props) => {
  const { productId } = useParams();
  const thisProduct = PRODUCTS.find((prod) => prod.id == productId);
  const equalPayments = 4;
  const paymentsAmount = thisProduct.price / equalPayments;

  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemAmount = cartItems[productId];

  return (
    <div className="product-details__AR">
      <h1>{thisProduct.productName}</h1>
      <iframe
        src={thisProduct.frame}
        frameborder="0"
        width="100%"
        height="480"
      ></iframe>
    </div>
  );
};
