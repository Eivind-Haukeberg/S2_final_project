import { useState } from 'react';
import { auth } from '../../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from './LoginForm.module.css';

function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

  return (
    <form className={styles['login-form']} onSubmit={handleSubmit}>
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

      <button type='submit' className={styles['login-form__submit-button']}>
        Log In
      </button>

      {error && <p className={styles['login-form__error-message']}>{error}</p>}
    </form>
  );
}

export default LoginForm;
