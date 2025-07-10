import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/users/profile`,
        { username, email },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setSuccess('Profile updated');
      setError('');
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Update Profile</button>
      </form>
      <button onClick={logout} className="w-full bg-red-500 text-white p-2 mt-4 rounded hover:bg-red-600">Logout</button>
    </div>
  );
}

export default Profile;