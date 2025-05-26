import { Link } from 'react-router-dom';
import logo from '../../assets/logo/OneApp_logo.svg';
import './Navbar.css';

function Navbar() {
  return (
    <nav className='navigation-bar'>
      <div className='navigation-bar__logo'>
        <img src={logo} alt='OneApp Logo' className='logo-image' />
      </div>
      <div className='navigation-bar__links'>
        <Link to='/' className='navigation-bar__link'>
          Home
        </Link>
        <Link to='/my-page' className='navigation-bar__link'>
          My Page
        </Link>
        <Link to='/admin' className='navigation-bar__link'>
          Admin
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
