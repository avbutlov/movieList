import React from "react";
import styles from './Button.module.css'

interface ButtonProps {
  onClick: () => void;
  text: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, children, disabled }) => {
  return (
    <button disabled={disabled} className={styles.btn} onClick={onClick}>
      {text}
      {children}
    </button>
  );
};

export default Button;
