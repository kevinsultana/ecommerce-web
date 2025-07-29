import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import DarkModeToggle from "../components/DarkModeToggle";
import { UserContext } from "../contexts/userContext";

export default function MainLayout() {
  const { user, loading } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/auth/login", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading)
    return (
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white w-full h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>{" "}
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-800 dark:text-white transition-all duration-300">
      <Navbar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50">
        <DarkModeToggle />
      </div>
    </div>
  );
}
