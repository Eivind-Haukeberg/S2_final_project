import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/my-page' element={<MyPage />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;
