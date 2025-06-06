// ----- COMPONENT PURPOSE ----->
// This component renders the top navigation bar, including the logo and links to "My Page" and "Admin".
// It includes a responsive burger menu for toggling navigation visibility on smaller screens.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/OneApp_logo.svg';
import styles from './Navbar.module.css';

function Navbar() {
  // ----- STATE MANAGEMENT ----->
  // Manages the toggle state for opening and closing the burger menu.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ----- COMPONENT RENDERING ----->
  // Renders the navigation bar with a logo link and a collapsible menu containing navigation links.
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
