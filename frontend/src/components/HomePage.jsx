import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheckIcon, NewspaperIcon, Camera } from 'lucide-react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const HomePage = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const auth = getAuth();

    // Check authentication status
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });
        return () => unsubscribe(); // Cleanup on unmount
    }, [auth]);

    // Handle logout
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/signin');
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };
    const handleButtonSignin = () => {
        alert("Please Sign in to continue");
        navigate('/signin');
    }

    const features = [
        {
            icon: <Camera className="w-16 h-16 text-indigo-500 mx-auto" />,
            title: "Deepfake Video Detection",
            description: "Advanced AI algorithms to detect manipulated video content with precision.",
            action: () => navigate('/deepfake-videos'),
        },
        {
            icon: <Camera className="w-16 h-16 text-teal-500 mx-auto" />,
            title: "Deepfake Image Detection",
            description: "Powerful image analysis to identify AI-generated visual deceptions.",
            action: () => navigate('/deepfake-images'),
        },
        {
            icon: <NewspaperIcon className="w-16 h-16 text-emerald-500 mx-auto" />,
            title: "Fake News Detection",
            description: "Real-time verification of news authenticity using cutting-edge AI.",
            action: () => navigate('/fakenews'),
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* Navigation */}
            <nav className="fixed w-full z-20 bg-white/80 backdrop-blur-md shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <ShieldCheckIcon className="w-8 h-8 text-indigo-600" />
                        <span className="text-2xl font-bold text-indigo-800">Fake Buster</span>
                    </div>
                    <div className="flex space-x-6">
                        {['Home', 'Features', 'About', 'Contact'].map(link => (
                            <a 
                                key={link} 
                                href="#" 
                                className="text-gray-600 hover:text-indigo-600 transition-colors"
                            >
                                {link}
                            </a>
                        ))}
                        <div>
                            {isAuthenticated ? (
                                <button 
                                    onClick={handleSignOut} 
                                    className="px-2 py-[2px] text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Sign Out
                                </button>
                            ) : (
                                <>
                                    <a 
                                        href="/signin" 
                                        className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                    >
                                        Sign In
                                    </a>
                                    <a 
                                        href="/signup" 
                                        className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        Sign Up
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="pt-24 pb-16 px-6 text-center bg-gradient-to-br from-indigo-50 to-teal-50">
                <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 mb-6">
                    Uncover the Truth
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
                    Protect yourself from digital misinformation with our advanced AI-powered detection technologies.
                </p>
            </header>

            {/* Features Grid */}
            <main className="container mx-auto px-6 grid md:grid-cols-3 gap-8 -mt-12">
                {features.map((feature, index) => (
                    <div 
                        key={index} 
                        className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all group"
                    >
                        {feature.icon}
                        <h2 className="text-2xl font-bold mt-6 mb-4 text-gray-800">
                            {feature.title}
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {feature.description}
                        </p>
                        {isAuthenticated?(
                            <button 
                            onClick={feature.action}
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg 
                                hover:bg-blue-600 transition-colors group-hover:scale-105"
                        >
                            Detect Now
                        </button>
                        ):(
                            <button 
                            onClick={handleButtonSignin}
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg 
                                hover:bg-blue-600 transition-colors group-hover:scale-105"
                        >
                            Detect Now
                        </button>
                        )};
                        
                    </div>
                ))}
            </main>

            {/* Footer */}
            <footer className="mt-16 bg-gray-900 text-white py-12">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-gray-400">© 2025 Fake Buster. Protecting Truth in the Digital Age.</p>
                    <div className="mt-6 flex justify-center space-x-6">
                        {['Privacy', 'Terms', 'Contact'].map(link => (
                            <a 
                                key={link} 
                                href="#" 
                                className="text-gray-500 hover:text-white transition-colors"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
