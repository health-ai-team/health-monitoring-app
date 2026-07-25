import { ArrowLeft, Calendar, Activity, Heart, Moon, Weight, TrendingUp, ClipboardList } from "lucide-react";
import { ChartCard } from "../components/ChartCard";
import { Timeline } from "../components/Timeline";
import { HealthCard } from "../components/HealthCard";

interface HealthHistoryPageProps {
  onBack: () => void;
}

const timelineEvents = [
  {
    id: "1",
    date: "Today, 08:30 AM",
    title: "Daily Check-In Completed",
    description: "Sleep: 7h 24m · Mood: Great · Pain: 0/10 · Weight: 68.5 kg",
    icon: <ClipboardList size={16} />,
    color: "var(--color-primary-green)",
  },
  {
    id: "2",
    date: "Yesterday, 07:15 PM",
    title: "Blood Pressure Reading",
    description: "128/82 mmHg — Slightly elevated. Logged via home monitor.",
    icon: <Activity size={16} />,
    color: "#d97706",
  },
  {
    id: "3",
    date: "Jul 22, 2026",
    title: "AI Health Summary Generated",
    description: "Your vitals have been stable over the past 48 hours. Heart rate variability shows positive recovery patterns.",
    icon: <TrendingUp size={16} />,
    color: "var(--color-primary-blue)",
  },
  {
    id: "4",
    date: "Jul 20, 2026",
    title: "Weekly Check-Up with Dr. Benali",
    description: "Routine follow-up. Blood work ordered. Next appointment in 3 months.",
    icon: <Calendar size={16} />,
    color: "#6366f1",
  },
  {
    id: "5",
    date: "Jul 18, 2026",
    title: "Weight Milestone",
    description: "Reached 68.5 kg — down 0.3 kg this week. Goal: 67 kg.",
    icon: <Weight size={16} />,
    color: "var(--color-primary-green)",
  },
];

const surveyHistory = [
  { date: "Jul 25", mood: "Great", sleep: "7.5h", pain: "0/10", symptoms: "None" },
  { date: "Jul 24", mood: "Good", sleep: "6.8h", pain: "1/10", symptoms: "Headache" },
  { date: "Jul 23", mood: "Good", sleep: "7.0h", pain: "0/10", symptoms: "None" },
  { date: "Jul 22", mood: "Okay", sleep: "5.5h", pain: "3/10", symptoms: "Fatigue, Headache" },
  { date: "Jul 21", mood: "Great", sleep: "8.0h", pain: "0/10", symptoms: "None" },
  { date: "Jul 20", mood: "Good", sleep: "7.2h", pain: "0/10", symptoms: "None" },
];

export function HealthHistoryPage({ onBack }: HealthHistoryPageProps) {
  return (
    <div
      style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "var(--space-24)",
        paddingBottom: 80,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
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
          }}
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1
            style={{
              fontFamily: "var(--font-family-title)",
              fontSize: "var(--font-size-2xl)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              margin: 0,
            }}
          >
            Health History
          </h1>
          <p
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              color: "var(--color-text-muted)",
              margin: "4px 0 0",
            }}
          >
            Your complete health journey
          </p>
        </div>
      </div>

      {/* Charts row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <ChartCard
          title="Heart Rate (7 days)"
          subtitle="Average: 72 bpm"
          height={160}
          legend={[{ label: "Resting HR", color: "var(--color-primary-blue)" }]}
        />
        <ChartCard
          title="Sleep Duration (7 days)"
          subtitle="Average: 6.9h"
          height={160}
          legend={[{ label: "Hours slept", color: "#6366f1" }]}
        />
      </div>

      {/* Health metric cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 12,
          marginBottom: 32,
        }}
      >
        <HealthCard
          title="Avg Heart Rate"
          value={72}
          unit="bpm"
          icon={<Heart size={18} />}
          status="normal"
          range={{ min: 60, max: 100 }}
          trend="stable"
        />
        <HealthCard
          title="Avg Sleep"
          value="6.9"
          unit="hrs"
          icon={<Moon size={18} />}
          status="normal"
          range={{ min: 7, max: 9 }}
          trend="stable"
        />
        <HealthCard
          title="Avg Weight"
          value={68.5}
          unit="kg"
          icon={<Weight size={18} />}
          status="normal"
          range={{ min: 65, max: 72 }}
          trend="down"
        />
        <HealthCard
          title="Avg Activity"
          value="4,320"
          unit="steps"
          icon={<Activity size={18} />}
          status="elevated"
          range={{ min: 5000, max: 10000 }}
          trend="up"
        />
      </div>

      {/* Timeline */}
      <section style={{ marginBottom: 32 }}>
        <h2
          style={{
            fontFamily: "var(--font-family-title)",
            fontSize: "var(--font-size-base)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            margin: "0 0 16px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Activity size={16} style={{ color: "var(--color-text-muted)" }} />
          Recent Activity
        </h2>
        <Timeline events={timelineEvents} />
      </section>

      {/* Past Surveys */}
      <section>
        <h2
          style={{
            fontFamily: "var(--font-family-title)",
            fontSize: "var(--font-size-base)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            margin: "0 0 16px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <ClipboardList size={16} style={{ color: "var(--color-text-muted)" }} />
          Past Check-Ins
        </h2>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "2px solid var(--color-border-light)",
                  color: "var(--color-text-muted)",
                  fontSize: "var(--font-size-xs)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 500 }}>Date</th>
                <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 500 }}>Mood</th>
                <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 500 }}>Sleep</th>
                <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 500 }}>Pain</th>
                <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 500 }}>Symptoms</th>
              </tr>
            </thead>
            <tbody>
              {surveyHistory.map((row) => (
                <tr
                  key={row.date}
                  style={{
                    borderBottom: "1px solid var(--color-border-light)",
                    transition: "background var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-surface-secondary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <td style={{ padding: "12px", fontWeight: 600, color: "var(--color-text-primary)" }}>{row.date}</td>
                  <td style={{ padding: "12px", color: "var(--color-text-secondary)" }}>{row.mood}</td>
                  <td style={{ padding: "12px", color: "var(--color-text-secondary)" }}>{row.sleep}</td>
                  <td style={{ padding: "12px", color: "var(--color-text-secondary)" }}>{row.pain}</td>
                  <td style={{ padding: "12px", color: "var(--color-text-secondary)" }}>{row.symptoms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
