import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, helperText, icon, fullWidth, style, ...props }, ref) => {
    const hasError = !!error;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          width: fullWidth ? "100%" : undefined,
        }}
      >
        {label && (
          <label
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              fontWeight: 500,
              color: "var(--color-text-primary)",
            }}
          >
            {label}
          </label>
        )}

        <div style={{ position: "relative" }}>
          {icon && (
            <div
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--color-text-muted)",
                pointerEvents: "none",
                display: "flex",
              }}
            >
              {icon}
            </div>
          )}

          <input
            ref={ref}
            style={{
              width: "100%",
              padding: icon ? "12px 16px 12px 40px" : "12px 16px",
              border: `2px solid ${hasError ? "var(--color-error)" : "var(--color-border)"}`,
              borderRadius: "var(--radius-input)",
              background: "var(--color-surface-primary)",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              lineHeight: 1.5,
              outline: "none",
              transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
              ...style,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = hasError
                ? "var(--color-error)"
                : "var(--color-border-focus)";
              e.currentTarget.style.boxShadow = hasError
                ? "0 0 0 3px rgba(239, 68, 68, 0.15)"
                : "0 0 0 3px rgba(9, 93, 126, 0.12)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = hasError
                ? "var(--color-error)"
                : "var(--color-border)";
              e.currentTarget.style.boxShadow = "none";
            }}
            {...props}
          />
        </div>

        {hasError && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              color: "var(--color-error)",
              fontSize: "var(--font-size-xs)",
            }}
          >
            <AlertCircle size={12} />
            <span>{error}</span>
          </div>
        )}

        {helperText && !hasError && (
          <span
            style={{
              fontSize: "var(--font-size-xs)",
              color: "var(--color-text-muted)",
            }}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

InputField.displayName = "InputField";
