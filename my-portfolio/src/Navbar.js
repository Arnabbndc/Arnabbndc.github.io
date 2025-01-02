import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MenuItem, MenuItems, MenuButton, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Navbar = ({ toggleTheme }) => {
  const { auth, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Project Title */}
        <h1 className="text-xl font-extrabold tracking-wide">🌱 Project Farming</h1>
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-lg font-medium hover:text-gray-200 transition-all duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-lg font-medium hover:text-gray-200 transition-all duration-300">
                Products
              </Link>
            </li>
          </ul>

          {/* Profile and Toggle Theme */}
          {auth.isLoggedIn && auth.user ? (
            <div className="relative flex items-center space-x-4">
              {/* Profile Icon and Name */}
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-500 transition duration-300">
                    <div className="w-8 h-8 bg-black rounded-full flex justify-center items-center text-white">
                      {/* Placeholder for profile icon */}
                      <span className="text-sm font-bold">{auth.user.username[0]}</span>
                    </div>
                    <span className="text-sm font-medium">{auth.user.username}</span>
                  </MenuButton>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <MenuItem>
                        {({ active }) => (
                          <span
                            className={`block px-4 py-2 text-sm ${
                              active ? "bg-gray-100" : ""
                            }`}
                          >
                            Email: {auth.user.email}
                          </span>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={`block px-4 py-2 text-sm ${
                              active ? "bg-gray-100" : ""
                            }`}
                          >
                            Profile Settings
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={logout}
                            className={`block w-full text-left px-4 py-2 text-sm ${
                              active ? "bg-gray-100" : ""
                            }`}
                          >
                            Logout
                          </button>
                        )}
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>

              {/* Toggle Theme Button */}
              <button
                onClick={toggleTheme}
                className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg shadow-lg transition duration-300"
              >
                Toggle Theme
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
