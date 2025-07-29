import React from "react";
import { Link, Outlet } from "react-router";
import DarkModeToggle from "../components/DarkModeToggle";

export default function CmsLayout() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-800 dark:text-white transition-all duration-300">
      <nav className="navbar bg-base-200 shadow-md dark:bg-gray-700 dark:text-white">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Seller Dashboard</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/seller/new-product">Add Product</Link>
            </li>
            <li>
              <Link to="/seller">My Products</Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50">
        <DarkModeToggle />
      </div>
    </div>
  );
}
