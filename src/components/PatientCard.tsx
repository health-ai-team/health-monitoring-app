import { User, Calendar, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

interface PatientInfo {
  name: string;
  id: string;
  age: number;
  gender: string;
  location?: string;
  phone?: string;
  avatar?: ReactNode;
  status?: "stable" | "critical" | "improving" | "monitoring";
  bloodType?: string;
}

interface PatientCardProps {
  patient: PatientInfo;
  onClick?: () => void;
}

const statusColors: Record<string, { bg: string; color: string; label: string }> = {
  stable: { bg: "var(--color-light-green)", color: "var(--color-primary-green)", label: "Stable" },
  critical: { bg: "#fee2e2", color: "var(--color-error)", label: "Critical" },
  improving: { bg: "#dbeafe", color: "#2563eb", label: "Improving" },
  monitoring: { bg: "#fef3c7", color: "#d97706", label: "Monitoring" },
};

export function PatientCard({ patient, onClick }: PatientCardProps) {
  const status = patient.status ? statusColors[patient.status] : null;

  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--color-surface-primary)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border-light)",
        padding: "var(--space-24)",
        cursor: onClick ? "pointer" : "default",
        transition: "box-shadow var(--transition-base), transform var(--transition-fast)",
        boxShadow: "var(--shadow-sm)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Avatar placeholder */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "var(--radius-sm)",
              background: "var(--color-light-blue)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-primary-blue)",
              flexShrink: 0,
            }}
          >
            {patient.avatar || <User size={24} />}
          </div>

          <div>
            <h4
              style={{
                fontFamily: "var(--font-family-title)",
                fontSize: "var(--font-size-base)",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                margin: 0,
              }}
            >
              {patient.name}
            </h4>
            <span
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-xs)",
                color: "var(--color-text-muted)",
              }}
            >
              {patient.id} · {patient.age} yrs · {patient.gender}
            </span>
          </div>
        </div>

        {status && (
          <span
            style={{
              display: "inline-block",
              padding: "2px 10px",
              borderRadius: "var(--radius-full)",
              background: status.bg,
              color: status.color,
              fontSize: "var(--font-size-xs)",
              fontWeight: 600,
              fontFamily: "var(--font-family-body)",
              whiteSpace: "nowrap",
            }}
          >
            {status.label}
          </span>
        )}
      </div>

      {/* Details grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
        {patient.location && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <MapPin size={12} style={{ color: "var(--color-text-muted)", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>
              {patient.location}
            </span>
          </div>
        )}
        {patient.phone && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Phone size={12} style={{ color: "var(--color-text-muted)", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>
              {patient.phone}
            </span>
          </div>
        )}
        {patient.bloodType && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Calendar size={12} style={{ color: "var(--color-text-muted)", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>
              Blood: {patient.bloodType}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
