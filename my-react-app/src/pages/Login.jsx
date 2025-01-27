import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const navigate = useNavigate();

  // Check for tokens in localStorage when component mounts
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access_token');
    const storedRefreshToken = localStorage.getItem('refresh_token');

    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Both username and password are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Store tokens in localStorage
        localStorage.setItem('username', data.username);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        navigate('/home');
        // Update state with tokens
        setAccessToken(data.access_token);
        setRefreshToken(data.refresh_token);

        // Clear error message
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
      <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

      {/* Error Message */}
      {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-6">
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

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>

    </div>

  );
};

export default Login;
