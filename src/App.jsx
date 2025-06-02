// ----- COMPONENT PURPOSE ----->
// This is the root component of the application. It defines the global layout and routes,
// including protected routes for authenticated users only.

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import AdminPage from './pages/AdminPage';
import './styles/reset.css';
import './styles/variables.css';
import './index.css';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  // ----- COMPONENT RENDERING ----->
  // Renders the navigation bar and sets up routing for the app.
  // Some routes are wrapped with <ProtectedRoute> to require authentication.
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/my-page' element={<MyPage />} />
        <Route
          path='/my-page'
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin'
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
