import React, { useState } from "react";
import { Container, Logo, Logoutbtn } from "../Index";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="bg-yellow-900 text-white shadow-md py-4 dark:bg-gray-800 dark:text-white">
      <Container>
        <div className="flex justify-between items-center">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      className="inline-block px-6 py-2 rounded-full duration-200 hover:bg-blue-600 focus:outline-none"
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <Logoutbtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-gray-800 text-white p-4 rounded-lg">
            <ul>
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name} className="mb-2">
                      <button
                        className="w-full text-left px-6 py-2 rounded-full duration-200 hover:bg-blue-600"
                        onClick={() => {
                          navigate(item.slug);
                          setIsMenuOpen(false);
                        }}
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li className="mt-4">
                  <Logoutbtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
