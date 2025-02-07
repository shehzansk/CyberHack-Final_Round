import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Check, X, Copy } from 'lucide-react';
import axios from 'axios';

function FakeNewsHome() {
  document.title = 'Fake News';
  let stage = 1;

  const [liveNewsData, setLiveNewsData] = useState([]);
  const [mustSeeNews, setMustSeeNews] = useState([]);
  const [allNews, setAllNews] = useState([]);

  const categories = ['Sport', 'Lifestyle', 'Arts', 'News'];

  const fetchLiveNewsData = async () => {
    try {
      const liveResponse = await axios.get('http://127.0.0.1:8000/api/live/');
      setLiveNewsData(liveResponse.data);

      const mustSeeResponse = await axios.get('http://127.0.0.1:8000/api/category/News/');
      setMustSeeNews(mustSeeResponse.data);

      const fetchPromises = categories.map(async (category) => {
        const response = await axios.get(`http://127.0.0.1:8000/api/category/${category}/`);
        return response.data.length > 0 ? response.data[0] : null;
      });

      const newsData = await Promise.all(fetchPromises);
      const filteredNewsData = newsData.filter(data => data !== null);
      setAllNews(filteredNewsData);
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    fetchLiveNewsData();

    const intervalId = setInterval(() => {
      fetchLiveNewsData();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const NewsCard = ({ news, index, variant = 'default' }) => {
    const [copied, setCopied] = useState(false);
    const isSmall = variant === 'small';

    const handleCopyTitle = () => {
      navigator.clipboard.writeText(news.title)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    };

    return (
      <div className={`
      bg-white rounded-2xl overflow-hidden shadow-lg 
      transform transition-all duration-300 hover:scale-105 hover:shadow-xl
      relative
      ${isSmall ? 'h-full' : ''}
    `}>
        {news.img_url !== 'None' && (
          <div className="relative overflow-hidden">
            <img
              src={news.img_url}
              alt={`News ${index}`}
              className={`w-full object-cover ${isSmall ? 'h-32' : 'h-48'}`}
            />
            <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1">
              {news.prediction ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <X className="w-5 h-5 text-red-500" />
              )}
            </div>
          </div>
        )}
        <div className={`p-4 ${isSmall ? 'p-3' : ''} relative`}>
          <h5 className={`font-bold text-gray-800 ${isSmall ? 'text-sm' : 'text-lg'} mb-2`}>
            {news.title}
          </h5>
          <div className="flex items-center text-gray-500 text-sm space-x-2">
            <div className="w-4 h-4" />
            <span>{new Date(news.publication_date).toLocaleString()}</span>
          </div>

          {/* Copy Title Button */}
          <button
            onClick={handleCopyTitle}
            className="absolute bottom-2 left-2 text-gray-500 hover:text-gray-800 transition-colors"
            title="Copy Title"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        {/* Copy Confirmation Toast */}
        {copied && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 
          bg-green-500 text-white text-xs px-2 py-1 rounded-full
          animate-bounce">
            Copied!
          </div>
        )}
      </div>
    );
  };


  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <Header activeContainer={stage} />

      <div className="container mx-auto px-4 py-8 mt-15">
        {/* Hero Section */}
        {liveNewsData.length >= 10 && (
          <div className="mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Featured Large Card */}
              <div className="md:col-span-1">
                <NewsCard news={liveNewsData[0]} index={0} />
              </div>

              {/* Secondary Large Card */}
              <div className="md:col-span-1">
                <NewsCard news={liveNewsData[1]} index={1} />
              </div>
            </div>

            {/* Trending News Grid */}
            <div className="mt-8">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 mr-2 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-800">Trending News</h2>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                {liveNewsData.slice(2, 6).map((news, index) => (
                  <NewsCard key={index} news={news} index={index + 2} variant="small" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Must See Section */}
        <div className="mt-12 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-6 h-6 mr-2 text-yellow-500" />
            <h3 className="text-2xl font-bold text-gray-800">Must See</h3>
          </div>

          {mustSeeNews.length >= 4 ? (
            <div className="grid md:grid-cols-4 gap-6">
              {mustSeeNews.slice(0, 4).map((news, index) => (
                <NewsCard key={index} news={news} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Not enough data to display</p>
          )}
        </div>

        {/* All News Section */}
        <div className="mt-12 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-6 h-6 mr-2 text-green-600" />
            <h3 className="text-2xl font-bold text-gray-800">All News</h3>
          </div>

          {allNews.length >= 4 ? (
            <div className="grid md:grid-cols-4 gap-6">
              {allNews.slice(0, 4).map((news, index) => (
                <NewsCard key={index} news={news} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Not enough data to display</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FakeNewsHome;