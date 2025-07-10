import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

function ReviewForm({ movieId, setReviews }) {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to submit a review');
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/reviews`,
        { movieId, rating, comment },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setReviews(prev => [...prev, res.data]);
      setRating('');
      setComment('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit review');
    }
  };

  return (
    <div className="my-4">
      <h3 className="text-xl font-bold">Add Review</h3>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating (1-10)"
          min="1"
          max="10"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your review"
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewForm;