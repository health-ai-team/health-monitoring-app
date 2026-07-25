import type { ReactNode } from "react";

interface HealthCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: ReactNode;
  status?: "normal" | "elevated" | "low" | "critical" | "high";
  range?: { min: number; max: number };
  trend?: "up" | "down" | "stable";
  subtitle?: string;
}

const statusStyles: Record<string, { bg: string; color: string; label: string }> = {
  normal: { bg: "var(--color-light-green)", color: "var(--color-primary-green)", label: "Normal" },
  elevated: { bg: "#fef3c7", color: "#d97706", label: "Elevated" },
  high: { bg: "#fee2e2", color: "#dc2626", label: "High" },
  low: { bg: "#dbeafe", color: "#2563eb", label: "Low" },
  critical: { bg: "#fce7f3", color: "#e11d48", label: "Critical" },
};

const trendIcons: Record<string, string> = {
  up: "↑",
  down: "↓",
  stable: "→",
};

export function HealthCard({
  title,
  value,
  unit,
  icon,
  status = "normal",
  range,
  trend,
  subtitle,
}: HealthCardProps) {
  const statusInfo = statusStyles[status];

  return (
    <div
      style={{
        background: "var(--color-surface-primary)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border-light)",
        padding: "var(--space-20) var(--space-24)",
        transition: "box-shadow var(--transition-base)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "var(--radius-sm)",
              background: statusInfo.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: statusInfo.color,
            }}
          >
            {icon}
          </div>
          <span
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              fontWeight: 500,
              color: "var(--color-text-secondary)",
            }}
          >
            {title}
          </span>
        </div>

        <span
          style={{
            padding: "2px 8px",
            borderRadius: "var(--radius-full)",
            background: statusInfo.bg,
            color: statusInfo.color,
            fontSize: "var(--font-size-xs)",
            fontWeight: 600,
            fontFamily: "var(--font-family-body)",
          }}
        >
          {statusInfo.label}
        </span>
      </div>

      {/* Value */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: range ? 12 : 0 }}>
        <span
          style={{
            fontFamily: "var(--font-family-title)",
            fontSize: "var(--font-size-3xl)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            letterSpacing: "var(--letter-spacing-tight)",
            lineHeight: 1,
          }}
        >
          {value}
        </span>
        {unit && (
          <span
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-base)",
              color: "var(--color-text-muted)",
              fontWeight: 500,
            }}
          >
            {unit}
          </span>
        )}
        {trend && (
          <span
            style={{
              marginLeft: "auto",
              fontSize: "var(--font-size-sm)",
              color: trend === "up" ? "var(--color-error)" : trend === "down" ? "var(--color-primary-green)" : "var(--color-text-muted)",
              fontWeight: 600,
            }}
          >
            {trendIcons[trend]}
          </span>
        )}
      </div>

      {/* Range bar */}
      {range && (
        <div>
          <div
            style={{
              width: "100%",
              height: 4,
              borderRadius: 2,
              background: "var(--color-border-light)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "25%",
                right: "25%",
                height: "100%",
                borderRadius: 2,
                background: "var(--color-primary-green)",
                opacity: 0.3,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 4,
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-xs)",
              color: "var(--color-text-muted)",
            }}
          >
            <span>{range.min}</span>
            <span>Normal range</span>
            <span>{range.max}</span>
          </div>
        </div>
      )}

      {subtitle && (
        <span
          style={{
            fontFamily: "var(--font-family-body)",
            fontSize: "var(--font-size-xs)",
            color: "var(--color-text-muted)",
            marginTop: 4,
            display: "block",
          }}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
}
