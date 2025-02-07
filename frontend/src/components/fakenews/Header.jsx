import React, { useState } from "react";
import { ChevronDown, Menu, X, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

function Header({ activeContainer }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    "Sport", "World", "Society", "Books", "Life and Style",
    "Art and Design", "US News", "Comment Is Free", "Fashion",
    "News", "Education", "Politics", "TV and Radio",
    "Business", "UK News", "Environment", "Football"
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/fakenews" className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-gray-800 tracking-tight">
            Fake News
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <div className="relative group">
            <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200 group">
              <span>News Categories</span>
              <ChevronDown className="w-4 h-4 transform group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute left-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
              <div className="py-2 grid grid-cols-2 gap-1 p-2">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/category/${category.toLowerCase().replace(/ /g, "")}`}
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            to="/checkbytitle"
            className={`
              text-gray-700 hover:text-indigo-600 transition-colors duration-200
              ${activeContainer === 2 ? "font-semibold text-indigo-600" : ""}
            `}
          >
            Check News By Title
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-800 hover:text-indigo-600 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-20 px-4 overflow-y-auto">
          <nav className="space-y-4">
            <div className="group">
              <button className="w-full text-left flex justify-between items-center text-xl font-semibold text-gray-800 pb-2 border-b">
                News Categories
                <ChevronDown className="w-6 h-6" />
              </button>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/category/${category.toLowerCase().replace(/ /g, "")}`}
                    className="px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/checkbytitle"
              className="block text-xl text-gray-800 py-2 border-b"
              onClick={toggleMobileMenu}
            >
              Check News By Title
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;