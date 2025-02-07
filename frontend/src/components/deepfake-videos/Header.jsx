import React from "react";
import { Link } from "react-router-dom";

function Header({ activeContainer }) {
    return (
        <header className="fixed w-full top-0 left-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-gray-800 tracking-tight">
                        Deep Fake Videos
                    </span>
                </Link>
            </div>
        </header>
    );
}

export default Header;