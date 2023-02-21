import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

import { Cart } from "./pages/cart/cart";
import { Shop } from "./pages/shop/shop";
import { ProductPage } from "./pages/product/productpage";
import { ProductPageAR } from "./pages/productAR/productARpage";
import { ShopContextProvider } from "./context/shop-context";

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/:productId" element={<ProductPage />} />
            <Route path="/tryar/:productId" element={<ProductPageAR />} />
          </Routes>
          <Footer />
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
