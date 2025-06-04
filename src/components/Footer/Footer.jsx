import styles from './Footer.module.css';
import tmdbLogo from '../../assets/logo/TMDB.svg'; // Adjust path if needed

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>&copy; 2025 OneApp</p>
        <div className={styles.links}>
          <a
            href='https://www.themoviedb.org/'
            target='_blank'
            rel='noopener noreferrer'>
            <img src={tmdbLogo} alt='TMDB Logo' className={styles.tmdbLogo} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
