"use client";
import Link from "next/link";
import React, { useState } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";

function SideMenuItem() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        id="dropdownRightEndButton"
        className="text-white focus:ring-4 focus:outline-none focus:ring-blue-100 rounded-lg text-xl px-2 py-2.5 text-center inline-flex items-center dark:bg-slate-400 dark:hover:bg-slate-500"
        type="button"
        onClick={toggleDropdown}
      >
        <CgMenuLeftAlt />
        <svg
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
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdownRightEnd"
          className="z-10 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-500"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownRightEndButton"
          >
            <li onClick={toggleDropdown}>
              <Link
                href="/userposts"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Мої оголошення
              </Link>
            </li>
            <li onClick={toggleDropdown}>
              <Link
                href="/about"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
