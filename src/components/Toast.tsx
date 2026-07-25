import { useEffect, useState, type ReactNode } from "react";
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastProps {
  message: string;
  description?: string;
  variant?: "success" | "error" | "warning" | "info";
  duration?: number;
  onDismiss?: () => void;
  action?: ToastAction;
  icon?: ReactNode;
}

const variantIcons = {
  success: <CheckCircle size={20} style={{ color: "var(--color-primary-green)" }} />,
  error: <AlertCircle size={20} style={{ color: "var(--color-error)" }} />,
  warning: <AlertTriangle size={20} style={{ color: "var(--color-warning)" }} />,
  info: <Info size={20} style={{ color: "var(--color-primary-blue)" }} />,
};

const variantBorders = {
  success: "2px solid var(--color-primary-green)",
  error: "2px solid var(--color-error)",
  warning: "2px solid var(--color-warning)",
  info: "2px solid var(--color-primary-blue)",
};

export function Toast({
  message,
  description,
  variant = "info",
  duration = 5000,
  onDismiss,
  action,
  icon,
}: ToastProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        setVisible(false);
        onDismiss?.();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onDismiss]);

  if (!visible) return null;

  return (
    <div
      role="alert"
      style={{
        position: "relative",
        minWidth: 320,
        maxWidth: 420,
        borderRadius: "var(--radius-card)",
        background: "var(--color-surface-primary)",
        border: variantBorders[variant],
        boxShadow: "var(--shadow-lg)",
        padding: "var(--space-16)",
        overflow: "hidden",
        animation: "toast-slide-in 0.3s ease-out",
      }}
    >
      {/* Progress bar */}
      {duration > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: 3,
            background: `var(--color-${variant === "info" ? "primary-blue" : variant === "success" ? "primary-green" : variant === "warning" ? "warning" : "error"})`,
            opacity: 0.3,
            width: `${progress}%`,
            transition: "width 0.1s linear",
          }}
        />
      )}

      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        {/* Icon */}
        <div style={{ flexShrink: 0, paddingTop: 2 }}>
          {icon || variantIcons[variant]}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              margin: 0,
            }}
          >
            {message}
          </p>
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

          {action && (
            <button
              onClick={action.onClick}
              style={{
                marginTop: 8,
                background: "none",
                border: "none",
                color: "var(--color-primary-blue)",
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

        {/* Close */}
        <button
          onClick={() => {
            setVisible(false);
            onDismiss?.();
          }}
          style={{
            flexShrink: 0,
            background: "none",
            border: "none",
            color: "var(--color-text-muted)",
            cursor: "pointer",
            padding: 2,
            display: "flex",
          }}
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      </div>

      <style>{`
        @keyframes toast-slide-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
