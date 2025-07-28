import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import DarkModeToggle from "../components/DarkModeToggle";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-800 dark:text-white transition-all duration-300">
      <Navbar />
      MainLayout
      <Outlet />
      <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50">
        <DarkModeToggle />
      </div>
    </div>
  );
}
