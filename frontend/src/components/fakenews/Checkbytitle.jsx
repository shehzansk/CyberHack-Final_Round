import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import axios from "axios";

function CheckByTitle() {
  document.title = "Fake News | Check news by title";
  const [inputNewsTitle, setNewsTitle] = useState("");
  const [predictedValue, setPredictedValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputNewsTitle.trim()) {
      toast.error("Enter some text!");
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/usercheck/title/", { user_news: inputNewsTitle });
      if (response.data.prediction === true) {
        setPredictedValue("True");
        toast.success("Real news!", { icon: <Check className="text-green-500" /> });
      } else {
        setPredictedValue("False");
        toast.error("Fake news!", { icon: <X className="text-red-500" /> });
      }
    } catch (error) {
      console.error("Error submitting data: ", error);
      toast.error("Something went wrong! Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Header />
      <ToastContainer />
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white shadow-md rounded-lg p-6 mt-20">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Check News by Title</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">News Title</label>
              <input
                type="text"
                value={inputNewsTitle}
                onChange={(e) => setNewsTitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter news title"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Checking...
                </span>
              ) : (
                "Check"
              )}
            </button>
          </form>

          {predictedValue && (
            <div className="mt-6">
              {predictedValue === "True" ? (
                <div className="p-4 bg-green-50 border-l-4 border-green-400">
                  <div className="flex items-center">
                    <Check className="h-6 w-6 text-green-400" />
                    <p className="ml-3 text-sm font-medium text-green-700">Predicted as Real News</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-red-50 border-l-4 border-red-400">
                  <div className="flex items-center">
                    <X className="h-6 w-6 text-red-400" />
                    <p className="ml-3 text-sm font-medium text-red-700">Predicted as Fake News</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckByTitle;