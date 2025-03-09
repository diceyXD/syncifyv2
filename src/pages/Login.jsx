import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to verify credentials
    // For demo purposes, we'll just set authentication to true
    setIsAuthenticated(true);
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[var(--dark-bg)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-[var(--dark-surface)] rounded-xl shadow-2xl p-8 space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <img
              src="/src/assets/logo.png"
              alt="Logo"
              className="h-16 w-auto"
            />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 bg-[var(--dark-primary)] text-[var(--dark-text)] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 bg-[var(--dark-primary)] text-[var(--dark-text)] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Sign in
            </button>
          </div>

          <div className="text-sm text-center">
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;