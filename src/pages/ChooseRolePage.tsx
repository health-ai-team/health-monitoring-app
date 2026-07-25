import { UserRound, Stethoscope, HeartPulse, ArrowRight } from "lucide-react";

interface ChooseRolePageProps {
  onSelectRole: (role: "patient" | "doctor") => void;
  onBack?: () => void;
}

export function ChooseRolePage({ onSelectRole, onBack }: ChooseRolePageProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-background)",
        padding: "var(--space-24)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 640 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "var(--color-primary-blue)",
              fontFamily: "var(--font-family-title)",
              fontWeight: 700,
              fontSize: "var(--font-size-base)",
              marginBottom: 16,
            }}
          >
            <HeartPulse size={22} />
            DIHA FS7TK
          </button>
          <h1
            style={{
              fontFamily: "var(--font-family-title)",
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              margin: "0 0 8px",
            }}
          >
            Choose Your Role
          </h1>
          <p
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-base)",
              color: "var(--color-text-secondary)",
              margin: 0,
            }}
          >
            Select how you'll use DIHA FS7TK
          </p>
        </div>

        {/* Role cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "var(--space-24)",
          }}
        >
          {/* Patient card */}
          <div
            onClick={() => onSelectRole("patient")}
            style={{
              background: "var(--color-surface-primary)",
              borderRadius: "var(--radius-card)",
              border: "2px solid var(--color-border-light)",
              padding: "var(--space-32)",
              textAlign: "center",
              cursor: "pointer",
              transition: "all var(--transition-base)",
              boxShadow: "var(--shadow-sm)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-primary-blue)";
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border-light)";
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                background: "var(--color-light-blue)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                color: "var(--color-primary-blue)",
              }}
            >
              <UserRound size={36} />
            </div>

            <h3
              style={{
                fontFamily: "var(--font-family-title)",
                fontSize: "var(--font-size-xl)",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                margin: "0 0 8px",
              }}
            >
              Patient
            </h3>

            <p
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-sm)",
                color: "var(--color-text-secondary)",
                margin: "0 0 20px",
                lineHeight: 1.6,
              }}
            >
              Track your health metrics, view AI insights, manage appointments,
              and communicate with your doctors.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "var(--color-primary-blue)",
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-sm)",
                fontWeight: 600,
              }}
            >
              Continue as Patient
              <ArrowRight size={16} />
            </div>
          </div>

          {/* Doctor card */}
          <div
            onClick={() => onSelectRole("doctor")}
            style={{
              background: "var(--color-surface-primary)",
              borderRadius: "var(--radius-card)",
              border: "2px solid var(--color-border-light)",
              padding: "var(--space-32)",
              textAlign: "center",
              cursor: "pointer",
              transition: "all var(--transition-base)",
              boxShadow: "var(--shadow-sm)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-primary-green)";
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border-light)";
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                background: "var(--color-light-green)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                color: "var(--color-primary-green)",
              }}
            >
              <Stethoscope size={36} />
            </div>

            <h3
              style={{
                fontFamily: "var(--font-family-title)",
                fontSize: "var(--font-size-xl)",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                margin: "0 0 8px",
              }}
            >
              Doctor
            </h3>

            <p
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-sm)",
                color: "var(--color-text-secondary)",
                margin: "0 0 20px",
                lineHeight: 1.6,
              }}
            >
              Access patient histories, review AI-powered health insights,
              manage your schedule, and collaborate with colleagues.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "var(--color-primary-green)",
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-sm)",
                fontWeight: 600,
              }}
            >
              Continue as Doctor
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
