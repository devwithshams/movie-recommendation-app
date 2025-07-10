const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Watchlist = require('../models/Watchlist');
const Favorite = require('../models/Favorite');
const router = express.Router();

router.put('/profile', auth, async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.username = username;
    user.email = email;
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, username, email } });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update profile' });
  }
});

router.get('/watchlist', auth, async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ user: req.user.id });
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch watchlist' });
  }
});

router.post('/watchlist', auth, async (req, res) => {
  try {
    const watchlistItem = new Watchlist({ ...req.body, user: req.user.id });
    await watchlistItem.save();
    res.json(watchlistItem);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add to watchlist' });
  }
});

router.get('/favorites', auth, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

router.post('/favorites', auth, async (req, res) => {
  try {
    const favorite = new Favorite({ ...req.body, user: req.user.id });
    await favorite.save();
    res.json(favorite);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add to favorites' });
  }
});

module.exports = router;