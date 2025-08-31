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
    color: "voilet-500",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h6m8-11v11a1 1 0 01-1 1h-6"/>
      </svg>
    ),
  },
  {
    name: "Login",
    slug: "/login",
    active: !authStatus,
    color: "blue-500",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m12 0l-4-4m4 4l-4 4"/>
      </svg>
    ),
  },
  {
    name: "Signup",
    slug: "/signup",
    active: !authStatus,
    color: "amber-500",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 21v-2a4 4 0 00-3-3.87M12 7a4 4 0 100 8 4 4 0 000-8zm6 8a4 4 0 00-3-3.87M6 21v-2a4 4 0 013-3.87"/>
      </svg>
    ),
  },
  {
    name: "All Posts",
    slug: "/all-posts",
    active: authStatus,
    color: "pink-500",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7"/>
      </svg>
    ),
  },
  {
    name: "Add Post",
    slug: "/add-post",
    active: authStatus,
    color: "green-500",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
      </svg>
    ),
  },
];
  return (
    <header className=" text-white shadow-md py-4 bg-zinc-900 ">
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
                    <button className={`Btn hover:bg-${item.color} bg-${item.color}`}  onClick={() => navigate(item.slug)} >
  
  <div className="sign">{item.icon}</div>
  
  <div className="text text-xs">{item.name}</div>
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
