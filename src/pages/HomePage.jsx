import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import HomeCollectionsList from '../components/HomeCollectionsList/HomeCollectionsList';

function HomePage() {
  return (
    <div className='home-page'>
      <h1>Welcome to OneApp</h1>
      <LoginForm />
      <RegisterForm />
      <HomeCollectionsList />
    </div>
  );
}

export default HomePage;
