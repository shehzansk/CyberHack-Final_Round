import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Check, X } from 'lucide-react';
import axios from 'axios';

function Home() {
  document.title = 'News Guardian | Home';
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

  const NewsCard = ({ news, index }) => (
    <div className="border border-dark-600 rounded-lg overflow-hidden mb-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
      {news.img_url !== 'None' && (
        <img
          src={news.img_url}
          alt={`News ${index}`}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h5 className="text-lg font-semibold text-black mb-2">{news.title}</h5>
        <p className="text-black mb-2">
          {new Date(news.publication_date).toLocaleString()}
        </p>
        <div>
          {news.prediction ? (
            <div className="text-green-400 flex items-center">
              <Check className="mr-2" /> Predicted as Real News
            </div>
          ) : (
            <div className="text-red-400 flex items-center">
              <X className="mr-2" /> Predicted as Fake News
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-dark-800 min-h-screen text-black">
      <Header activeContainer={stage} />
      <div className="bg-white container mx-auto px-4 py-8">
        {liveNewsData.length >= 10 ? (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <NewsCard news={liveNewsData[0]} index={0} />
              <NewsCard news={liveNewsData[1]} index={1} />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {liveNewsData.slice(2, 6).map((news, index) => (
                <NewsCard key={index} news={news} index={index + 2} />
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {liveNewsData.slice(6, 10).map((news, index) => (
                <NewsCard key={index} news={news} index={index + 6} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-black">Not enough data to display :(</p>
        )}

        {/* Must See Section */}
        <div className="mt-12 mb-6">
          <h3 className="text-2xl font-bold text-black mb-4">Must See</h3>
          <hr className="border-dark-600 mb-6" />

          {mustSeeNews.length >= 4 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mustSeeNews.slice(0, 4).map((news, index) => (
                <NewsCard key={index} news={news} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Not enough data to display</p>
          )}
        </div>

        {/* All News Section */}
        <div className="mt-12 mb-6">
          <h3 className="text-2xl font-bold text-black mb-4">All News</h3>
          <hr className="border-dark-600 mb-6" />

          {allNews.length >= 4 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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

export default Home;