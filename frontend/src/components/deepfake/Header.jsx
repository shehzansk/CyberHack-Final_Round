import React from "react";

function Header({ activeContainer }) {
    return (
        <header className="bg-dark-800 shadow-lg border-b border-dark-700 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <span className="font-semibold text-black">Deep News</span>
                </div>
            </div>
        </header>
    );
}

export default Header;