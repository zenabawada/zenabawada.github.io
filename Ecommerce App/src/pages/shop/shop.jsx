import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";
import video from "../../assets/video_01.mp4";
import $ from "jquery";

export const Shop = () => {
  $(function () {
    var scroll_pos = 0;
    $(window).scroll(function () {
      scroll_pos = $(this).scrollTop();
      if (scroll_pos > 600) {
        $("#shop").css("background-color", "#EEEDEF");
      } else {
        $("#shop").css("background-color", "inherit");
      }
    });
  });

  return (
    <div className="shop" id="shop">
      <div className="main-header">
        <div className="main-header__text">
          <h1>Hey Sneaker Head!</h1>
          <p>
            Get your sneaker fix sorted with our latest drop. Featuring all the
            things you love from sporty silhouettes to chunky bottoms.
          </p>
        </div>
        <div className="main-header__links">
          <a href="/women" className="main-header__button">
            Women's Sneakers
          </a>
          <a href="/men" className="main-header__button">
            Men's Sneakers
          </a>
        </div>
      </div>
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
