import React from "react";
import { PRODUCTS } from "../../products";
import { ProductVR } from "./productVR";
import "./shopVR.css";

export const ShopVR = () => {
  return (
    <div className="shopVR" id="shopVR">
      <div class="sub-header">
        <h2>View in 3D</h2>
        <div className="products-page__VR">
          {PRODUCTS.map((product) =>
            product.frame ? <ProductVR key={product.id} data={product} /> : null
          )}
        </div>
      </div>
    </div>
  );
};
