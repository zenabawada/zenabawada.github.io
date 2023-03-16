import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

import { Cart } from "./pages/cart/cart";
import { Shop } from "./pages/shop/shop";
import { ShopVR } from "./pages/shopVR/shopVR";
import { ProductPage } from "./pages/product/productpage";
import { ProductPageVR } from "./pages/productVR/productVRpage";
import { ShopContextProvider } from "./context/shop-context";
import { ShopWomen } from "./pages/shopWomen/shopWomen";
import { ShopMen } from "./pages/shopMen/shopMen";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/:productId" element={<ProductPage />} />
              <Route path="/try3d/:productId" element={<ProductPageVR />} />
              <Route path="/try3d" element={<ShopVR />} />
              <Route path="/women" element={<ShopWomen />} />
              <Route path="/men" element={<ShopMen />} />
            </Routes>
          </ScrollToTop>
          <Footer />
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
