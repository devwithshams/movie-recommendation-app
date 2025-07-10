const express = require('express');
const auth = require('../middleware/auth');
const Review = require('../models/Review');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { movieId, rating, comment } = req.body;
  try {
    const review = new Review({
      movieId,
      rating,
      comment,
      user: req.user.id,
    });
    await review.save();
    const populatedReview = await Review.findById(review._id).populate('user', 'username');
    res.json(populatedReview);
  } catch (err) {
    res.status(400).json({ error: 'Failed to submit review' });
  }
});

router.get('/:movieId', async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId }).populate('user', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;