import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { useParams } from "react-router-dom";
import { PRODUCTS } from "../../products";
import "./productpage.css";
import "./script.js";

export const ProductPage = (props) => {
  let [changeColor] = React.useState([]);
  const { productId } = useParams();
  const thisProduct = PRODUCTS.find((prod) => prod.id == productId);
  const equalPayments = 4;
  const paymentsAmount = thisProduct.price / equalPayments;

  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemAmount = cartItems[productId];

  useEffect((e) => {
    setTimeout(() => {
      changeColor(e);
    }, 1);
  });

  changeColor = (e) => {
    let sizes = document.querySelectorAll(".single-size-wrapper");

    // if (!e.classList.contains("size-clicked")) {
    //   e.classList.add("size-clicked");
    // } else if (e.classList.contains("size-clicked")) {
    //   e.classList.remove("size-clicked");
    // }

    // sizes.forEach((size) => {
    //   size.classList.remove("size-clicked");
    // });

    for (let i = 0; i < sizes.length; i++) {
      // sizes[i].classList.remove("size-clicked");
      // console.log(sizes);
      sizes.forEach((size) => {
        if (!e.classList.contains("size-clicked")) {
          size.classList.remove("size-clicked");
        }
      });
      // e.classList.add("size-clicked");
      if (!sizes[i].classList.contains("size-clicked")) {
        e.classList.add("size-clicked");
      }
    }

    // sizes.forEach((size) => {
    //   if (size.classList.contains("size-clicked")) {
    //     size.classList.remove("size-clicked");
    //   } else {
    //     e.classList.add("size-clicked");
    //   }
    // });
  };

  return (
    <div className="product-details">
      <div className="p-image">
        <img src={thisProduct.productImage} />
      </div>
      <div className="p-details">
        <p>{thisProduct.gender}</p>
        <h1>{thisProduct.productName}</h1>
        <span>{thisProduct.price}</span>
        <span>
          or {equalPayments} equal payments of {`$${paymentsAmount.toFixed(2)}`}
          with Klarna. <a href="#">Learn More</a>
        </span>

        <div className="product-size-options">
          <div className="product-size-header">
            <span>Sizes</span>
            <a href="#">Find your size</a>
          </div>
          <ul className="size-wrapper">
            {thisProduct["sizes"].map((item) => (
              <div
                key={item}
                className="single-size-wrapper"
                onClick={(e) => {
                  changeColor(e.target);
                }}
              >
                <li>{item}</li>
              </div>
            ))}
          </ul>
        </div>
        <button
          className="addToCartBtn"
          onClick={() => {
            addToCart(productId);
          }}
        >
          Add To Cart {cartItemAmount > 0 && <>({cartItemAmount})</>}
        </button>
      </div>
    </div>
  );
};
