const express = require('express');
const {
  getNews,
  searchNews,
  markRead,
  markFavorite,
  getRead,
  getFavorites,
} = require('../controllers/newsController');
const auth = require('../middleware/auth');

const router = express.Router();

// News routes
router.get('/', auth, getNews);
router.get('/search/:keyword', auth, searchNews);

// Read/Favorite routes
router.post('/:id/read', auth, markRead);
router.post('/:id/favorite', auth, markFavorite);
router.get('/read', auth, getRead);
router.get('/favorites', auth, getFavorites);

module.exports = router;