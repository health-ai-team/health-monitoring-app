import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}

interface PrimaryButtonProps extends ButtonBaseProps {
  variant?: "primary";
}

export function PrimaryButton({
  children,
  loading,
  icon,
  fullWidth,
  disabled,
  style,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "12px 24px",
        border: "none",
        borderRadius: "var(--radius-button)",
        background: "linear-gradient(135deg, var(--color-primary-blue), #0a7a9e)",
        color: "#fff",
        fontFamily: "var(--font-family-body)",
        fontSize: "var(--font-size-sm)",
        fontWeight: 600,
        lineHeight: 1,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? "100%" : undefined,
        transition: "all var(--transition-fast)",
        boxShadow: "0 2px 8px rgba(9, 93, 126, 0.25)",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(9, 93, 126, 0.35)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(9, 93, 126, 0.25)";
      }}
      {...props}
    >
      {loading ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : icon}
      {children}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}
