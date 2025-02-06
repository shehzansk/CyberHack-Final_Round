import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleFakeNewsClick = () => {
        navigate('/fakenews');
    };
    
    const handleDeepFakeClick = () => {
        navigate('/deepfake');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-100">
            {/* Header */}
            <header className="bg-white shadow-lg">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-gray-800">BelieveMe</div>
                        <nav className="flex space-x-4">
                            <a href="#" className="text-gray-700 hover:text-purple-600">Home</a>
                            <a href="#" className="text-gray-700 hover:text-purple-600">Features</a>
                            <a href="#" className="text-gray-700 hover:text-purple-600">Contact</a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-6 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to BelieveMe</h1>
                    <p className="text-xl text-gray-600">Empowering you to detect deepfakes and fake news with cutting-edge AI technology.</p>
                </div>

                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Deepfake Detection Feature */}
                    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="text-center">
                            <div className="text-4xl text-purple-600 mb-4">🤖</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Deepfake Detection</h2>
                            <p className="text-gray-600">Our advanced AI algorithms can detect deepfake videos and images with high accuracy, helping you identify manipulated media.</p>
                            <button onClick={handleDeepFakeClick} className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300">
                                Get Started
                            </button>
                        </div>
                    </div>

                    {/* Fake News Detection Feature */}
                    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="text-center">
                            <div className="text-4xl text-blue-600 mb-4">📰</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Fake News Detection</h2>
                            <p className="text-gray-600">Stay informed with our fake news detection system that analyzes and verifies the authenticity of news articles in real-time.</p>
                            <button
                                onClick={handleFakeNewsClick}
                                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-gray-400">© 2025 BelieveMe. All rights reserved.</p>
                    <div className="mt-4 flex justify-center space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
                        <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;