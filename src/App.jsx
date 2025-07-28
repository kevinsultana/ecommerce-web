import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layout/MainLayout";
import SellerCentre from "./pages/SellerCentre";
import CmsLayout from "./layout/CmsLayout";
import AuthLayout from "./layout/AuthLayout";
import ProductDetail from "./pages/ProductDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductDetail />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/seller" element={<CmsLayout />}>
          <Route index element={<SellerCentre />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
