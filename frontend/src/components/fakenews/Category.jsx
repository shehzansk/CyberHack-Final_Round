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
        toast.success("Real news!");
      } else {
        setPredictedValue("False");
        toast.error("Fake news!");
      }
    } catch (error) {
      console.error("Error submitting data: ", error);
      toast.error("Something went wrong! Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Header activeContainer={2} />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-lg font-medium text-gray-800">News Title</label>
            <textarea
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter news title..."
              rows={4}
              value={inputNewsTitle}
              onChange={(e) => setNewsTitle(e.target.value)}
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Checking..." : "Check"}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          {predictedValue === "True" && (
            <div className="text-green-600 flex items-center justify-center space-x-2 text-lg font-semibold">
              <Check className="w-6 h-6" /> 
              <span>Predicted as real news!</span>
            </div>
          )}
          {predictedValue === "False" && (
            <div className="text-red-600 flex items-center justify-center space-x-2 text-lg font-semibold">
              <X className="w-6 h-6" /> 
              <span>Predicted as fake news!</span>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CheckByTitle;