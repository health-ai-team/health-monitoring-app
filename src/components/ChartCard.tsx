import type { ReactNode } from "react";
import { MoreHorizontal } from "lucide-react";

interface ChartLegend {
  label: string;
  color: string;
}

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  legend?: ChartLegend[];
  actions?: ReactNode;
  height?: number;
}

export function ChartCard({
  title,
  subtitle,
  children,
  legend,
  actions,
  height = 200,
}: ChartCardProps) {
  return (
    <div
      style={{
        background: "var(--color-surface-primary)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border-light)",
        padding: "var(--space-24)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <h4
            style={{
              fontFamily: "var(--font-family-title)",
              fontSize: "var(--font-size-base)",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              margin: 0,
            }}
          >
            {title}
          </h4>
          {subtitle && (
            <span
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-xs)",
                color: "var(--color-text-muted)",
              }}
            >
              {subtitle}
            </span>
          )}
        </div>

        {actions || (
          <button
            style={{
              background: "none",
              border: "none",
              color: "var(--color-text-muted)",
              cursor: "pointer",
              padding: 4,
            }}
            aria-label="More options"
          >
            <MoreHorizontal size={18} />
          </button>
        )}
      </div>

      {/* Chart area */}
      <div
        style={{
          height,
          borderRadius: "var(--radius-sm)",
          background: "var(--color-surface-secondary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          marginBottom: legend ? 12 : 0,
        }}
      >
        {children || (
          <span
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              color: "var(--color-text-muted)",
            }}
          >
            Chart area
          </span>
        )}
      </div>

      {/* Legend */}
      {legend && (
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {legend.map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 3,
                  background: item.color,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-family-body)",
                  fontSize: "var(--font-size-xs)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
