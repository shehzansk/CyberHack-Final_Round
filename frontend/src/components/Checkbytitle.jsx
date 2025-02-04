import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import axios from "axios";

function CheckByTitle() {
  document.title = "News Guardian | Check news by title";
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
        toast.success("Real news!");
      } else {
        setPredictedValue("False");
        toast.error("Fake news!", { icon: <X className="text-white bg-red-500" /> });
      }
    } catch (error) {
      console.error("Error submitting data: ", error);
      toast.error("Something went wrong! Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-gray-200">
      <Header activeContainer={2} />
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="bg-dark-700 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Check News by Title</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-black">News Title</label>
            <textarea
              className="w-full p-3 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter news title..."
              rows={5}
              onChange={(e) => setNewsTitle(e.target.value)}
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">○</span>
                  Checking...
                </>
              ) : (
                "Check"
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          {predictedValue === "True" && (
            <div className="text-green-400 flex items-center justify-center space-x-2 bg-green-900/30 p-4 rounded-lg">
              <Check className="w-6 h-6" /> 
              <span className="text-lg">Predicted as Real News</span>
            </div>
          )}
          {predictedValue === "False" && (
            <div className="text-red-400 flex items-center justify-center space-x-2 bg-red-900/30 p-4 rounded-lg">
              <X className="w-6 h-6" /> 
              <span className="text-lg">Predicted as Fake News</span>
            </div>
          )}
        </div>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default CheckByTitle;