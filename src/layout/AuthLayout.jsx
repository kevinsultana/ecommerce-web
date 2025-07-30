import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import DarkModeToggle from "../components/DarkModeToggle";
import { UserContext } from "../contexts/userContext";

export default function AuthLayout() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-800 dark:text-white transition-all duration-300 flex flex-col justify-center items-center p-4">
      <Outlet />
      <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50">
        <DarkModeToggle />
      </div>
    </div>
  );
}
