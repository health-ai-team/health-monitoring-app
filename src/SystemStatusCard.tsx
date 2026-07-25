import { useState, type FC } from "react";

const SystemStatusCard: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {/* Header area — icon + title */}
        <div style={styles.header}>
          <div style={styles.iconBox}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "#22c55e" }}
            >
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <span style={styles.title}>System Status</span>
        </div>

        {/* Status row — pulse dot + label */}
        <div style={styles.statusRow}>
          <div style={styles.dotWrapper}>
            <div style={styles.dot} />
            <div style={styles.dotRipple} />
          </div>
          <div style={styles.statusText}>
            <span style={styles.statusLabel}>GitHub Sync Active</span>
            <span style={styles.statusMeta}>Connected · real-time</span>
          </div>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Counter section */}
        <div style={styles.counterSection}>
          <span style={styles.counterLabel}>Sync Events</span>
          <div style={styles.counterValue}>{count}</div>
          <button
            onClick={() => setCount((c) => c + 1)}
            style={styles.button}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 6px 24px rgba(34, 197, 94, 0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #15803d 0%, #16a34a 100%)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 0 0 0 rgba(34, 197, 94, 0)";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(0.97)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            Record Sync
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Inline styles (no CSS-in-JS library dependency) ── */
const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    width: "100%",
    maxWidth: 380,
  },
  card: {
    background: "var(--bg-card)",
    border: "1px solid var(--border-subtle)",
    borderRadius: 16,
    padding: "24px 24px 20px",
    transition: "border-color 0.25s ease, box-shadow 0.35s ease",
    boxShadow:
      "0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.03)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 18,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: "var(--green-dark)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(34, 197, 94, 0.12)",
  },
  title: {
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: "var(--text-primary)",
  },
  statusRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    borderRadius: 10,
    background: "var(--green-dark)",
    border: "1px solid rgba(34, 197, 94, 0.1)",
  },
  dotWrapper: {
    position: "relative" as const,
    width: 12,
    height: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "var(--green)",
    animation: "pulse-dot 2s ease-in-out infinite",
    position: "relative" as const,
    zIndex: 1,
  },
  dotRipple: {
    position: "absolute" as const,
    width: 10,
    height: 10,
    borderRadius: "50%",
    border: "2px solid var(--green)",
    animation: "pulse-ripple 2s ease-out infinite",
    opacity: 0,
  },
  statusText: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 1,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: "var(--text-primary)",
    letterSpacing: "-0.01em",
  },
  statusMeta: {
    fontSize: 12,
    color: "var(--green)",
    opacity: 0.75,
  },
  divider: {
    height: 1,
    background: "var(--border-subtle)",
    margin: "16px 0",
  },
  counterSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  counterLabel: {
    fontSize: 13,
    fontWeight: 500,
    color: "var(--text-secondary)",
  },
  counterValue: {
    fontSize: 20,
    fontWeight: 700,
    color: "var(--text-primary)",
    fontVariantNumeric: "tabular-nums",
    minWidth: 32,
    textAlign: "center" as const,
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 16px",
    border: "none",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    color: "#fff",
    cursor: "pointer",
    background: "linear-gradient(135deg, #15803d 0%, #16a34a 100%)",
    transition:
      "background 0.2s ease, transform 0.12s ease, box-shadow 0.25s ease",
    boxShadow: "0 0 0 0 rgba(34, 197, 94, 0)",
    outline: "none",
  },
};

export default SystemStatusCard;
