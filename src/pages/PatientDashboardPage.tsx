import { useState, useEffect } from "react";
import {
  HeartPulse,
  Moon,
  Weight,
  Smile,
  Activity,
  Brain,
  History,
  User,
  Settings,
  Bell,
  Footprints,
  Flame,
  Droplets,
  Clock,
  Sparkles,
} from "lucide-react";
import { AlertCard } from "../components/AlertCard";
import { ChartCard } from "../components/ChartCard";

/* ── Day helpers ── */
const dayName = (d: number) => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d];
const monthName = (m: number) =>
  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][m];

const now = new Date();
const greetingHour = now.getHours();
const greeting = greetingHour < 12 ? "Good morning" : greetingHour < 18 ? "Good afternoon" : "Good evening";
const dateStr = `${dayName(now.getDay())}, ${monthName(now.getMonth())} ${now.getDate()}, ${now.getFullYear()}`;

/* ── Placeholder data ── */
const summaryCards = [
  { label: "Steps", value: "8,420", target: "10,000", icon: <Footprints size={20} />, color: "var(--color-primary-blue)", progress: 84 },
  { label: "Calories", value: "1,850", unit: "kcal", icon: <Flame size={20} />, color: "#f59e0b", progress: 62 },
  { label: "Water", value: "5", unit: "cups", icon: <Droplets size={20} />, color: "#3b82f6", progress: 63 },
  { label: "Active Time", value: "45", unit: "min", icon: <Activity size={20} />, color: "var(--color-primary-green)", progress: 75 },
];

const healthCards = [
  {
    title: "Sleep",
    value: "7h 24m",
    subtitle: "Last night",
    icon: <Moon size={22} />,
    color: "#6366f1",
    bg: "#eef2ff",
    detail: "Deep sleep: 2h 48m · Light: 3h 52m · REM: 44m",
    quality: 82,
  },
  {
    title: "Weight",
    value: "68.5 kg",
    subtitle: "Updated today",
    icon: <Weight size={22} />,
    color: "var(--color-primary-green)",
    bg: "var(--color-light-green)",
    detail: "BMI: 22.4 · Change: -0.3 kg this week",
    quality: null,
  },
  {
    title: "Mood",
    value: "Great",
    subtitle: "Today",
    icon: <Smile size={22} />,
    color: "#f59e0b",
    bg: "#fef3c7",
    detail: "You've been feeling positive and energetic today.",
    emoji: "😊",
    quality: null,
  },
  {
    title: "Symptoms",
    value: "None reported",
    subtitle: "Last 24 hours",
    icon: <Activity size={22} />,
    color: "var(--color-primary-green)",
    bg: "var(--color-light-green)",
    detail: "All clear. No new symptoms recorded.",
    quality: null,
  },
];

/* ── Mini Metric Card ── */
function MiniMetric({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div
      style={{
        background: "var(--color-surface-primary)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border-light)",
        padding: "var(--space-16)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        transition: "all var(--transition-fast)",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: color + "15",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <span style={{ fontFamily: "var(--font-family-body)", fontSize: 11, color: "var(--color-text-muted)", fontWeight: 500, display: "block" }}>
          {label}
        </span>
        <span style={{ fontFamily: "var(--font-family-title)", fontSize: 16, fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1.3 }}>
          {value}
        </span>
      </div>
    </div>
  );
}

/* ── Quick Action Button ── */
function QuickAction({
  icon,
  label,
  color,
  bg,
  onClick: btnClick,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
  bg: string;
  onClick?: () => void;
}) {
  const handleClick = btnClick;
  return (
    <button
      onClick={handleClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        padding: "var(--space-20) var(--space-16)",
        border: "1px solid var(--color-border-light)",
        borderRadius: "var(--radius-card)",
        background: "var(--color-surface-primary)",
        cursor: "pointer",
        transition: "all var(--transition-fast)",
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-family-body)",
        fontSize: "var(--font-size-sm)",
        fontWeight: 500,
        minWidth: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.borderColor = color + "40";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "var(--color-border-light)";
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 14,
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
        }}
      >
        {icon}
      </div>
      <span style={{ whiteSpace: "nowrap" }}>{label}</span>
    </button>
  );
}

/* ── Health Insight Card (big) ── */
function HealthInsightCard({
  title,
  value,
  subtitle,
  icon,
  color,
  bg,
  detail,
  emoji,
  quality,
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  detail?: string;
  emoji?: string;
  quality?: number | null;
}) {
  const qual = quality ?? null;

  return (
    <div
      style={{
        background: "var(--color-surface-primary)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border-light)",
        padding: "var(--space-24)",
        transition: "all var(--transition-base)",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-lg)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Icon + title row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color,
          }}
        >
          {icon}
        </div>

        {qual !== null && (
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: `conic-gradient(${color} ${qual * 3.6}deg, var(--color-border-light) ${qual * 3.6}deg)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "var(--color-surface-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-family-body)",
                fontSize: 11,
                fontWeight: 700,
                color,
              }}
            >
              {qual}
            </div>
          </div>
        )}
      </div>

      {/* Value */}
      <div style={{ marginBottom: 4 }}>
        <span
          style={{
            fontFamily: "var(--font-family-title)",
            fontSize: "var(--font-size-2xl)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            letterSpacing: "var(--letter-spacing-tight)",
          }}
        >
          {emoji ? `${value} ${emoji}` : value}
        </span>
      </div>

      <span
        style={{
          fontFamily: "var(--font-family-body)",
          fontSize: "var(--font-size-sm)",
          fontWeight: 500,
          color: "var(--color-text-secondary)",
          display: "block",
          marginBottom: detail ? 8 : 0,
        }}
      >
        {title}
        {subtitle && <span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}> · {subtitle}</span>}
      </span>

      {detail && (
        <p
          style={{
            fontFamily: "var(--font-family-body)",
            fontSize: "var(--font-size-xs)",
            color: "var(--color-text-muted)",
            lineHeight: 1.5,
            margin: 0,
            paddingTop: 8,
            borderTop: "1px solid var(--color-border-light)",
          }}
        >
          {detail}
        </p>
      )}
    </div>
  );
}

export type PatientView = "dashboard" | "daily-checkin" | "ai-assistant" | "health-history" | "alerts" | "profile";

export function PatientDashboardPage({ onSignOut, onNavigate }: { onSignOut: () => void; onNavigate: (view: PatientView) => void; }) {
  const [greetingName] = useState("Sarah");
  const [dailyCheckinDone, setDailyCheckinDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <div
      style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "var(--space-24)",
        paddingBottom: 80,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "var(--font-family-title)",
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              letterSpacing: "var(--letter-spacing-tight)",
              margin: 0,
            }}
          >
            {greeting}, {greetingName} 👋
          </h1>
          <p
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              color: "var(--color-text-muted)",
              margin: "4px 0 0 0",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Clock size={14} />
            {dateStr}
          </p>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              border: "1px solid var(--color-border-light)",
              background: "var(--color-surface-primary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-text-secondary)",
              transition: "all var(--transition-fast)",
            }}
            aria-label="Notifications"
            onClick={() => onNavigate("alerts")}
          >
            <Bell size={18} />
          </button>
          <button
            onClick={onSignOut}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              border: "1px solid var(--color-border-light)",
              background: "var(--color-surface-primary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-text-secondary)",
              transition: "all var(--transition-fast)",
              fontSize: 14,
            }}
            aria-label="Sign out"
            title="Sign out"
          >
            ⏻
          </button>
        </div>
      </div>

      {/* ── Today's Health Summary ── */}
      <section style={{ marginBottom: 32 }}>
        <h2
          style={{
            fontFamily: "var(--font-family-title)",
            fontSize: "var(--font-size-base)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            margin: "0 0 12px",
          }}
        >
          Today's Health Summary
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
          }}
        >
          {summaryCards.map((card) => (
            <MiniMetric key={card.label} label={card.label} value={`${card.value}${card.unit ? ` ${card.unit}` : ""}`} icon={card.icon} color={card.color} />
          ))}
        </div>
      </section>

      {/* ── Health Cards Grid ── */}
      <section style={{ marginBottom: 32 }}>
        <h2
          style={{
            fontFamily: "var(--font-family-title)",
            fontSize: "var(--font-size-base)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            margin: "0 0 12px",
          }}
        >
          Health Insights
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          <HealthInsightCard {...healthCards[0]} />
          <HealthInsightCard {...healthCards[1]} />
          <HealthInsightCard {...healthCards[2]} />
          <HealthInsightCard {...healthCards[3]} />
        </div>
      </section>

      {/* ── Latest Alert + Chart Row ── */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "var(--font-family-title)",
              fontSize: "var(--font-size-base)",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              margin: "0 0 12px",
            }}
          >
            Latest Alert
          </h2>
          <AlertCard
            severity="info"
            title="Blood Pressure Reminder"
            description="Your last BP reading was slightly elevated (128/82). A follow-up check is recommended within 3 days."
            timestamp="2 hours ago"
            action={{ label: "Log Reading", onClick: () => {} }}
            dismissible
            onDismiss={() => {}}
          />
        </div>

        <div>
          <h2
            style={{
              fontFamily: "var(--font-family-title)",
              fontSize: "var(--font-size-base)",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              margin: "0 0 12px",
            }}
          >
            Weekly Activity
          </h2>
          <ChartCard
            title="Steps"
            subtitle="Last 7 days"
            height={140}
            legend={[{ label: "Daily steps", color: "var(--color-primary-blue)" }]}
          />
        </div>
      </section>

      {/* ── Quick Actions ── */}
      <section>
        <h2
          style={{
            fontFamily: "var(--font-family-title)",
            fontSize: "var(--font-size-base)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            margin: "0 0 12px",
          }}
        >
          Quick Actions
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: 12,
          }}
        >
          <QuickAction
            icon={dailyCheckinDone ? <Sparkles size={20} /> : <HeartPulse size={20} />}
            label={dailyCheckinDone ? "Done ✓" : "Daily Check-In"}
            color="var(--color-primary-blue)"
            bg="var(--color-light-blue)"
            onClick={dailyCheckinDone ? undefined : () => onNavigate("daily-checkin")}
          />
          <QuickAction
            icon={<Brain size={20} />}
            label="AI Assistant"
            color="var(--color-primary-green)"
            bg="var(--color-light-green)"
            onClick={() => onNavigate("ai-assistant")}
          />
          <QuickAction
            icon={<History size={20} />}
            label="Health History"
            color="#8b5cf6"
            bg="#f3e8ff"
            onClick={() => onNavigate("health-history")}
          />
          <QuickAction
            icon={<User size={20} />}
            label="Profile"
            color="#f59e0b"
            bg="#fef3c7"
            onClick={() => onNavigate("profile")}
          />
          <QuickAction
            icon={<Settings size={20} />}
            label="Settings"
            color="var(--color-text-muted)"
            bg="var(--color-surface-secondary)"
            onClick={() => onNavigate("profile")}
          />
        </div>

        {/* Daily Check-In toggle */}
        {!dailyCheckinDone && (
          <div
            style={{
              marginTop: 16,
              padding: "var(--space-16)",
              borderRadius: "var(--radius-card)",
              border: "1px dashed var(--color-primary-blue)",
              background: "var(--color-light-blue)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <HeartPulse size={18} style={{ color: "var(--color-primary-blue)" }} />
              <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-sm)", color: "var(--color-primary-blue)", fontWeight: 500 }}>
                You haven't completed your daily check-in yet
              </span>
            </div>
            <button
              onClick={() => { setDailyCheckinDone(true); onNavigate("daily-checkin"); }}
              style={{
                padding: "8px 20px",
                border: "none",
                borderRadius: "var(--radius-button)",
                background: "var(--color-primary-blue)",
                color: "#fff",
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-sm)",
                fontWeight: 600,
                cursor: "pointer",
                transition: "opacity var(--transition-fast)",
              }}
            >
              Start Check-In
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
