import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth.js';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Check for tokens in localStorage when component mounts
  useEffect(() => {

  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || password != confirmPassword) {
      setError('Both username and password are required.');
      return;
    }

    try {
      const response = await register({ username, password })

      if (response) {
        navigate('/login');
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred while logging in.');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-14 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

      {/* Error Message */}
      {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

      {/* Login Form */}
      <form onSubmit={handleRegister} className="space-y-6">
        <div className="input-group">
          <label htmlFor="username" className="block text-gray-700 font-medium">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-medium">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Register
        </button>
      </form>

    </div>

  );
};

export default Register;
