import React, { useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { TMDB_API_KEY } from '../../constants';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({ genre: '', year: '', rating: '', sort: 'popularity.desc' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: TMDB_API_KEY,
          query,
          primary_release_year: filters.year,
          with_genres: filters.genre,
          'vote_average.gte': filters.rating,
          sort_by: filters.sort,
        },
      });
      setMovies(res.data.results);
    } catch (err) {
      setError('Failed to fetch movies');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search Movies</h2>
      <div className="mb-4 space-y-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title"
          className="w-full p-2 border rounded"
        />
        <div className="flex space-x-4">
          <select
            onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="">Select Genre</option>
            <option value="28">Action</option>
            <option value="35">Comedy</option>
            <option value="18">Drama</option>
            <option value="27">Horror</option>
          </select>
          <input
            type="number"
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            placeholder="Year"
            className="p-2 border rounded"
          />
          <input
            type="number"
            value={filters.rating}
            onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
            placeholder="Min Rating"
            className="p-2 border rounded"
          />
          <select
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="popularity.desc">Popularity Desc</option>
            <option value="vote_average.desc">Rating Desc</option>
            <option value="release_date.desc">Release Date Desc</option>
          </select>
        </div>
        <button onClick={searchMovies} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;