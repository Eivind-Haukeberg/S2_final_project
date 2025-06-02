// ----- FILE PURPOSE ----->
// This file defines and provides an authentication context for the app using Firebase Authentication.
// It tracks the authenticated user and provides global access to the user and loading state.

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseConfig.js';

// ----- CREATE CONTEXT ----->
// Creates a React context to hold and share authentication state across the app.
const AuthContext = createContext();

// ----- CUSTOM HOOK FOR CONTEXT ----->
// This hook allows components to easily access the AuthContext values.
export const useAuth = () => useContext(AuthContext);

// ----- CONTEXT PROVIDER COMPONENT ----->
// Wraps children in AuthContext.Provider to share the current user and loading state.
// Listens for auth state changes on mount and cleans up the listener on unmount.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
