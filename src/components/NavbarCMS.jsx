import React from "react";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router";

export default function NavbarCMS({ onClick }) {
  return (
    <nav className="navbar bg-gray-200 shadow-md dark:bg-gray-700 dark:text-white">
      <div className="flex-1 flex items-center gap-4">
        <span onClick={onClick} className="btn btn-ghost flex lg:hidden">
          <MdMenu />
        </span>
        <a className="text-xl lg:px-4">Seller Dashboard</a>
      </div>
      {/* <div className="flex-none">
        <ul className="btn btn-ghost px-1">
          <li>
            <Link to="/">Back to Home Page</Link>
          </li>
        </ul>
      </div> */}
    </nav>
  );
}
