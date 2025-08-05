import React, { useContext } from "react";
import { BiCart } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdMenu } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../contexts/userContext";

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart);
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  const totalProduk = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleProfileClick = () => {
    if (userData) {
      navigate("/profile");
    } else {
      navigate("/auth/login");
    }
  };

  const handleCartClick = () => {
    if (userData) {
      navigate("/cart");
    } else {
      navigate("/auth/login");
    }
  };
  console.log(userData);

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center h-16">
        {/* Logo dan Menu Dropdown untuk Mobile */}
        <div className="flex items-center">
          <div className="relative md:hidden">
            <button className="p-2 text-gray-600 focus:outline-none">
              <MdMenu className="h-6 w-6" />
            </button>
            {/* TODO: Implementasi dropdown menu untuk mobile */}
          </div>
          <Link
            to="/"
            className="font-bold text-2xl text-gray-800 ml-4 md:ml-0"
          >
            iBoks
          </Link>
        </div>

        {/* Navigasi Utama untuk Desktop */}
        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-8 text-sm text-gray-700">
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
                to="/accessories"
                className="py-2 hover:text-blue-500 transition-colors duration-200"
              >
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* Ikon Profil dan Keranjang */}
        <div className="flex items-center space-x-4">
          {/* Tombol Keranjang */}
          <button
            onClick={handleCartClick}
            className="relative p-2 text-gray-600 hover:text-blue-500 transition-colors"
          >
            <BiCart className="h-6 w-6" />
            {userData && cartItems.length > 0 && (
              <span className="absolute top-2 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full">
                {totalProduk}
              </span>
            )}
          </button>

          {/* Tombol Profil */}
          <button
            onClick={handleProfileClick}
            className="p-2 text-gray-600 hover:text-blue-500 transition-colors flex items-center"
          >
            {userData?.photoProfile !== "" ? (
              <img
                src={userData?.photoProfile || "/img/userPlaceholder.png"}
                alt="profile"
                className="h-7 w-7 rounded-full"
              />
            ) : (
              <CgProfile className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
