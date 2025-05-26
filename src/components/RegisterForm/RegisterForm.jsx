import { useState } from 'react';
import { auth, db } from '../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

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
      });

      setSuccess('User registered!');
      setError(null);
    } catch (err) {
      setError('Registration failed: ' + err.message);
    }
  };

  return (
    <form className='register-form' onSubmit={handleSubmit}>
      <h2 className='register-form__title'>Register</h2>

      <input
        name='name'
        type='text'
        placeholder='Full name'
        onChange={handleInput}
      />
      <input
        name='email'
        type='email'
        placeholder='Email'
        onChange={handleInput}
      />
      <input
        name='password'
        type='password'
        placeholder='Password'
        onChange={handleInput}
      />
      <input
        name='country'
        type='text'
        placeholder='Country'
        onChange={handleInput}
      />

      <button type='submit'>Sign Up</button>

      {error && <p className='register-form__error'>{error}</p>}
      {success && <p className='register-form__success'>{success}</p>}
    </form>
  );
}

export default RegisterForm;
