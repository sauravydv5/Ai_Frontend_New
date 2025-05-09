import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage/HomeContent";
import BlogPage from "./Pages/BlogPage";
import ContactPage from "./Pages/ContactPage";
import PricingPage from "./Pages/PricingPage";
import ShopPage from "./Pages/ShopPage";
import AboutPage from "./Pages/AboutPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
    </>
  );
};

export default App;
