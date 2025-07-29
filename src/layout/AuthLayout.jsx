import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import DarkModeToggle from "../components/DarkModeToggle";
import { UserContext } from "../contexts/userContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function AuthLayout() {
  const { user, setUser, userRole, setUserRole } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        navigate("/", { replace: true });
      } else {
        setUser(null);
      }
    });

    setLoading(false);
    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <div className="bg-primaryLight dark:bg-primaryDark text-black dark:text-white w-full h-screen flex items-center justify-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-800 dark:text-white transition-all duration-300">
      AuthLayout
      <Outlet />
      <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50">
        <DarkModeToggle />
      </div>
    </div>
  );
}
