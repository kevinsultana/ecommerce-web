import React, { useContext, useState } from "react";
import { BiCart } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdMenu } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../contexts/userContext";

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart);
  const { userData } = useContext(UserContext);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const totalProduk = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleProfileClick = () => {
    setIsMobileMenuOpen(false);
    if (userData) {
      navigate("/profile");
    } else {
      navigate("/auth/login");
    }
  };

  const handleCartClick = () => {
    setIsMobileMenuOpen(false);
    if (userData) {
      navigate("/cart");
    } else {
      navigate("/auth/login");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50 dark:bg-gray-800 dark:shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center h-16">
        {/* Logo dan Menu Dropdown untuk Mobile */}
        <div className="flex items-center">
          <div className="relative md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 focus:outline-none dark:text-gray-300"
            >
              <MdMenu className="h-6 w-6" />
            </button>
            {/* TODO: Implementasi dropdown menu untuk mobile */}
          </div>
          <Link
            to="/"
            className="font-bold text-2xl text-gray-800 ml-4 md:ml-0 dark:text-white"
          >
            iBoks
          </Link>
        </div>

        {/* Navigasi Utama untuk Desktop */}
        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-8 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <Link
                to="/"
                className="py-2 hover:text-blue-500 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/mac"
                className="py-2 hover:text-blue-500 transition-colors duration-200"
              >
                Mac
              </Link>
            </li>
            <li>
              <Link
                to="/iphone"
                className="py-2 hover:text-blue-500 transition-colors duration-200"
              >
                iPhone
              </Link>
            </li>
            <li>
              <Link
                to="/ipad"
                className="py-2 hover:text-blue-500 transition-colors duration-200"
              >
                iPad
              </Link>
            </li>
            <li>
              <Link
                to="/iwatch"
                className="py-2 hover:text-blue-500 transition-colors duration-200"
              >
                iWatch
              </Link>
            </li>
            <li>
              <Link
                to="/airpods"
                className="py-2 hover:text-blue-500 transition-colors duration-200"
              >
                AirPods
              </Link>
            </li>
            <li>
              <Link
                to="/store"
                className="py-2 hover:text-blue-500 transition-colors duration-200"
              >
                Store
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="py-2 hover:text-blue-500 transition-colors duration-200"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="py-2 hover:text-blue-500 transition-colors duration-200"
              >
                Cantact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Ikon Profil dan Keranjang */}
        <div className="flex items-center space-x-4">
          {/* Tombol Keranjang */}
          <button
            onClick={handleCartClick}
            className="relative p-2 text-gray-600 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400 cursor-pointer"
          >
            <BiCart className="h-6 w-6" />
            {userData && cartItems.length > 0 && (
              <span className="absolute top-2 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                {totalProduk}
              </span>
            )}
          </button>

          {/* Tombol Profil */}
          <button
            onClick={handleProfileClick}
            className="p-2 text-gray-600 hover:text-blue-500 transition-colors flex items-center dark:text-gray-300 dark:hover:text-blue-400 cursor-pointer"
          >
            {userData?.photoProfile !== "" ? (
              <img
                src={userData?.photoProfile || "/img/userPlaceholder.png"}
                alt="profile"
                className="h-7 w-7 rounded-full"
              />
            ) : (
              <img
                src={userData?.photoProfile || "/img/userPlaceholder.png"}
                alt="profile"
                className="h-7 w-7 rounded-full"
              />
            )}
            <span className="ml-2">
              {userData?.userName ? userData.userName : "Login here"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div
        className={`fixed inset-x-0 -top-5 bg-white shadow-lg md:hidden 
          transition-transform duration-300 ease-in-out 
          ${isMobileMenuOpen ? "translate-y-0 top-15" : "-translate-y-full"}
          dark:bg-gray-800 dark:shadow-xl`}
      >
        <ul className="flex flex-col p-4 space-y-4 text-gray-700 dark:text-gray-200">
          <li>
            <Link
              to="/"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/mac"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Mac
            </Link>
          </li>
          <li>
            <Link
              to="/iphone"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              iPhone
            </Link>
          </li>
          <li>
            <Link
              to="/ipad"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              iPad
            </Link>
          </li>
          <li>
            <Link
              to="/iwatch"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              iWatch
            </Link>
          </li>
          <li>
            <Link
              to="/airpods"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              AirPods
            </Link>
          </li>
          <li>
            <Link
              to="/store"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Store
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
