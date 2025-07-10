import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../Movie/MovieCard';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWatchlist = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/watchlist`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setWatchlist(res.data);
      } catch (err) {
        setError('Failed to fetch watchlist');
      }
      setLoading(false);
    };
    fetchWatchlist();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Watchlist</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {watchlist.map((movie) => (
          <MovieCard key={movie.movieId} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Watchlist;