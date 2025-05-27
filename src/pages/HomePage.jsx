import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

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
