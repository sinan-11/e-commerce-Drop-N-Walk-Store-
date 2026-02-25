import React from "react";
import { Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Collections from "./pages/Collections";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


import AdminRoutes from "./admin-side/components/AdminRoutes";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>

        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/placeorder" element={<PlaceOrder />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/collections/:id" element={<ProductDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
              <Footer />
            </>
          }
        />

      
        <Route path="/admin/*" element={<AdminRoutes />} />

      </Routes>

      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
}

export default App;