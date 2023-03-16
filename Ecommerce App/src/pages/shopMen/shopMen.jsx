import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import header from "../../assets/men_header.jpg";

import "./shopMen.css";

export const ShopMen = () => {
  return (
    <div className="shop">
      <div class="products-container shop-women">
        <img src={header} alt="Women hero header" />
        <div className="sub-header__category">
          <h2>Men's Vegan Shoes</h2>
          <p>
            Meet your new go-to men's dress shoes. Versatile, comfy, and
            effortless - these styles pack a punch. Turn heads in our
            Sustainable + Vegan™ from loafers to lace-ups.
          </p>
        </div>
        <div className="products">
          {PRODUCTS.map((product) =>
            product.gender === "Male" || product.gender === "Unisex" ? (
              <Product key={product.id} data={product} />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};
