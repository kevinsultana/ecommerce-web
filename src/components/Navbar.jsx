import React from "react";
import { BiCart, BiSearch } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdMenu } from "react-icons/md";

export default function Navbar() {
  return (
    <div className="p-4 flex justify-between items-center">
      <div className="flex justify-between items-center gap-4">
        <h1>Navbar</h1>
        <MdMenu />
      </div>
      <div className="flex justify-between items-center px-2 border border-gray-400 rounded-2xl">
        <input type="text" className=" py-1 outline-none" />
        <BiSearch />
      </div>
      <div className="flex justify-between items-center gap-4">
        <BiCart />
        <div className="flex justify-between items-center gap-2">
          <CgProfile />
          Username
        </div>
      </div>
    </div>
  );
}
