import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layout/MainLayout";
import SellerCentre from "./pages/SellerCentre";
import CmsLayout from "./layout/CmsLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seller" element={<CmsLayout />}>
          <Route index element={<SellerCentre />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
