import { ButtonHTMLAttributes } from "react";

import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

export const Button = ({
  children,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) => {
  const classVariant = {
    primary: "button--primary",
    outline: "button--outline",
  };

  return (
    <button
      type={type}
      className={`${styles.button} ${styles[classVariant[variant]]}`}
      {...props}
    >
      {children}
    </button>
  );
};
