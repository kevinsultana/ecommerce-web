import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MainLayout from "./layout/MainLayout";
import SellerCentre from "./pages/cms/SellerCentre";
import CmsLayout from "./layout/CmsLayout";
import AuthLayout from "./layout/AuthLayout";
import ProductDetail from "./pages/home/ProductDetail";
import AddNewProduct from "./pages/cms/AddNewProduct";
import EditProduct from "./pages/cms/EditProduct";
import Cart from "./pages/home/Cart";
import UserProfile from "./pages/home/UserProfile";
import { UserProvider } from "./contexts/userContext";
import About from "./pages/home/About";
import ContactUs from "./pages/home/ContactUs";
import Checkout from "./pages/home/Checkout";
import UserPurchase from "./pages/home/UserPurchase";

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="purchase" element={<UserPurchase />} />
          </Route>

          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/seller" element={<CmsLayout />}>
            <Route index element={<SellerCentre />} />
            <Route path="new-product" element={<AddNewProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
