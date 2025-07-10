const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 10 },
  comment: { type: String, required: true },
});

module.exports = mongoose.model('Review', reviewSchema);