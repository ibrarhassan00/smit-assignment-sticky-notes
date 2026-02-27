import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Yeh state mobile menu ko kholne ya band karne ke liye hai.
  const [isOpen, setIsOpen] = useState(false);

  // Define navigation items (koi changes nahi)
  const navItems = [
    { name: 'Home', path: '/dashboard' },
    { name: 'My Notes', path: '/myNotes' },
    { name: 'Unsaved Notes', path: '/myUnsaveNotes' },
  ];

  // Menu toggle function
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 shadow-xl sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Welcome Text (Left side) */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-extrabold text-white tracking-wider">
              Welcome to the App
            </span>
          </div>

          {/* Desktop Navigation Links (Large screens par dikhenge) */}
          <div className="hidden md:block">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-white text-lg font-medium py-2 px-3 rounded-lg transition duration-200 ease-in-out hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button (Small screens par dikhega) */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              {/* Hamburger or Close icon */}
              {isOpen ? (
                // Close Icon (X) - jab menu khula ho
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Menu Icon (Hamburger) - jab menu band ho
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel (isOpen state par dikhega/hide hoga) */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-700/90 shadow-inner">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              // Link par click hone ke baad menu band ho jaye
              onClick={() => setIsOpen(false)} 
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-800 transition duration-150 ease-in-out"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;