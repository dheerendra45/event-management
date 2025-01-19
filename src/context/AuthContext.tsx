import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  login: (email: string, password: string) => void;
  logout: () => void;
  currentUser: { username: string } | null;
  token: string | null; // To store the JWT token
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null);
  const [token, setToken] = useState<string | null>(null); // Store the token
  const [loading, setLoading] = useState<boolean>(true); // Handle loading state to avoid issues when app is loading

  useEffect(() => {
    // Check if the user is already logged in (e.g., from localStorage or session)
    const storedUser = localStorage.getItem('currentUser');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setCurrentUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false); // Once the check is complete, stop loading
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Call the backend API to authenticate the user
      const response = await axios.post('http://localhost:5000/api/auth/users/login', {
        email,
        password,
      });

      if (response.data.token) {
        // Save token and user data in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('currentUser', JSON.stringify({ username: email }));

        // Update the context state
        setToken(response.data.token);
        setCurrentUser({ username: email }); // You can customize this based on user data from the backend
      } else {
        console.error('Login failed, no token received');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    // Clear token and user data from localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');

    setCurrentUser(null); // Clear the user from context
    setToken(null); // Clear the token
  };

  return (
    <AuthContext.Provider value={{ login, logout, currentUser, token }}>
      {loading ? <div>Loading...</div> : children} {/* Show a loading message while checking user */}
    </AuthContext.Provider>
  );
};
