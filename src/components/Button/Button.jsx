// ----- COMPONENT PURPOSE ----->
// This reusable Button component renders a styled button element. It accepts props for button type,
// variant styling, click handler, and child elements.

import styles from './Button.module.css';

function Button({ type = 'button', variant = 'primary', onClick, children }) {
  // ----- DYNAMIC CLASS ASSIGNMENT ----->
  // Combines base button class with a variant-specific class for styling based on the 'variant' prop.
  const buttonClass = `${styles.button} ${styles[`button--${variant}`]}`;

  // ----- COMPONENT RENDERING ----->
  // Renders the button element with appropriate attributes and content.
  return (
    <button type={type} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}

export default Button;
