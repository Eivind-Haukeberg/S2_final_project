import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';

function HomePage() {
  return (
    <div className='home-page'>
      <h1>Welcome to OneApp</h1>
      <LoginForm />
      <RegisterForm />
    </div>
  );
}

export default HomePage;
