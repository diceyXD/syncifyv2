import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      // Apply material design dark theme colors
      root.style.setProperty('--dark-bg', '#121212');
      root.style.setProperty('--dark-surface', '#1e1e1e');
      root.style.setProperty('--dark-primary', '#424242');
      root.style.setProperty('--dark-secondary', '#303030');
      root.style.setProperty('--dark-text', '#ffffff');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      // Apply material design light theme colors
      root.style.setProperty('--dark-bg', '#ffffff');
      root.style.setProperty('--dark-surface', '#f5f5f5');
      root.style.setProperty('--dark-primary', '#e0e0e0');
      root.style.setProperty('--dark-secondary', '#f0f0f0');
      root.style.setProperty('--dark-text', '#000000');
      root.style.setProperty('--syncify-red', '#e53935'); // Adding Syncify logo red color for light mode
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}