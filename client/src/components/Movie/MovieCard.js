import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

function MovieCard({ movie }) {
  const { user } = useContext(AuthContext);

  const addToWatchlist = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/watchlist`,
        { movieId: movie.id, title: movie.title, poster_path: movie.poster_path },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Added to watchlist');
    } catch (err) {
      alert('Failed to add to watchlist');
    }
  };

  const addToFavorites = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/favorites`,
        { movieId: movie.id, title: movie.title, poster_path: movie.poster_path },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Added to favorites');
    } catch (err) {
      alert('Failed to add to favorites');
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-64 object-cover rounded"
      />
      <h3 className="text-lg font-bold mt-2">{movie.title}</h3>
      <p>Rating: {movie.vote_average}</p>
      <Link to={`/movies/${movie.id}`} className="text-blue-500 hover:underline">View Details</Link>
      {user && (
        <div className="mt-2 space-x-2">
          <button onClick={addToWatchlist} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
            Add to Watchlist
          </button>
          <button onClick={addToFavorites} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
            Add to Favorites
          </button>
        </div>
      )}
    </div>
  );
}

export default MovieCard;