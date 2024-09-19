import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

export const Button = ({
  children,
  style,
  type = "button",
  disabled = false,
  variant = "primary",
  ...props
}: ButtonProps) => {
  const bgVariant = {
    primary: "var(--primary)",
    outline: "unset",
  };

  return (
    <button
      type={type}
      style={{
        border: "2px solid var(--primary)",
        borderRadius: 4,
        height: 40,
        backgroundColor: bgVariant[variant],
        opacity: !disabled ? 1 : 0.5,
        color: "#fff",
        fontSize: 14,
        fontWeight: 700,
        cursor: !disabled ? "pointer" : "default",
        padding: "0 16px",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};
