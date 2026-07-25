import type { ReactNode } from "react";
import { Clock } from "lucide-react";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  color?: string;
  metadata?: { label: string; value: string }[];
}

interface TimelineProps {
  events: TimelineEvent[];
  variant?: "default" | "compact";
}

const defaultColor = "var(--color-primary-blue)";

export function Timeline({ events, variant = "default" }: TimelineProps) {
  const isCompact = variant === "compact";

  return (
    <div
      style={{
        position: "relative",
        paddingLeft: isCompact ? 20 : 28,
      }}
    >
      {/* Vertical line */}
      <div
        style={{
          position: "absolute",
          left: 10,
          top: 4,
          bottom: 4,
          width: 2,
          background: "var(--color-border-light)",
        }}
      />

      {events.map((event, index) => {
        const color = event.color || defaultColor;
        const isLast = index === events.length - 1;

        return (
          <div
            key={event.id}
            style={{
              position: "relative",
              paddingBottom: isLast ? 0 : isCompact ? 16 : 24,
            }}
          >
            {/* Dot */}
            <div
              style={{
                position: "absolute",
                left: -28,
                top: isCompact ? 2 : 4,
                width: isCompact ? 10 : 14,
                height: isCompact ? 10 : 14,
                borderRadius: "50%",
                background: color,
                border: isCompact
                  ? "2px solid var(--color-surface-primary)"
                  : "3px solid var(--color-surface-primary)",
                boxShadow: "var(--shadow-sm)",
                zIndex: 1,
              }}
            />

            {/* Content */}
            <div
              style={{
                background: "var(--color-surface-primary)",
                borderRadius: "var(--radius-card)",
                border: "1px solid var(--color-border-light)",
                padding: isCompact ? "var(--space-12)" : "var(--space-16)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {/* Date */}
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: isCompact ? 4 : 8 }}>
                <Clock size={12} style={{ color: "var(--color-text-muted)" }} />
                <span
                  style={{
                    fontFamily: "var(--font-family-body)",
                    fontSize: "var(--font-size-xs)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {event.date}
                </span>
              </div>

              {/* Title + Icon */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {event.icon && (
                  <div style={{ flexShrink: 0, color }}>{event.icon}</div>
                )}
                <h5
                  style={{
                    fontFamily: "var(--font-family-title)",
                    fontSize: isCompact ? "var(--font-size-sm)" : "var(--font-size-base)",
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                    margin: 0,
                  }}
                >
                  {event.title}
                </h5>
              </div>

              {event.description && (
                <p
                  style={{
                    fontFamily: "var(--font-family-body)",
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-text-secondary)",
                    margin: "4px 0 0",
                    lineHeight: 1.5,
                  }}
                >
                  {event.description}
                </p>
              )}

              {/* Metadata tags */}
              {event.metadata && (
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    marginTop: 8,
                  }}
                >
                  {event.metadata.map((m) => (
                    <div
                      key={m.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "2px 8px",
                        borderRadius: "var(--radius-full)",
                        background: "var(--color-surface-secondary)",
                        fontFamily: "var(--font-family-body)",
                        fontSize: "var(--font-size-xs)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>{m.label}:</span>
                      <span style={{ fontWeight: 600, color: "var(--color-text-secondary)" }}>{m.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
