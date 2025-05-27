import { useState } from 'react';
import { auth, db } from '../../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

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
    <form className='login-form' onSubmit={handleSubmit}>
      <h2 className='login-form__title'>Login</h2>

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
      <button type='submit'>Login</button>

      {error && <p className='login-form__error'>{error}</p>}
    </form>
  );
}

export default LoginForm;
