import { AlertTriangle, AlertCircle, Info, CheckCircle, X } from "lucide-react";
import type { ReactNode } from "react";

interface AlertCardProps {
  title: string;
  description?: string;
  severity?: "critical" | "warning" | "info" | "success";
  timestamp?: string;
  action?: { label: string; onClick: () => void };
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode;
}

const severityConfig: Record<string, { icon: ReactNode; bg: string; border: string; color: string }> = {
  critical: {
    icon: <AlertCircle size={20} />,
    bg: "#fef2f2",
    border: "var(--color-error)",
    color: "var(--color-error)",
  },
  warning: {
    icon: <AlertTriangle size={20} />,
    bg: "#fffbeb",
    border: "var(--color-warning)",
    color: "#d97706",
  },
  info: {
    icon: <Info size={20} />,
    bg: "var(--color-light-blue)",
    border: "var(--color-primary-blue)",
    color: "var(--color-primary-blue)",
  },
  success: {
    icon: <CheckCircle size={20} />,
    bg: "var(--color-light-green)",
    border: "var(--color-primary-green)",
    color: "var(--color-primary-green)",
  },
};

export function AlertCard({
  title,
  description,
  severity = "info",
  timestamp,
  action,
  dismissible,
  onDismiss,
  icon,
}: AlertCardProps) {
  const sev = severityConfig[severity];

  return (
    <div
      style={{
        borderRadius: "var(--radius-card)",
        background: sev.bg,
        border: `1px solid ${sev.border}`,
        padding: "var(--space-16)",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
      }}
    >
      {/* Icon */}
      <div style={{ flexShrink: 0, paddingTop: 2, color: sev.color }}>
        {icon || sev.icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <h5
            style={{
              fontFamily: "var(--font-family-title)",
              fontSize: "var(--font-size-sm)",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              margin: 0,
            }}
          >
            {title}
          </h5>

          {dismissible && onDismiss && (
            <button
              onClick={onDismiss}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--color-text-muted)",
                padding: 2,
                flexShrink: 0,
              }}
              aria-label="Dismiss alert"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {description && (
          <p
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-xs)",
              color: "var(--color-text-secondary)",
              margin: "4px 0 0",
            }}
          >
            {description}
          </p>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
          {timestamp && (
            <span
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-xs)",
                color: "var(--color-text-muted)",
              }}
            >
              {timestamp}
            </span>
          )}
          {action && (
            <button
              onClick={action.onClick}
              style={{
                background: "none",
                border: "none",
                color: sev.color,
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-xs)",
                fontWeight: 600,
                cursor: "pointer",
                padding: 0,
              }}
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
