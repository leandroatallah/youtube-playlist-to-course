import { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  icon?: ReactNode;
}

export const Button = ({
  children,
  type = "button",
  variant = "primary",
  icon,
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
      {icon}
    </button>
  );
};
