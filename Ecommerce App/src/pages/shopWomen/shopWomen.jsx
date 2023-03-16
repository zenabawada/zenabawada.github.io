import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import header from "../../assets/women_header.jpg";

import "./shopWomen.css";

export const ShopWomen = () => {
  return (
    <div className="shop">
      <div class="products-container shop-women">
        <img src={header} alt="Women hero header" />
        <div className="sub-header__category">
          <h2>Women's Vegan Shoes</h2>
          <p>
            Shop your fave high heels, platforms, mules, heeled sandals, block
            heels and more. Even more sustainable than ever, these heels pack a
            punch in style and versatility - not to mention comfort.
          </p>
        </div>
        <div className="products">
          {PRODUCTS.map((product) =>
            product.gender === "Female" || product.gender === "Unisex" ? (
              <Product key={product.id} data={product} />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};
