import React, { useState, useEffect } from "react";
import { auth } from "./firebase"; // Firebase configuration
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Track authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Signed in successfully!");
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            alert("Signed out successfully!");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-10">
            <div className="w-full max-w-md bg-white backdrop-blur-md rounded-xl shadow-xl p-8 space-y-6 border border-violet-300">
                {user ? (
                    <div className="text-center space-y-4 text-gray-800">
                        <p className="text-lg font-semibold">Welcome, {user.email}</p>
                        <button
                            onClick={handleSignOut}
                            className="w-full bg-red-600 text-white py-2 px-2 rounded-lg hover:bg-red-700 transition duration-300">
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                            <p className="text-gray-400">Sign in to continue with Fake Buster</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="text-black-400 w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                    required
                                    className="block w-full px-12 py-3  text-black-400 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="text-black-400 w-5 h-5" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                    className="block w-full text-black-400 px-12 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-400"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-violet-400 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-300">
                                Sign In
                            </button>
                        </form>
                        <div className="text-black text-center py-2">
                            <span>Don't have an account? </span>
                            <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SignIn;
