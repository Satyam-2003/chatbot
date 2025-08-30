"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useState } from "react";

const Chatlabel = () => {
  const [openMenu, setOpenMenu] = useState(false); // hidden by default

  const toggleMenu = (e) => {
    e.stopPropagation();
    setOpenMenu((prev) => !prev); // toggle dropdown
  };

  return (
    <div className="flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer">
      <p className="group-hover:max-w-5/6 truncate">Chat Name Here</p>

      <div
        className="relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg"
        onClick={toggleMenu}
      >
        <Image className="w-4" src={assets.three_dots} alt="menu" />

        {/* Dropdown */}
        <div
          className={`absolute ${
            openMenu ? "block" : "hidden"
          } -right-36 top-6 bg-gray-700 rounded-xl w-max p-2`}
        >
          <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg">
            <Image src={assets.pencil_icon} alt="rename" className="w-4" />
            <p>Rename</p>
          </div>

          <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg">
            <Image src={assets.delete_icon} alt="delete" className="w-4" />
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatlabel;
