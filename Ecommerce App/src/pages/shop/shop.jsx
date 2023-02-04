import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";
import video from "../../assets/video_01.mp4";

export const Shop = () => {
  return (
    <div className="shop">
      <div className="shop-hero">
        <video preload="auto" autoPlay loop muted playsinline>
          <source src={video} type="video/mp4"></source>
        </video>
      </div>
      <div className="sub-header">
        <h2>Popular Right Now</h2>
      </div>
      <div className="products-container">
        <div className="products">
          {PRODUCTS.map((product) => (
            <Product key={product.id} data={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
