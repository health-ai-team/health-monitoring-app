import { forwardRef, type SelectHTMLAttributes } from "react";
import { AlertCircle, ChevronDown } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: DropdownOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

export const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  ({ label, error, options, placeholder, fullWidth, style, ...props }, ref) => {
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
          <select
            ref={ref}
            style={{
              width: "100%",
              padding: "12px 40px 12px 16px",
              border: `2px solid ${hasError ? "var(--color-error)" : "var(--color-border)"}`,
              borderRadius: "var(--radius-input)",
              background: "var(--color-surface-primary)",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              lineHeight: 1.5,
              outline: "none",
              appearance: "none",
              cursor: "pointer",
              transition: "border-color var(--transition-fast)",
              ...style,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = hasError
                ? "var(--color-error)"
                : "var(--color-border-focus)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = hasError
                ? "var(--color-error)"
                : "var(--color-border)";
            }}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--color-text-muted)",
              pointerEvents: "none",
              display: "flex",
            }}
          >
            <ChevronDown size={18} />
          </div>
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
      </div>
    );
  },
);

Dropdown.displayName = "Dropdown";
