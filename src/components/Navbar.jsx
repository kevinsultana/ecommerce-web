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
    <div className="navbar lg:px-6 bg-gray-100 shadow-md dark:bg-gray-700 dark:text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <MdMenu className="h-6 w-6" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-100 rounded-box w-52 dark:bg-gray-600"
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
        <Link to="/" className="text-xl">
          Ecommerce
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="flex-row items-center px-4 py-2 gap-6 menu">
          <li className="btn btn-ghost">
            <Link to="/">Home</Link>
          </li>
          <li className="btn btn-ghost">
            <Link to="/about">About</Link>
          </li>
          <li className="btn btn-ghost">
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end space-x-2">
        <button onClick={handleCartClick} className="btn btn-ghost btn-circle">
          <div className="indicator">
            <BiCart className="h-6 w-6" />
            {userData === null
              ? null
              : cartItems.length > 0 && (
                  <span className="badge badge-sm indicator-item bg-red-500 text-white">
                    {totalProduk}
                  </span>
                )}
          </div>
        </button>
        <button
          onClick={handleProfileClick}
          className="btn btn-ghost space-x-2"
        >
          {userData?.photoProfile !== "" ? (
            <img
              src={userData?.photoProfile || "/img/userPlaceholder.png"}
              alt="profile"
              className="h-6 w-6 rounded-full"
            />
          ) : (
            <img
              src="/img/userPlaceholder.png"
              alt="profile"
              className="h-6 w-6"
            />
          )}
          {/* <CgProfile className="h-6 w-6" /> */}
          <span className="hidden md:inline capitalize ">
            {userData?.userName || "Login Here"}
          </span>
        </button>
      </div>
    </div>
  );
}
