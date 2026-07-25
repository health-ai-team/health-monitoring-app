import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { width: 32, height: 32, iconSize: 16 },
  md: { width: 40, height: 40, iconSize: 20 },
  lg: { width: 48, height: 48, iconSize: 24 },
};

const variantStyles = {
  primary: {
    background: "var(--color-primary-blue)",
    color: "#fff",
    border: "none",
  },
  secondary: {
    background: "transparent",
    color: "var(--color-primary-blue)",
    border: "2px solid var(--color-primary-blue)",
  },
  ghost: {
    background: "transparent",
    color: "var(--color-text-secondary)",
    border: "none",
  },
};

export function IconButton({
  icon,
  label,
  variant = "ghost",
  size = "md",
  disabled,
  style,
  ...props
}: IconButtonProps) {
  const dims = sizeMap[size];
  const v = variantStyles[variant];

  return (
    <button
      aria-label={label}
      title={label}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dims.width,
        height: dims.height,
        borderRadius: "var(--radius-sm)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "all var(--transition-fast)",
        ...v,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && variant === "ghost") {
          e.currentTarget.style.background = "var(--color-surface-secondary)";
        }
        if (!disabled) e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        if (variant === "ghost") e.currentTarget.style.background = "transparent";
        e.currentTarget.style.transform = "scale(1)";
      }}
      {...props}
    >
      {icon}
    </button>
  );
}
