import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import Logo from "../assets/textto-high-resolution-logo-transparent.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed inset-x-0 z-10 top-0 w-full rounded-2xl border-x-4 border-y-2 border-orange bg-lightgray py-3 shadow-lg backdrop-blur-lg transition-all duration-500 hover:shadow-2xl hover:bg-gray-300">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <Link aria-current="page" className="flex items-center" to="/">
              <img className="h-10" src={Logo} alt="Website Logo" />
              <p className="sr-only">Website Title</p>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            <Link
              to="/"
              className={`inline-block rounded-lg px-3 py-1 text-sm font-medium transition-all duration-200 hover:bg-orange hover:bg-opacity-20 ${
                currentPath === "/"
                  ? "bg-orange bg-opacity-80 text-white hover:text-orange"
                  : "text-black"
              }`}
            >
              Home
            </Link>
            <Link
              to="/result"
              className={`inline-block rounded-lg px-3 py-1 text-sm font-medium transition-all duration-200 hover:bg-orange hover:bg-opacity-20 ${
                currentPath === "/result"
                  ? "bg-orange bg-opacity-80 text-white hover:text-orange"
                  : "text-black"
              }`}
            >
              Results
            </Link>
            <Link
              to="/table"
              className={`inline-block rounded-lg px-3 py-1 text-sm font-medium transition-all duration-200 hover:bg-orange hover:bg-opacity-20 ${
                currentPath === "/table"
                  ? "bg-orange bg-opacity-80 text-white hover:text-orange"
                  : "text-black"
              }`}
            >
              Table
            </Link>
          </div>
          <div className="flex items-center justify-end gap-3">
            <SignedOut>
              <SignInButton
                mode="modal"
                redirectUrl="/result"
                className="inline-flex items-center justify-center rounded-xl bg-orange px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Login
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton className="text-black bg-orange hover:bg-black rounded-full px-4 py-2 transition duration-300 ease-in-out" />
            </SignedIn>
            <button className="md:hidden p-2" onClick={toggleMenu}>
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden px-8 pt-2 pb-4 space-y-2 bg-gray-300 rounded-b-lg">
          <Link
            to="/"
            className={`block rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-orange hover:bg-opacity-20 ${
              currentPath === "/"
                ? "bg-orange bg-opacity-80 text-white hover:text-orange"
                : "text-black"
            }`}
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/result"
            className={`block rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-orange hover:bg-opacity-20 ${
              currentPath === "/result"
                ? "bg-orange bg-opacity-80 text-white hover:text-orange"
                : "text-black"
            }`}
            onClick={toggleMenu}
          >
            Results
          </Link>
          <Link
            to="/table"
            className={`block rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-orange hover:bg-opacity-20 ${
              currentPath === "/table"
                ? "bg-orange bg-opacity-80 text-white hover:text-orange"
                : "text-black"
            }`}
            onClick={toggleMenu}
          >
            Table
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
