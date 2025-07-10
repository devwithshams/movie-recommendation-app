const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/search', async (req, res) => {
  const { query, year, genre, rating, sort } = req.query;
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query,
        primary_release_year: year,
        with_genres: genre,
        'vote_average.gte': rating,
        sort_by: sort,
      },
    });
    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

router.get('/recommendations', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
      params: { api_key: process.env.TMDB_API_KEY },
    });
    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

module.exports = router;