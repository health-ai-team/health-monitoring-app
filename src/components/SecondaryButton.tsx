import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function SecondaryButton({
  children,
  loading,
  icon,
  fullWidth,
  disabled,
  style,
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "12px 24px",
        border: "2px solid var(--color-primary-blue)",
        borderRadius: "var(--radius-button)",
        background: "transparent",
        color: "var(--color-primary-blue)",
        fontFamily: "var(--font-family-body)",
        fontSize: "var(--font-size-sm)",
        fontWeight: 600,
        lineHeight: 1,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? "100%" : undefined,
        transition: "all var(--transition-fast)",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.background = "var(--color-light-blue)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.transform = "translateY(0)";
      }}
      {...props}
    >
      {loading ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : icon}
      {children}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}
