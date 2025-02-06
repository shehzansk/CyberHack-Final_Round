import React from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

function Header({ activeContainer }) {
  return (
    <header className="bg-dark-800 shadow-lg border-b border-dark-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-semibold text-black">Fake News</span>
        </Link>

        <nav className="flex space-x-6 items-center">
          <div className="relative group">
            <button className="flex items-center space-x-2 text-black hover:text-blue-500 transition-colors duration-200">
              <span>News Categories</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 shadow-2xl rounded-lg border bg-white border-dark-600 hidden group-hover:block z-50">
              {[
                "Sport", "World", "Society", "Books", "Life and Style", 
                "Art and Design", "US News", "Comment Is Free", "Fashion", 
                "News", "Education", "Politics", "TV and Radio", 
                "Business", "UK News", "Environment", "Football"
              ].map((category, index) => (
                <Link
                  key={index}
                  to={`/category/${category.toLowerCase().replace(/ /g, "")}`}
                  className="block px-4 py-2 text-black  hover:text-blue-500 transition-colors duration-150"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <Link 
            to="/checkbytitle" 
            className={`
              ${activeContainer === 2 
                ? "text-black font-semibold" 
                : "text-black hover:text-blue-500"}
              transition-colors duration-200
            `}
          >
            Check News By Title
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;