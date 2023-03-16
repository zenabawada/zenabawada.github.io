import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { useParams } from "react-router-dom";
import { PRODUCTS } from "../../products";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "./productpage.css";
import "./script.js";

export const ProductPage = () => {
  let { changeColor, sizeWarning } = React.useState([]);
  const { productId } = useParams();

  const thisProduct = PRODUCTS.find((prod) => prod.id == productId);
  const equalPayments = 4;
  const paymentsAmount = thisProduct.price / equalPayments;

  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemAmount = cartItems[productId];

  useEffect((e) => {
    setTimeout(() => {
      // Open & Close Modal (Klarna)
      let klarnaBtn = document.querySelector(".klarna__btn");
      let klarnaModalCloseBtn = document.querySelector(
        ".klarna-modal__close-btn"
      );
      let klarnaModal = document.querySelector(".klarna-modal");
      let klarnaBottomCloseBtn = document.querySelector(
        ".klarna-modal__bottom-close-btn"
      );
      let body = document.querySelector("body");

      klarnaBtn.addEventListener("click", () => {
        // Show modal
        klarnaModal.classList.add("modal__visible");

        // Fix body position
        body.classList.add("modal-open");
      });

      // Close Klarna Modal
      klarnaModal.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal__visible")) {
          klarnaModal.classList.remove("modal__visible");

          // Remove body position properties
          body.classList.remove("modal-open");
        }
      });

      // Close Modal Klarna Button
      klarnaModalCloseBtn.addEventListener("click", () => {
        klarnaModal.classList.remove("modal__visible");

        // Remove body position properties
        body.classList.remove("modal-open");
      });

      // Close Modal Klarna Bottom Box Button
      klarnaBottomCloseBtn.addEventListener("click", () => {
        klarnaModal.classList.remove("modal__visible");

        // Remove body position properties
        body.classList.remove("modal-open");
      });

      // Open & Close Modal (Size)
      let findSizeBtn = document.querySelector(".find-size__btn");
      let modalCloseBtn = document.querySelector(".modal__close-btn");
      let modal = document.querySelector(".size-modal");
      let sizesBtn = document.querySelectorAll(".sizes__btn");
      let womensTable = document.querySelector(".womens-sizes__table");
      let mensTable = document.querySelector(".mens-sizes__table");

      findSizeBtn.addEventListener("click", () => {
        // Show modal
        modal.classList.add("modal__visible");

        // Make womens table visible
        womensTable.classList.add("sizes__visible");

        // Add border on womens sizes button
        let womensSizesBtn = document.querySelector(".womens-sizes__btn");
        womensSizesBtn.classList.add("solid__border");

        // Fix body position
        body.classList.add("modal-open");
      });

      // Close Sizes Modal
      modal.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal__visible")) {
          modal.classList.remove("modal__visible");
          womensTable.classList.remove("sizes__visible");
          mensTable.classList.remove("sizes__visible");
          sizesBtn.forEach((size) => {
            size.classList.remove("solid__border");
          });

          // Remove body position properties
          body.classList.remove("modal-open");
        }
      });

      // Close Sizes Modal Button
      modalCloseBtn.addEventListener("click", () => {
        modal.classList.remove("modal__visible");
        womensTable.classList.remove("sizes__visible");
        mensTable.classList.remove("sizes__visible");
        sizesBtn.forEach((size) => {
          size.classList.remove("solid__border");
        });

        // Remove body position properties
        body.classList.remove("modal-open");
      });

      // Modal Inner Sizes Buttons
      for (let i = 0; i < sizesBtn.length; i++) {
        sizesBtn[i].addEventListener("click", () => {
          if (sizesBtn[i].classList.contains("womens-sizes__btn")) {
            sizesBtn[0].classList.add("solid__border");
            sizesBtn[1].classList.remove("solid__border");
            womensTable.classList.add("sizes__visible");
            mensTable.classList.remove("sizes__visible");
          } else if (sizesBtn[i].classList.contains("mens-sizes__btn")) {
            sizesBtn[1].classList.add("solid__border");
            sizesBtn[0].classList.remove("solid__border");
            womensTable.classList.remove("sizes__visible");
            mensTable.classList.add("sizes__visible");
          }
        });
      }

      changeColor(e);
    }, 1);
  });

  // Size not selected Warning
  sizeWarning = () => {
    let addToCartBtn = document.querySelector(".addToCartBtn");
    let warning = document.querySelector(".size__warning");
    let sizeClicked = document.querySelector(".size-clicked");

    if (!sizeClicked) {
      warning.classList.add("visible");
      warning.classList.add("visible___animation");
      addToCartBtn.classList.add("add-top-margin");
    } else {
      addToCart(productId, thisProduct.selectedSize);
    }

    setTimeout(() => {
      warning.classList.remove("visible___animation");
    }, 300);
  };

  // Change Size Button Color
  changeColor = (e) => {
    let sizes = document.querySelectorAll(".single-size-wrapper");
    let addToCartBtn = document.querySelector(".addToCartBtn");
    let warning = document.querySelector(".size__warning");

    for (let i = 0; i < sizes.length; i++) {
      sizes.forEach((size) => {
        if (!e.classList.contains("size-clicked")) {
          size.classList.remove("size-clicked");
        }
      });
      if (!sizes[i].classList.contains("size-clicked")) {
        e.classList.add("size-clicked");
        warning.classList.remove("visible");
        addToCartBtn.classList.remove("add-top-margin");
      }
    }
  };

  // let productSize;

  return (
    <div className="product-details">
      <Helmet>
        <script
          src="https://kit.fontawesome.com/e00cc96603.js"
          crossorigin="anonymous"
          async="true"
        ></script>
      </Helmet>
      <div className="p-image">
        <img src={thisProduct.productImage} />
        {thisProduct.frame ? (
          <Link to={`/try3d/${thisProduct.id}`}>
            <button className="product-shop__VR-btn">3D</button>
          </Link>
        ) : null}
      </div>
      <div className="p-details">
        <p className="p-gender">{thisProduct.gender}</p>
        <h1 className="p-title">{thisProduct.productName}</h1>
        <span className="p-price">${thisProduct.price}</span>
        <span className="p-klarna">
          or {equalPayments} equal payments of
          {`$${paymentsAmount.toFixed(2)} `}
          with <b>Klarna</b>. <a className="klarna__btn">Learn More</a>
        </span>
        <div className="klarna-modal">
          <div className="klarna-modal__wrapper">
            <div className="klarna-modal__close-btn">&times;</div>
            <div className="klarna-modal__title">Klarna</div>
            <div className="klarna__container">
              <h2>
                {equalPayments} equal payments of
                {` $${paymentsAmount.toFixed(2)}`}.
              </h2>
              <p>Buy what you love and split the cost. It’s that easy.</p>
              <ul>
                <li>
                  <div className="item__icon"></div>
                  <div className="item__text">
                    <p>Add item(s) to your cart.</p>
                  </div>
                </li>
                <li>
                  <div className="item__icon"></div>
                  <div className="item__text">
                    <p>Go to checkout and choose Klarna</p>
                  </div>
                </li>
                <li>
                  <div className="item__icon"></div>
                  <div className="item__text">
                    <p>Enter your debit or credit card information.</p>
                  </div>
                </li>
                <li>
                  <div className="item__icon"></div>
                  <div className="item__text">
                    <p>
                      Your first payment is taken when the order is processed
                      and the remaining 3 are automatically taken every two
                      weeks.
                    </p>
                  </div>
                </li>
              </ul>
              <p className="klarna__disclaimer">
                Please note that a higher initial payment may be required for
                some purchases. Pay later in 4 terms available{" "}
                <a
                  href="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/en_ca/paylaterin4"
                  rel="noreferrer"
                  target="_blank"
                >
                  here
                </a>
                . For Quebec residents these Pay later in 4{" "}
                <a
                  href="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/en_ca/paylaterin4_quebec"
                  rel="noreferrer"
                  target="_blank"
                >
                  terms
                </a>{" "}
                are applicable.
              </p>
              <button className="klarna-modal__bottom-close-btn">Close</button>
            </div>
          </div>
        </div>

        <div className="product-size-options">
          <div className="product-size-header">
            <span>Sizes</span>
            <a className="find-size__btn">Find your size</a>
            <div className="size-modal">
              <div className="size-modal__wrapper">
                <div className="modal__close-btn">&times;</div>
                <div className="size-modal__title">Footware</div>
                <div className="size-modal__content">
                  <p>
                    Half sizes are not available in all styles. Sizing may vary
                    between style and type of footwear.
                  </p>
                  <ul>
                    <li className="womens-sizes__btn sizes__btn">
                      Women's sizes
                    </li>
                    <li className="mens-sizes__btn sizes__btn">Men's sizes</li>
                  </ul>
                  <div className="table-wrapper">
                    <table className="womens-sizes__table">
                      <tr>
                        <th>US</th>
                        <th>UK</th>
                        <th>Eur</th>
                        <th>In</th>
                        <th>Cm</th>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>2</td>
                        <td>35</td>
                        <td>8.8</td>
                        <td>22.2</td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>3</td>
                        <td>36</td>
                        <td>9</td>
                        <td>23</td>
                      </tr>
                      <tr>
                        <td>6.5</td>
                        <td>4</td>
                        <td>37</td>
                        <td>9.3</td>
                        <td>23.4</td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>4.5</td>
                        <td>37.5</td>
                        <td>9.4</td>
                        <td>23.8</td>
                      </tr>
                      <tr>
                        <td>7.5</td>
                        <td>5</td>
                        <td>38</td>
                        <td>9.6</td>
                        <td>24.3</td>
                      </tr>
                      <tr>
                        <td>8</td>
                        <td>5.5</td>
                        <td>38.5</td>
                        <td>9.7</td>
                        <td>24.7</td>
                      </tr>
                      <tr>
                        <td>8.5</td>
                        <td>6</td>
                        <td>39</td>
                        <td>9.8</td>
                        <td>25.1</td>
                      </tr>
                      <tr>
                        <td>9</td>
                        <td>7</td>
                        <td>40</td>
                        <td>10.1</td>
                        <td>25.5</td>
                      </tr>
                      <tr>
                        <td>10</td>
                        <td>8</td>
                        <td>41</td>
                        <td>10.3</td>
                        <td>26.4</td>
                      </tr>
                      <tr>
                        <td>10.5</td>
                        <td>9</td>
                        <td>42</td>
                        <td>10.5</td>
                        <td>26.8</td>
                      </tr>
                      <tr>
                        <td>11</td>
                        <td>9.5</td>
                        <td>42.5</td>
                        <td>10.7</td>
                        <td>27.2</td>
                      </tr>
                    </table>
                  </div>
                  <div className="table-wrapper">
                    <table className="mens-sizes__table">
                      <tr>
                        <th>US</th>
                        <th>UK</th>
                        <th>Eur</th>
                        <th>In</th>
                        <th>Cm</th>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>6</td>
                        <td>39</td>
                        <td>10.1</td>
                        <td>25.6</td>
                      </tr>
                      <tr>
                        <td>7.5</td>
                        <td>6.5</td>
                        <td>40</td>
                        <td>10.1</td>
                        <td>25.7</td>
                      </tr>
                      <tr>
                        <td>8</td>
                        <td>7</td>
                        <td>41</td>
                        <td>10.2</td>
                        <td>25.8</td>
                      </tr>
                      <tr>
                        <td>9</td>
                        <td>8</td>
                        <td>42</td>
                        <td>10.3</td>
                        <td>26</td>
                      </tr>
                      <tr>
                        <td>9.5</td>
                        <td>8.5</td>
                        <td>42.5</td>
                        <td>10.4</td>
                        <td>26.4</td>
                      </tr>
                      <tr>
                        <td>10</td>
                        <td>9</td>
                        <td>43</td>
                        <td>10.5</td>
                        <td>26.8</td>
                      </tr>
                      <tr>
                        <td>10.5</td>
                        <td>9.5</td>
                        <td>43.5</td>
                        <td>10.7</td>
                        <td>27.3</td>
                      </tr>
                      <tr>
                        <td>11</td>
                        <td>10</td>
                        <td>44</td>
                        <td>10.9</td>
                        <td>27.7</td>
                      </tr>
                      <tr>
                        <td>12</td>
                        <td>11</td>
                        <td>45</td>
                        <td>11.2</td>
                        <td>28.5</td>
                      </tr>
                      <tr>
                        <td>13</td>
                        <td>12</td>
                        <td>46</td>
                        <td>11.4</td>
                        <td>29</td>
                      </tr>
                      <tr>
                        <td>14</td>
                        <td>13</td>
                        <td>47</td>
                        <td>11.6</td>
                        <td>29.4</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="size-wrapper">
            {thisProduct["sizes"].map((item) => (
              <div
                key={item}
                className="single-size-wrapper"
                onClick={(e) => {
                  changeColor(e.target);
                  thisProduct.selectedSize = e.target.innerText;
                }}
              >
                <li>{item}</li>
              </div>
            ))}
          </ul>
          <span className="size__warning">Please select a size</span>
        </div>
        <button
          className="addToCartBtn addToCartBtn_ProductMobile"
          onClick={() => {
            sizeWarning();
          }}
        >
          Add To Cart {cartItemAmount > 0 && <>({cartItemAmount})</>}
        </button>
      </div>
    </div>
  );
};
