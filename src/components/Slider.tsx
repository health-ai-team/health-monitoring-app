import { type InputHTMLAttributes } from "react";

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  showValue?: boolean;
  valueSuffix?: string;
}

export function Slider({
  label,
  showValue = true,
  valueSuffix = "",
  value,
  min = 0,
  max = 100,
  style,
  ...props
}: SliderProps) {
  const percent = ((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        ...style,
      }}
    >
      {(label || showValue) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {label && (
            <span
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-sm)",
                fontWeight: 500,
                color: "var(--color-text-primary)",
              }}
            >
              {label}
            </span>
          )}
          {showValue && (
            <span
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-sm)",
                fontWeight: 600,
                color: "var(--color-primary-blue)",
              }}
            >
              {value}
              {valueSuffix}
            </span>
          )}
        </div>
      )}

      <div style={{ position: "relative", height: 6 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 3,
            background: "var(--color-border-light)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${percent}%`,
            borderRadius: 3,
            background: "var(--color-primary-blue)",
            transition: "width var(--transition-fast)",
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          value={value}
          style={{
            position: "absolute",
            inset: -6,
            width: "calc(100% + 12px)",
            margin: -6,
            opacity: 0,
            cursor: "pointer",
          }}
          {...props}
        />

        <div
          style={{
            position: "absolute",
            left: `${percent}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "var(--color-primary-blue)",
            border: "3px solid var(--color-surface-primary)",
            boxShadow: "var(--shadow-sm)",
            pointerEvents: "none",
            transition: "left var(--transition-fast)",
          }}
        />
      </div>
    </div>
  );
}
