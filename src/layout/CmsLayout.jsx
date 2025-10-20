import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import DarkModeToggle from "../components/DarkModeToggle";
import { UserContext } from "../contexts/userContext";

import NavbarCMS from "../components/NavbarCMS";
import SidebarCMS from "../components/SidebarCMS";

export default function CmsLayout() {
  const { userRole, loading } = useContext(UserContext); // pastikan ada loading
  const navigate = useNavigate();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    // Jangan redirect jika userRole masih null (belum dapat data user)
    if (userRole && userRole !== "admin") {
      navigate("/auth/login", { replace: true });
    }
  }, [userRole, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <SidebarCMS isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} />
      <div className="flex-1 flex flex-col">
        <NavbarCMS setIsSideBarOpen={setIsSideBarOpen} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <div className="fixed bottom-1 right-1 lg:bottom-10 lg:right-10 z-50">
        <DarkModeToggle />
      </div>
    </div>
  );
}
