import { Stethoscope, Star, MapPin, Clock } from "lucide-react";
import type { ReactNode } from "react";

interface DoctorInfo {
  name: string;
  specialty: string;
  hospital?: string;
  location?: string;
  rating: number;
  available?: boolean;
  nextAvailable?: string;
  experience?: number;
  avatar?: ReactNode;
}

interface DoctorCardProps {
  doctor: DoctorInfo;
  onBook?: () => void;
}

export function DoctorCard({ doctor, onBook }: DoctorCardProps) {
  return (
    <div
      style={{
        background: "var(--color-surface-primary)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border-light)",
        padding: "var(--space-24)",
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
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--color-light-blue)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-primary-blue)",
            flexShrink: 0,
          }}
        >
          {doctor.avatar || <Stethoscope size={28} />}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <h4
              style={{
                fontFamily: "var(--font-family-title)",
                fontSize: "var(--font-size-base)",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                margin: 0,
              }}
            >
              {doctor.name}
            </h4>

            {doctor.available !== undefined && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "2px 8px",
                  borderRadius: "var(--radius-full)",
                  background: doctor.available ? "var(--color-light-green)" : "#fee2e2",
                  color: doctor.available ? "var(--color-primary-green)" : "var(--color-error)",
                  fontSize: "var(--font-size-xs)",
                  fontWeight: 600,
                  fontFamily: "var(--font-family-body)",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "currentColor",
                  }}
                />
                {doctor.available ? "Available" : "Busy"}
              </span>
            )}
          </div>

          <span
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              color: "var(--color-primary-green)",
              fontWeight: 500,
            }}
          >
            {doctor.specialty}
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
            <Star size={12} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
            <span
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-xs)",
                color: "var(--color-text-secondary)",
                fontWeight: 600,
              }}
            >
              {doctor.rating}
            </span>
            {doctor.experience && (
              <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)" }}>
                · {doctor.experience} yrs exp
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Details */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
        {doctor.hospital && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <MapPin size={12} style={{ color: "var(--color-text-muted)" }} />
            <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>
              {doctor.hospital}{doctor.location ? `, ${doctor.location}` : ""}
            </span>
          </div>
        )}
        {doctor.nextAvailable && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Clock size={12} style={{ color: "var(--color-text-muted)" }} />
            <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>
              Next: {doctor.nextAvailable}
            </span>
          </div>
        )}
      </div>

      {onBook && (
        <button
          onClick={onBook}
          style={{
            width: "100%",
            padding: "10px 16px",
            border: "none",
            borderRadius: "var(--radius-button)",
            background: "linear-gradient(135deg, var(--color-primary-blue), #0a7a9e)",
            color: "#fff",
            fontFamily: "var(--font-family-body)",
            fontSize: "var(--font-size-sm)",
            fontWeight: 600,
            cursor: "pointer",
            transition: "opacity var(--transition-fast), transform var(--transition-fast)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.9";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Book Appointment
        </button>
      )}
    </div>
  );
}
