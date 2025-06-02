// ----- COMPONENT PURPOSE ----->
// This is the main landing page of the application. It shows login/register forms if the user is not authenticated,
// and always displays the HomeCollectionsList component.

import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import HomeCollectionsList from '../components/HomeCollectionsList/HomeCollectionsList';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
  // ----- AUTHENTICATION CONTEXT ----->
  // Retrieves the current user from the authentication context to determine what content to show.
  const { user } = useAuth();

  // ----- COMPONENT RENDERING ----->
  // Renders a welcome title, authentication forms for unauthenticated users, and the list of collections.
  return (
    <div className='home-page'>
      <h1 className='home-page__title'>Welcome to OneApp</h1>

      <div className='auth-form'>
        {!user && (
          <>
            <div>
              <LoginForm />
            </div>
            <div>
              <RegisterForm />
            </div>
          </>
        )}
      </div>

      <HomeCollectionsList />
    </div>
  );
}

export default HomePage;
