import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import HomeCollectionsList from '../components/HomeCollectionsList/HomeCollectionsList';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
  const { user } = useAuth();

  return (
    <div className='home-page'>
      <h1>Welcome to OneApp</h1>

      {!user && (
        <>
          <LoginForm />
          <RegisterForm />
        </>
      )}

      <HomeCollectionsList />
    </div>
  );
}

export default HomePage;
