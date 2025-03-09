import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import syncifyLogo from '../assets/syncify.png';

function Dashboard() {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const navigation = [
    { name: 'Attendance', href: '/dashboard/attendance' },
    { name: 'Marks', href: '/dashboard/marks' },
    { name: 'Placement', href: '/dashboard/placement' },
  ];

  const handleSignOut = () => {
    // Add sign out logic here
    console.log('Sign out clicked');
  };

  return (
    <div className="flex h-screen w-full bg-[var(--dark-bg)] text-[var(--dark-text)]">
      {/* Sidebar */}
      <div className="hidden md:flex w-72 lg:w-80 bg-[var(--dark-surface)] shadow-lg flex-shrink-0 animate-fade-in">
        <div className="flex flex-col h-full w-full">
          <div className="flex items-center justify-center h-20 px-4 bg-[var(--dark-bg)]">
            <img src={syncifyLogo} alt="Syncify" className="h-7 w-auto animate-slide-in" />
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${isActive
                    ? 'bg-[var(--dark-secondary)] text-[var(--dark-text)]'
                    : 'text-[var(--dark-text)] hover:bg-[var(--dark-secondary)]'}
                  } flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 transform hover:scale-105`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-[var(--dark-bg)]">
        {/* Header */}
        <header className="sticky top-0 z-10 h-20 bg-[var(--dark-bg)] shadow-md px-6 flex items-center justify-end space-x-4">
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-full hover:bg-[var(--dark-secondary)] transition-colors duration-200 flex items-center space-x-2 text-current"
              aria-label="Profile"
            >
              <FaUserCircle className="w-6 h-6 text-[var(--dark-text)]" />
              <span className="font-medium text-[var(--dark-text)]">Dicey</span>
            </button>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isDarkMode}
                onChange={toggleTheme}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <button
              onClick={handleSignOut}
              className="p-2 rounded-full hover:bg-[var(--dark-secondary)] transition-colors duration-200 flex items-center space-x-2 text-current"
              aria-label="Sign out"
            >
              <FaSignOutAlt className="w-6 h-6 text-[var(--dark-text)]" />
            </button>
          </div>
        </header>
        <div className="p-6">
          <div className="h-full bg-[var(--dark-surface)] rounded-lg shadow-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;