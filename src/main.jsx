// ----- FILE PURPOSE ----->
// This is the main entry point of the React application. It sets up the root React DOM render,
// wraps the application with routing and authentication context providers, and loads global styles.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';

// ----- REACT APP RENDERING ----->
// Renders the App component into the root DOM element. The app is wrapped with
// BrowserRouter for routing and AuthProvider for managing authentication context.
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
