// ----- COMPONENT PURPOSE ----->
// This component renders a login form that allows users to sign in using Firebase Authentication.
// It includes email/password input fields, validation, error handling, and a submit button.

import { useState } from 'react';
import { auth } from '../../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Button from '../Button/Button';
import styles from './LoginForm.module.css';

function LoginForm() {
  // ----- STATE MANAGEMENT ----->
  // Manages the login form fields and any error messages to be shown to the user.
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  // ----- HANDLE INPUT CHANGES ----->
  // Updates the corresponding form state when a user types into an input field.
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ----- HANDLE FORM SUBMISSION ----->
  // Validates form fields, then attempts to sign in using Firebase Authentication.
  // Displays an error message if login fails.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError('Fill in both fields');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      setError(null);
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
  };

  // ----- COMPONENT RENDERING ----->
  // Renders the login form, including input fields, submit button, and error messages (if any).
  return (
    <form className={styles['login-form']} onSubmit={handleSubmit} noValidate>
      <h2 className={styles['login-form__title']}>Login</h2>

      <input
        name='email'
        type='email'
        placeholder='Email'
        onChange={handleInput}
        className={styles['login-form__input']}
      />

      <input
        name='password'
        type='password'
        placeholder='Password'
        onChange={handleInput}
        className={styles['login-form__input']}
      />

      <Button type='submit' variant='primary'>
        Log In
      </Button>

      {error && <p className={styles['login-form__error-message']}>{error}</p>}
    </form>
  );
}

export default LoginForm;
