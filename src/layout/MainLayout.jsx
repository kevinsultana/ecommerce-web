import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import DarkModeToggle from "../components/DarkModeToggle";
import { UserContext } from "../contexts/userContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function MainLayout() {
  const { user, setUser, userRole, setUserRole, loading, setLoading } =
    useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth/login", { replace: true });
    }
  }, []);

  if (loading)
    return (
      <div className="bg-slate-900 dark:bg-white text-black dark:text-white w-full h-screen flex items-center justify-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );

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
