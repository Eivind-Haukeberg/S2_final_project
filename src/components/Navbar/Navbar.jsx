import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/OneApp_logo.svg';
import styles from './Navbar.module.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles['navigation-bar']}>
      <div className={styles['navigation-bar__container']}>
        <Link to='/' className={styles['navigation-bar__logo']}>
          <img
            src={logo}
            alt='OneApp Logo'
            className={styles['navigation-bar__logo-image']}
          />
        </Link>

        <button
          className={styles['navigation-bar__burger']}
          onClick={() => setIsMenuOpen((prev) => !prev)}>
          ☰
        </button>

        <div
          className={`${styles['navigation-bar__links']} ${
            isMenuOpen ? styles['navigation-bar__links--open'] : ''
          }`}>
          <Link
            to='/my-page'
            className={styles['navigation-bar__link']}
            onClick={() => setIsMenuOpen(false)}>
            My Page
          </Link>
          <Link
            to='/admin'
            className={styles['navigation-bar__link']}
            onClick={() => setIsMenuOpen(false)}>
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
