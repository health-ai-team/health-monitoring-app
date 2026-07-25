import { forwardRef, type TextareaHTMLAttributes } from "react";
import { AlertCircle } from "lucide-react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  resize?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, fullWidth, resize = true, style, ...props }, ref) => {
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

        <textarea
          ref={ref}
          style={{
            width: "100%",
            minHeight: 100,
            padding: "12px 16px",
            border: `2px solid ${hasError ? "var(--color-error)" : "var(--color-border)"}`,
            borderRadius: "var(--radius-input)",
            background: "var(--color-surface-primary)",
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-family-body)",
            fontSize: "var(--font-size-sm)",
            lineHeight: 1.5,
            resize: resize ? "vertical" : "none",
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

Textarea.displayName = "Textarea";
