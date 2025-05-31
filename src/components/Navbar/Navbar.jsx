import { Link } from 'react-router-dom';
import logo from '../../assets/logo/OneApp_logo.svg';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles['navigation-bar']}>
      <div className={styles['navigation-bar__logo']}>
        <img
          src={logo}
          alt='OneApp Logo'
          className={styles['navigation-bar__logo-image']}
        />
      </div>
      <div className={styles['navigation-bar__links']}>
        <Link to='/' className={styles['navigation-bar__link']}>
          Home
        </Link>
        <Link to='/my-page' className={styles['navigation-bar__link']}>
          My Page
        </Link>
        <Link to='/admin' className={styles['navigation-bar__link']}>
          Admin
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
