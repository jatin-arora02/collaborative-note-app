// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'; // Firebase hooks for authentication state
import { auth } from '../firebaseConfig'; // Ensure the path to your Firebase config is correct

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>; // Add a loader if necessary
  }

  // If no user is authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the children (protected component)
  return children;
};

export default ProtectedRoute;
