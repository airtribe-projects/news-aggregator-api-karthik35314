const axios = require('axios');
const NodeCache = require('node-cache');
const newsCache = new NodeCache({ stdTTL: 600 }); // 10 minutes
const userData = {}; // Replace with DB in production

const NEWS_API_URL = 'https://newsapi.org/v2';
const API_KEY = process.env.NEWS_API_KEY;

// 1. Get News with Caching
exports.getNews = async (req, res) => {
  const cachedNews = newsCache.get('topNews');
  if (cachedNews) return res.status(200).json({ news: cachedNews });

  try {
    const response = await axios.get(`${NEWS_API_URL}/top-headlines`, {
      params: { country: 'in', apiKey: API_KEY },
    });
    newsCache.set('topNews', response.data.articles);
    res.status(200).json({ news: response.data.articles });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch news' });
  }
};

// 2. Search News
exports.searchNews = async (req, res) => {
  const { keyword } = req.params;
  try {
    const response = await axios.get(`${NEWS_API_URL}/everything`, {
      params: { q: keyword, apiKey: API_KEY, language: 'en', pageSize: 10 },
    });
    res.status(200).json({ results: response.data.articles });
  } catch (err) {
    res.status(500).json({ message: 'Search failed' });
  }
};

// 3. Mark as Read
exports.markRead = (req, res) => {
  const { id } = req.params;
  const user = req.user.email;
  userData[user] = userData[user] || { read: [], favorites: [] };
  if (!userData[user].read.includes(id)) userData[user].read.push(id);
  res.status(200).json({ message: 'Marked as read' });
};

// 4. Mark as Favorite
exports.markFavorite = (req, res) => {
  const { id } = req.params;
  const user = req.user.email;
  userData[user] = userData[user] || { read: [], favorites: [] };
  if (!userData[user].favorites.includes(id)) userData[user].favorites.push(id);
  res.status(200).json({ message: 'Marked as favorite' });
};

// 5. Get Read Articles
exports.getRead = (req, res) => {
  const user = req.user.email;
  res.status(200).json({ read: userData[user]?.read || [] });
};

// 6. Get Favorite Articles
exports.getFavorites = (req, res) => {
  const user = req.user.email;
  res.status(200).json({ favorites: userData[user]?.favorites || [] });
};

// 7. Periodic Cache Update
setInterval(async () => {
  try {
    const response = await axios.get(`${NEWS_API_URL}/top-headlines`, {
      params: { country: 'in', apiKey: API_KEY },
    });
    newsCache.set('topNews', response.data.articles);
    console.log('News cache updated');
  } catch (err) {
    console.error('Failed to update cache:', err.message);
  }
}, 600000); // every 10 minutes