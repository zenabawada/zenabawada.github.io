import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="shop-logo-footer">
        <Link to="/">
          <h1>VeSHO</h1>
        </Link>
      </div>
      <div className="footer-text">
        <h2>© 2023 - All Rights Reserved</h2>
      </div>
    </div>
  );
};
