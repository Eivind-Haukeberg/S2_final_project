import { useState } from 'react';
import { auth, db } from '../../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import styles from './RegisterForm.module.css';
import Button from '../Button/Button';

function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
