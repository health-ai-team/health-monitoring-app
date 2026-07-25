import { forwardRef, type InputHTMLAttributes } from "react";

interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ label, style, ...props }, ref) => {
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
        <div style={{ position: "relative", width: 20, height: 20, flexShrink: 0 }}>
          <input
            ref={ref}
            type="radio"
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
              borderRadius: "50%",
              border: "2px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color var(--transition-fast)",
            }}
            className="radio-circle"
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "var(--color-primary-blue)",
                opacity: 0,
                transform: "scale(0)",
                transition: "all var(--transition-fast)",
              }}
              className="radio-dot"
            />
          </div>

          <style>{`
            input[type="radio"]:checked ~ .radio-circle {
              border-color: var(--color-primary-blue);
            }
            input[type="radio"]:checked ~ .radio-circle .radio-dot {
              opacity: 1;
              transform: scale(1);
            }
            input[type="radio"]:focus-visible ~ .radio-circle {
              box-shadow: 0 0 0 3px rgba(9, 93, 126, 0.12);
            }
          `}</style>
        </div>

        {label}
      </label>
    );
  },
);

RadioButton.displayName = "RadioButton";
