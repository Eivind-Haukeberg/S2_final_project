import styles from './Button.module.css';

function Button({ type = 'button', variant = 'primary', onClick, children }) {
  const buttonClass = `${styles.button} ${styles[`button--${variant}`]}`;

  return (
    <button type={type} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}

export default Button;
