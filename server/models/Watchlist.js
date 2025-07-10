const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: Number, required: true },
  title: String,
  poster_path: String,
});

module.exports = mongoose.model('Watchlist', watchlistSchema);