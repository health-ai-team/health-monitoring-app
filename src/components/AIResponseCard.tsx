import { Sparkles, ThumbsUp, ThumbsDown, Copy, Clock } from "lucide-react";
import type { ReactNode } from "react";

interface AIResponseCardProps {
  content: string;
  title?: string;
  timestamp?: string;
  confidence?: number;
  actions?: ReactNode;
  isLoading?: boolean;
}

export function AIResponseCard({
  content,
  title = "AI Health Insight",
  timestamp,
  confidence,
  actions: _actions,
  isLoading,
}: AIResponseCardProps) {
  if (isLoading) {
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
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <Sparkles size={18} style={{ color: "var(--color-primary-blue)" }} />
          <span style={{ fontFamily: "var(--font-family-title)", fontWeight: 600, fontSize: "var(--font-size-sm)", color: "var(--color-text-primary)" }}>
            {title}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                height: 12,
                borderRadius: 6,
                background: "var(--color-border-light)",
                width: `${60 + i * 10}%`,
                animation: "shimmer 1.5s ease-in-out infinite",
              }}
            />
          ))}
          <style>{`
            @keyframes shimmer {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 1; }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--color-surface-primary)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border-light)",
        borderLeft: "4px solid var(--color-primary-blue)",
        padding: "var(--space-24)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "var(--radius-sm)",
              background: "var(--color-light-blue)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-primary-blue)",
            }}
          >
            <Sparkles size={16} />
          </div>
          <span
            style={{
              fontFamily: "var(--font-family-title)",
              fontWeight: 600,
              fontSize: "var(--font-size-sm)",
              color: "var(--color-text-primary)",
            }}
          >
            {title}
          </span>
        </div>

        {confidence !== undefined && (
          <span
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-xs)",
              color: "var(--color-text-muted)",
            }}
          >
            {Math.round(confidence * 100)}% confidence
          </span>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          fontFamily: "var(--font-family-body)",
          fontSize: "var(--font-size-sm)",
          color: "var(--color-text-secondary)",
          lineHeight: 1.7,
          whiteSpace: "pre-wrap",
        }}
      >
        {content}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, paddingTop: 12, borderTop: "1px solid var(--color-border-light)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {timestamp && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Clock size={12} style={{ color: "var(--color-text-muted)" }} />
              <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)" }}>
                {timestamp}
              </span>
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button
            style={{
              background: "none",
              border: "none",
              color: "var(--color-text-muted)",
              cursor: "pointer",
              padding: 6,
              borderRadius: "var(--radius-sm)",
              transition: "background var(--transition-fast), color var(--transition-fast)",
            }}
            aria-label="Like"
          >
            <ThumbsUp size={14} />
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              color: "var(--color-text-muted)",
              cursor: "pointer",
              padding: 6,
              borderRadius: "var(--radius-sm)",
              transition: "background var(--transition-fast), color var(--transition-fast)",
            }}
            aria-label="Dislike"
          >
            <ThumbsDown size={14} />
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              color: "var(--color-text-muted)",
              cursor: "pointer",
              padding: 6,
              borderRadius: "var(--radius-sm)",
              transition: "background var(--transition-fast), color var(--transition-fast)",
            }}
            aria-label="Copy"
          >
            <Copy size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
