interface ProgressIndicatorProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  variant?: "primary" | "success" | "warning" | "danger";
  size?: "sm" | "md";
  animated?: boolean;
}

const variantColors = {
  primary: "var(--color-primary-blue)",
  success: "var(--color-primary-green)",
  warning: "var(--color-warning)",
  danger: "var(--color-error)",
};

const heightMap = { sm: 6, md: 10 };

export function ProgressIndicator({
  value,
  max = 100,
  label,
  showPercentage = true,
  variant = "primary",
  size = "md",
  animated = true,
}: ProgressIndicatorProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const barHeight = heightMap[size];

  return (
    <div style={{ width: "100%" }}>
      {(label || showPercentage) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          {label && (
            <span
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-sm)",
                fontWeight: 500,
                color: "var(--color-text-secondary)",
              }}
            >
              {label}
            </span>
          )}
          {showPercentage && (
            <span
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-xs)",
                fontWeight: 600,
                color: "var(--color-text-primary)",
              }}
            >
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div
        style={{
          width: "100%",
          height: barHeight,
          borderRadius: barHeight / 2,
          background: "var(--color-border-light)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${percentage}%`,
            borderRadius: barHeight / 2,
            background: variantColors[variant],
            transition: animated ? "width 0.5s ease" : "none",
          }}
        />
      </div>
    </div>
  );
}
