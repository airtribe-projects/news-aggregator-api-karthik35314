const axios = require("axios");

exports.getNews = async (req, res) => {
  try {
    const response = await axios.get(
      `https://gnews.io/api/v4/search?q=Google&lang=en&max=5&apikey=${apiKey}`
    );
    res.status(200).json({ news: response.data.articles });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch news" });
  }
};