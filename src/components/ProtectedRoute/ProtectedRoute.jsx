// ----- COMPONENT PURPOSE ----->
// This component restricts access to certain routes based on user authentication.
// If the user is not logged in, they are redirected to the home page.

import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // ----- AUTHENTICATION CONTEXT ----->
  // Retrieves the current user and loading state from the AuthContext.
  const { user, loading } = useAuth();

  // ----- HANDLE LOADING STATE ----->
  // Displays a loading message while authentication state is being determined.
  if (loading) return <p>Loading...</p>;

  // ----- REDIRECT IF NOT AUTHENTICATED ----->
  // If the user is not authenticated, redirect them to the homepage.
  if (!user) return <Navigate to='/' />;

  // ----- RENDER PROTECTED CONTENT ----->
  // If the user is authenticated, render the child components (protected content).
  return children;
}

export default ProtectedRoute;
