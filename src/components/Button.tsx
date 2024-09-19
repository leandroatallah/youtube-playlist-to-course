import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({
  children,
  style,
  type = "button",
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      style={{
        border: 0,
        height: 40,
        backgroundColor: "var(--primary)",
        opacity: !disabled ? 1 : 0.5,
        color: "#fff",
        fontSize: 14,
        fontWeight: 700,
        cursor: !disabled ? "pointer" : "default",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};
