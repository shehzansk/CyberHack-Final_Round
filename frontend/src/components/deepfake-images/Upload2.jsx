import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Header from "./Header";

const Upload2 = () => {
    document.title = 'Deep Fake';
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/detect_image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setResult(response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("An error occurred while uploading the file.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
            <Header />
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
                <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 transform transition-all hover:scale-105">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Upload image for Detection</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="file-upload" className="text-lg font-medium text-gray-700">
                                Choose a image File
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                    Uploading...
                                </>
                            ) : (
                                "Upload"
                            )}
                        </button>
                    </form>
                    {result && (
                        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Detection Result</h2>
                            <p className="text-lg text-gray-700">
                                <span className="font-medium">Output:</span> {result.output}
                            </p>
                            <p className="text-lg text-gray-700">
                                <span className="font-medium">Confidence:</span> {result.confidence?.toFixed(2)}%
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Upload2;