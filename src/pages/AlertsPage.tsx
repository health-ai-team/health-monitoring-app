import { useState } from "react";
import { ArrowLeft, Bell, CheckCircle } from "lucide-react";
import { AlertCard } from "../components/AlertCard";

interface AlertsPageProps {
  onBack: () => void;
}

const allAlerts = [
  {
    id: "1",
    severity: "critical" as const,
    title: "High Blood Pressure Alert",
    description: "Your latest reading (142/96 mmHg) is in Stage 2 Hypertension. Please contact your doctor immediately.",
    timestamp: "30 minutes ago",
    read: false,
  },
  {
    id: "2",
    severity: "warning" as const,
    title: "Missed Medication",
    description: "You haven't logged your evening medication for today. Please take it as prescribed by your doctor.",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "3",
    severity: "warning" as const,
    title: "Elevated Heart Rate Detected",
    description: "Your resting heart rate has been above 100 bpm for the past hour. It's recommended to rest and monitor.",
    timestamp: "4 hours ago",
    read: false,
  },
  {
    id: "4",
    severity: "info" as const,
    title: "Upcoming Appointment",
    description: "You have a check-up with Dr. Benali tomorrow at 10:00 AM at CHU Ibn Sina, Rabat.",
    timestamp: "5 hours ago",
    read: true,
  },
  {
    id: "5",
    severity: "success" as const,
    title: "Daily Check-In Reminder",
    description: "Don't forget to complete your daily health check-in. You're on a 5-day streak!",
    timestamp: "6 hours ago",
    read: true,
  },
  {
    id: "6",
    severity: "critical" as const,
    title: "Abnormal Blood Sugar Level",
    description: "Your fasting blood glucose reading of 180 mg/dL is significantly above the normal range. Urgent medical attention may be needed.",
    timestamp: "Yesterday, 08:00 AM",
    read: true,
  },
  {
    id: "7",
    severity: "info" as const,
    title: "New Health Insight Available",
    description: "Your weekly health summary is ready. View AI-generated insights and recommendations based on your data.",
    timestamp: "Yesterday, 06:00 AM",
    read: true,
  },
  {
    id: "8",
    severity: "warning" as const,
    title: "Low Water Intake",
    description: "You've only logged 3 cups of water today. Aim for at least 8 cups to stay properly hydrated.",
    timestamp: "Yesterday, 03:00 PM",
    read: true,
  },
];

export function AlertsPage({ onBack }: AlertsPageProps) {
  const [filter, setFilter] = useState<"all" | "unread" | "critical" | "warning" | "info">("all");
  const [alerts, setAlerts] = useState(allAlerts);

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const filteredAlerts = alerts.filter((a) => {
    if (filter === "unread") return !a.read;
    if (filter === "critical" || filter === "warning" || filter === "info") return a.severity === filter;
    return true;
  });

  const unreadCount = alerts.filter((a) => !a.read).length;

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "var(--space-24)",
        paddingBottom: 80,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 24 }}>
        <button
          onClick={onBack}
          style={{
            background: "var(--color-surface-primary)",
            border: "1px solid var(--color-border-light)",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            color: "var(--color-text-secondary)",
            display: "flex",
            padding: 8,
            marginTop: 4,
          }}
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontFamily: "var(--font-family-title)",
              fontSize: "var(--font-size-2xl)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Bell size={24} style={{ color: "var(--color-primary-blue)" }} />
            Alerts
            {unreadCount > 0 && (
              <span
                style={{
                  background: "var(--color-error)",
                  color: "#fff",
                  fontSize: "var(--font-size-xs)",
                  fontWeight: 700,
                  padding: "2px 10px",
                  borderRadius: "var(--radius-full)",
                  fontFamily: "var(--font-family-body)",
                }}
              >
                {unreadCount} new
              </span>
            )}
          </h1>
        </div>
      </div>

      {/* Filter pills */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        {(["all", "unread", "critical", "warning", "info"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "6px 14px",
              border: `2px solid ${filter === f ? "var(--color-primary-blue)" : "var(--color-border)"}`,
              borderRadius: "var(--radius-full)",
              background: filter === f ? "var(--color-light-blue)" : "transparent",
              cursor: "pointer",
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-xs)",
              fontWeight: filter === f ? 600 : 500,
              color: filter === f ? "var(--color-primary-blue)" : "var(--color-text-secondary)",
              textTransform: "capitalize",
              transition: "all var(--transition-fast)",
            }}
          >
            {f === "all" ? "All" : f === "unread" ? `Unread (${unreadCount})` : f}
          </button>
        ))}
      </div>

      {/* Alerts list */}
      {filteredAlerts.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "var(--space-48) var(--space-24)",
            background: "var(--color-surface-primary)",
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--color-border-light)",
          }}
        >
          <CheckCircle size={48} style={{ color: "var(--color-primary-green)", marginBottom: 12 }} />
          <h3
            style={{
              fontFamily: "var(--font-family-title)",
              fontSize: "var(--font-size-lg)",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              margin: "0 0 8px",
            }}
          >
            All Clear!
          </h3>
          <p
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              color: "var(--color-text-muted)",
              margin: 0,
            }}
          >
            No {filter === "unread" ? "unread" : filter} alerts to show.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filteredAlerts.map((alert) => (
            <div key={alert.id} style={{ position: "relative" }}>
              {!alert.read && (
                <div
                  style={{
                    position: "absolute",
                    left: -8,
                    top: 20,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--color-error)",
                    zIndex: 1,
                  }}
                />
              )}
              <AlertCard
                severity={alert.severity}
                title={alert.title}
                description={alert.description}
                timestamp={alert.timestamp}
                dismissible
                onDismiss={() => dismissAlert(alert.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
