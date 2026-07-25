import type { ReactNode } from "react";

interface NotificationBadgeProps {
  count: number;
  variant?: "primary" | "danger" | "success" | "warning";
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
  maxCount?: number;
  dot?: boolean;
}

const variantColors = {
  primary: "var(--color-primary-blue)",
  danger: "var(--color-error)",
  success: "var(--color-primary-green)",
  warning: "var(--color-warning)",
};

const sizeMap: Record<string, { badge: number; font: number }> = {
  sm: { badge: 16, font: 9 },
  md: { badge: 20, font: 11 },
  lg: { badge: 24, font: 12 },
};

export function NotificationBadge({
  count,
  variant = "danger",
  size = "md",
  children,
  maxCount = 99,
  dot,
}: NotificationBadgeProps) {
  const dims = sizeMap[size];
  const showBadge = dot || count > 0;

  if (!children) {
    // Standalone badge
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: dims.badge,
          height: dims.badge,
          borderRadius: "var(--radius-full)",
          background: variantColors[variant],
          color: "#fff",
          fontSize: dims.font,
          fontWeight: 700,
          fontFamily: "var(--font-family-body)",
          padding: dot ? 0 : "0 4px",
          lineHeight: 1,
          boxShadow: "0 0 0 2px var(--color-surface-primary)",
        }}
      >
        {dot ? null : count > maxCount ? `${maxCount}+` : count}
      </div>
    );
  }

  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      {children}
      {showBadge && (
        <div
          style={{
            position: "absolute",
            top: -4,
            right: -4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: dims.badge,
            height: dims.badge,
            borderRadius: "var(--radius-full)",
            background: variantColors[variant],
            color: "#fff",
            fontSize: dims.font,
            fontWeight: 700,
            fontFamily: "var(--font-family-body)",
            padding: dot ? 0 : "0 4px",
            lineHeight: 1,
            boxShadow: "0 0 0 2px var(--color-surface-primary)",
            pointerEvents: "none",
          }}
        >
          {dot ? null : count > maxCount ? `${maxCount}+` : count}
        </div>
      )}
    </div>
  );
}
