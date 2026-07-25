import { useState, type FormEvent } from "react";
import { Moon, Weight, Smile, Activity, Pill, PenLine, ArrowLeft, CheckCircle } from "lucide-react";
import { PrimaryButton } from "../components/PrimaryButton";
import { Textarea } from "../components/Textarea";

interface DailyCheckInPageProps {
  onBack: () => void;
}

type MoodLevel = "terrible" | "bad" | "okay" | "good" | "great";
const moodOptions: { value: MoodLevel; label: string; emoji: string }[] = [
  { value: "terrible", label: "Terrible", emoji: "😫" },
  { value: "bad", label: "Bad", emoji: "😟" },
  { value: "okay", label: "Okay", emoji: "😐" },
  { value: "good", label: "Good", emoji: "😊" },
  { value: "great", label: "Great", emoji: "🤩" },
];

const painLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const symptomOptions = ["None", "Headache", "Fatigue", "Nausea", "Dizziness", "Chest pain", "Shortness of breath", "Muscle ache", "Fever", "Cough", "Other"];

export function DailyCheckInPage({ onBack }: DailyCheckInPageProps) {
  const [sleepHours, setSleepHours] = useState(7);
  const [weight, setWeight] = useState("");
  const [mood, setMood] = useState<MoodLevel | null>(null);
  const [painLevel, setPainLevel] = useState<number | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [medication, setMedication] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  if (submitted) {
    return (
      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          padding: "var(--space-24)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            background: "var(--color-surface-primary)",
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--color-border-light)",
            padding: "var(--space-48) var(--space-32)",
            boxShadow: "var(--shadow-md)",
            width: "100%",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "var(--color-light-green)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              color: "var(--color-primary-green)",
            }}
          >
            <CheckCircle size={36} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-family-title)",
              fontSize: "var(--font-size-2xl)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              margin: "0 0 8px",
            }}
          >
            Check-In Complete!
          </h2>
          <p
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-base)",
              color: "var(--color-text-secondary)",
              margin: "0 0 24px",
            }}
          >
            Your daily health data has been recorded. Keep tracking to see your trends.
          </p>
          <PrimaryButton onClick={onBack}>
            Back to Dashboard
          </PrimaryButton>
        </div>
      </div>
    );
  }

  const SectionCard = ({ children, icon, title }: { children: React.ReactNode; icon: React.ReactNode; title: string }) => (
    <div
      style={{
        background: "var(--color-surface-primary)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border-light)",
        padding: "var(--space-24)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "var(--color-light-blue)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-primary-blue)",
          }}
        >
          {icon}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-family-title)",
            fontSize: "var(--font-size-base)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>
      {children}
    </div>
  );

  return (
    <div
      style={{
        maxWidth: 640,
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
            transition: "background var(--transition-fast)",
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
            Daily Check-In
          </h1>
          <p
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              color: "var(--color-text-muted)",
              margin: "4px 0 0",
            }}
          >
            How are you feeling today?
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Sleep */}
        <SectionCard icon={<Moon size={16} />} title="Hours Slept">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input
              type="range"
              min={0}
              max={12}
              step={0.5}
              value={sleepHours}
              onChange={(e) => setSleepHours(parseFloat(e.target.value))}
              style={{ flex: 1, accentColor: "var(--color-primary-blue)" }}
            />
            <span
              style={{
                fontFamily: "var(--font-family-title)",
                fontSize: "var(--font-size-xl)",
                fontWeight: 700,
                color: "var(--color-primary-blue)",
                minWidth: 50,
                textAlign: "right",
              }}
            >
              {sleepHours}h
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)", marginTop: 4 }}>
            <span>0h</span>
            <span>Recommended: 7-9h</span>
            <span>12h</span>
          </div>
        </SectionCard>

        {/* Weight */}
        <SectionCard icon={<Weight size={16} />} title="Weight">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="number"
              placeholder="68.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              style={{
                width: 120,
                padding: "10px 14px",
                border: "2px solid var(--color-border)",
                borderRadius: "var(--radius-input)",
                background: "var(--color-surface-secondary)",
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-base)",
                fontWeight: 600,
                outline: "none",
              }}
            />
            <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)" }}>kg</span>
            <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)", marginLeft: "auto" }}>
              Last: 68.5 kg
            </span>
          </div>
        </SectionCard>

        {/* Mood */}
        <SectionCard icon={<Smile size={16} />} title="Mood">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {moodOptions.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => setMood(m.value)}
                style={{
                  flex: 1,
                  minWidth: 80,
                  padding: "12px 8px",
                  border: `2px solid ${mood === m.value ? "var(--color-primary-blue)" : "var(--color-border)"}`,
                  borderRadius: "var(--radius-input)",
                  background: mood === m.value ? "var(--color-light-blue)" : "transparent",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all var(--transition-fast)",
                }}
              >
                <span style={{ fontSize: 24, display: "block", marginBottom: 4 }}>{m.emoji}</span>
                <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-xs)", fontWeight: mood === m.value ? 600 : 400, color: "var(--color-text-primary)" }}>
                  {m.label}
                </span>
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Pain Level */}
        <SectionCard icon={<Activity size={16} />} title="Pain Level">
          <p style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)", margin: "0 0 12px" }}>
            0 = No pain, 10 = Worst pain
          </p>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {painLevels.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPainLevel(p)}
                style={{
                  width: 38,
                  height: 38,
                  border: `2px solid ${painLevel === p ? "var(--color-error)" : "var(--color-border)"}`,
                  borderRadius: "var(--radius-sm)",
                  background: painLevel === p ? "#fee2e2" : "transparent",
                  cursor: "pointer",
                  fontFamily: "var(--font-family-body)",
                  fontSize: "var(--font-size-sm)",
                  fontWeight: painLevel === p ? 700 : 500,
                  color: painLevel === p ? "var(--color-error)" : "var(--color-text-secondary)",
                  transition: "all var(--transition-fast)",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Symptoms */}
        <SectionCard icon={<Activity size={16} />} title="Symptoms">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {symptomOptions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggleSymptom(s)}
                style={{
                  padding: "8px 14px",
                  border: `2px solid ${selectedSymptoms.includes(s) ? "var(--color-primary-blue)" : "var(--color-border)"}`,
                  borderRadius: "var(--radius-full)",
                  background: selectedSymptoms.includes(s) ? "var(--color-light-blue)" : "transparent",
                  cursor: "pointer",
                  fontFamily: "var(--font-family-body)",
                  fontSize: "var(--font-size-sm)",
                  fontWeight: selectedSymptoms.includes(s) ? 600 : 400,
                  color: selectedSymptoms.includes(s) ? "var(--color-primary-blue)" : "var(--color-text-secondary)",
                  transition: "all var(--transition-fast)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Medication */}
        <SectionCard icon={<Pill size={16} />} title="Medication">
          <input
            type="text"
            placeholder="Any medication taken today?"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px",
              border: "2px solid var(--color-border)",
              borderRadius: "var(--radius-input)",
              background: "var(--color-surface-secondary)",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              outline: "none",
            }}
          />
        </SectionCard>

        {/* Notes */}
        <SectionCard icon={<PenLine size={16} />} title="Additional Notes">
          <Textarea
            placeholder="Anything else you'd like to share?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
            resize
          />
        </SectionCard>

        <PrimaryButton type="submit" fullWidth icon={<CheckCircle size={18} />}>
          Complete Check-In
        </PrimaryButton>
      </form>
    </div>
  );
}
