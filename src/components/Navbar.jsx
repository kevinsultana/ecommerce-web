import React, { useContext } from "react";
import { BiCart, BiSearch } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdMenu } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../contexts/userContext";

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart);
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(userData);

  const handleProfileClick = () => {
    if (userData) {
      navigate("/profile");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md dark:bg-gray-700 dark:text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <MdMenu className="h-6 w-6" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 dark:bg-gray-600"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/seller">Seller Centre</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Ecommerce
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <div className="flex items-center border border-gray-300 dark:border-gray-500 rounded-full px-4 py-2 w-96">
          <input
            type="text"
            placeholder="Cari produk..."
            className="input input-ghost w-full focus:outline-none dark:bg-gray-700 dark:text-white"
          />
          <BiSearch className="h-5 w-5 text-gray-500 dark:text-gray-300" />
        </div>
      </div>

      <div className="navbar-end">
        <Link to="/cart" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <BiCart className="h-6 w-6" />
            <span className="badge badge-sm indicator-item bg-red-500 text-white">
              {cartItems.length}
            </span>
          </div>
        </Link>
        <button onClick={handleProfileClick} className="btn btn-ghost">
          <CgProfile className="h-6 w-6" />
          <span className="hidden md:inline">
            {userData?.userName || "Login Here"}
          </span>
        </button>
      </div>
    </div>
  );
}
