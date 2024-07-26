"use client";
import Link from "next/link";
import React, { useState } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import { TfiMenu } from "react-icons/tfi";

function SideMenuItem() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        id="dropdownRightEndButton"
        className="text-white focus:ring-4 focus:outline-none focus:ring-blue-100 rounded-lg text-xl px-3 py-2.5 text-center inline-flex items-center border-2 bg-slate-300 hover:border-white"
        type="button"
        onClick={toggleDropdown}
      >
        {/* <CgMenuLeftAlt /> */}
        <TfiMenu />
        {/* <svg
          className="w-2.5 h-2.5 ms-3 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg> */}
      </button>

      {isOpen && (
        <div
          id="dropdownRightEnd"
          className="z-10 absolute mt-2 bg-slate-300 divide-y divide-gray-100 rounded-lg shadow w-44 "
        >
          <ul
            className="py-3 text-sm text-white"
            aria-labelledby="dropdownRightEndButton"
          >
            <li onClick={toggleDropdown}>
              <Link
                href="/userposts"
                className="block px-4 py-3 hover:bg-slate-400"
              >
                Мої оголошення
              </Link>
            </li>
            <li onClick={toggleDropdown}>
              <Link
                href="/about"
                className="block px-4 py-3 hover:bg-slate-400"
              >
                Про нас
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default SideMenuItem;
