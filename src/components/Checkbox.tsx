import { forwardRef, type InputHTMLAttributes } from "react";
import { Check, Minus } from "lucide-react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, indeterminate, checked, style, ...props }, ref) => {
    const isChecked = checked || indeterminate;

    return (
      <label
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
          fontFamily: "var(--font-family-body)",
          fontSize: "var(--font-size-sm)",
          color: "var(--color-text-primary)",
          userSelect: "none",
          ...style,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 20,
            height: 20,
            flexShrink: 0,
          }}
        >
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            style={{
              position: "absolute",
              opacity: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
              margin: 0,
            }}
            {...props}
          />

          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              border: `2px solid ${isChecked ? "var(--color-primary-blue)" : "var(--color-border)"}`,
              background: isChecked ? "var(--color-primary-blue)" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all var(--transition-fast)",
            }}
          >
            {indeterminate ? (
              <Minus size={12} color="#fff" strokeWidth={3} />
            ) : checked ? (
              <Check size={12} color="#fff" strokeWidth={3} />
            ) : null}
          </div>
        </div>

        {label}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
