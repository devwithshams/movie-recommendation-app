import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import { TMDB_API_KEY } from '../../constants';

function MovieDetails({ match }) {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const [movieRes, trailerRes, reviewsRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}`, {
            params: { api_key: TMDB_API_KEY },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}/videos`, {
            params: { api_key: TMDB_API_KEY },
          }),
          axios.get(`${process.env.REACT_APP_API_URL}/api/reviews/${match.params.id}`),
        ]);
        setMovie(movieRes.data);
        setTrailer(trailerRes.data.results.find(video => video.type === 'Trailer'));
        setReviews(reviewsRes.data);
      } catch (err) {
        setError('Failed to fetch movie details');
      }
      setLoading(false);
    };
    fetchMovie();
  }, [match.params.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!movie) return <p>No movie found</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full max-w-md rounded" />
      <p className="my-4">{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
      {trailer && (
        <div className="my-4">
          <h3 className="text-xl font-bold">Trailer</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            frameBorder="0"
            allowFullScreen
            className="rounded"
          ></iframe>
        </div>
      )}
      <ReviewForm movieId={match.params.id} setReviews={setReviews} />
      <h3 className="text-xl font-bold mt-4">Reviews</h3>
      {reviews.length ? (
        reviews.map(review => (
          <div key={review._id} className="border p-2 my-2 rounded">
            <p><strong>{review.user.username}</strong>: {review.rating}/10</p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet</p>
      )}
    </div>
  );
}

export default MovieDetails;