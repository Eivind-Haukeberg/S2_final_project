// ----- COMPONENT PURPOSE ----->
// This component renders a registration form that allows users to sign up using Firebase Authentication.
// It collects user data, validates it, creates a new user, and stores the user's information in Firestore.

import { useState } from 'react';
import { auth, db } from '../../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import styles from './RegisterForm.module.css';
import Button from '../Button/Button';

function RegisterForm() {
  // ----- STATE MANAGEMENT ----->
  // Manages form input values, error messages, and success feedback.
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // ----- HANDLE INPUT CHANGES ----->
  // Updates the form state when the user types into any of the input fields.
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ----- HANDLE FORM SUBMISSION ----->
  // Validates input, creates a user in Firebase Auth, and stores their info in Firestore.
  // Displays error messages for invalid input or registration failures.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.country) {
      setError('All fields are required');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        name: form.name,
        email: form.email,
        country: form.country,
        myList: [],
      });

      setSuccess('Registration successful!');
      setError(null);
      setForm({ name: '', email: '', password: '', country: '' });
    } catch (err) {
      setError('Registration failed: ' + err.message);
    }
  };

  // ----- COMPONENT RENDERING ----->
  // Renders the registration form, input fields, submit button, and displays error/success messages.
  return (
    <form className={styles['register-form']} onSubmit={handleSubmit}>
      <h2 className={styles['register-form__title']}>Register</h2>

      <input
        name='name'
        type='text'
        placeholder='Name'
        value={form.name}
        onChange={handleInput}
        className={styles['register-form__input']}
      />
      <input
        name='email'
        type='email'
        placeholder='Email'
        value={form.email}
        onChange={handleInput}
        className={styles['register-form__input']}
      />
      <input
        name='password'
        type='password'
        placeholder='Password'
        value={form.password}
        onChange={handleInput}
        className={styles['register-form__input']}
      />
      <input
        name='country'
        type='text'
        placeholder='Country'
        value={form.country}
        onChange={handleInput}
        className={styles['register-form__input']}
      />

      <Button type='submit' variant='primary'>
        Register
      </Button>

      {error && (
        <p className={styles['register-form__error-message']}>{error}</p>
      )}
      {success && (
        <p className={styles['register-form__success-message']}>{success}</p>
      )}
    </form>
  );
}

export default RegisterForm;
