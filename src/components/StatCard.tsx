import type { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    direction: "up" | "down";
    label?: string;
  };
  variant?: "primary" | "green" | "blue" | "amber";
}

const variantAccents = {
  primary: { bg: "var(--color-light-blue)", color: "var(--color-primary-blue)" },
  green: { bg: "var(--color-light-green)", color: "var(--color-primary-green)" },
  blue: { bg: "#dbeafe", color: "#2563eb" },
  amber: { bg: "#fef3c7", color: "#d97706" },
};

export function StatCard({
  label,
  value,
  icon,
  trend,
  variant = "primary",
}: StatCardProps) {
  const accent = variantAccents[variant];

  return (
    <div
      style={{
        background: "var(--color-surface-primary)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border-light)",
        padding: "var(--space-24)",
        transition: "box-shadow var(--transition-base), transform var(--transition-fast)",
        cursor: "default",
        boxShadow: "var(--shadow-sm)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "var(--radius-sm)",
            background: accent.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: accent.color,
          }}
        >
          {icon}
        </div>

        {trend && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 8px",
              borderRadius: "var(--radius-full)",
              background: trend.direction === "up" ? "var(--color-light-green)" : "#fee2e2",
              fontSize: "var(--font-size-xs)",
              fontWeight: 600,
              fontFamily: "var(--font-family-body)",
              color: trend.direction === "up" ? "var(--color-primary-green)" : "var(--color-error)",
            }}
          >
            {trend.direction === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend.value}%
          </div>
        )}
      </div>

      <span
        style={{
          fontFamily: "var(--font-family-body)",
          fontSize: "var(--font-size-sm)",
          color: "var(--color-text-muted)",
          display: "block",
          marginBottom: 4,
        }}
      >
        {label}
      </span>

      <span
        style={{
          fontFamily: "var(--font-family-title)",
          fontSize: "var(--font-size-3xl)",
          fontWeight: 700,
          color: "var(--color-text-primary)",
          letterSpacing: "var(--letter-spacing-tight)",
          display: "block",
        }}
      >
        {value}
      </span>

      {trend?.label && (
        <span
          style={{
            fontFamily: "var(--font-family-body)",
            fontSize: "var(--font-size-xs)",
            color: "var(--color-text-muted)",
            marginTop: 4,
            display: "block",
          }}
        >
          {trend.label}
        </span>
      )}
    </div>
  );
}
