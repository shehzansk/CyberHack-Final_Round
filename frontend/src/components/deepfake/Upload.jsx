'use client';

import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Header from "./Header";

const Upload = () => {
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
        formData.append("video", file);

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/Detect", formData, {
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
        <div>
            <Header />
            <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
                <div className="w-full max-w-lg bg-white shadow-xl rounded-lg p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Upload Video for Detection</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="file" accept="video/*" onChange={handleFileChange} className="border rounded-lg p-2 w-full" />
                        <button type="submit" className="w-full flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "Upload"}
                        </button>
                    </form>
                    {result && (
                        <div className="mt-4 text-center bg-gray-50 p-4 rounded-lg">
                            <h2 className="text-lg font-medium text-gray-700">Result: {result.output}</h2>
                            <p className="text-sm text-gray-600">Confidence: {result.confidence?.toFixed(2)}%</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Upload;