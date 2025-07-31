import React, { use, useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import DarkModeToggle from "../components/DarkModeToggle";
import { UserContext } from "../contexts/userContext";
import { BiMenu } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { IoAdd } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import NavbarCMS from "../components/NavbarCMS";
import SidebarCMS from "../components/SidebarCMS";

export default function CmsLayout() {
  const { userRole } = useContext(UserContext);
  const navigate = useNavigate();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    if (userRole !== "admin") {
      navigate("/auth/login", { replace: true });
    }
  }, [userRole]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-800 dark:text-white transition-all duration-300">
      <NavbarCMS onClick={() => setIsSideBarOpen(!isSideBarOpen)} />

      <div className="flex flex-1 h-auto">
        {/* Sidebar */}
        <SidebarCMS
          isSideBarOpen={isSideBarOpen}
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          onClickNav={() => setIsSideBarOpen(false)}
        />

        {/* Overlay for mobile */}
        {isSideBarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSideBarOpen(false)}
          ></div>
        )}

        {/* Main Content Area */}
        <main className={`flex-1  lg:p-6 overflow-auto `}>
          <Outlet />
        </main>
      </div>
      <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50">
        <DarkModeToggle />
      </div>
    </div>
  );
}
