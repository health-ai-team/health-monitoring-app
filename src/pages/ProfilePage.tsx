import { ArrowLeft, User, Phone, HeartPulse, Stethoscope, Settings, LogOut, ChevronRight, Mail, MapPin, Calendar, Shield, AlertTriangle, Moon, Bell } from "lucide-react";
import { DangerButton } from "../components/DangerButton";

interface ProfilePageProps {
  onBack: () => void;
  onLogout: () => void;
}

export function ProfilePage({ onBack, onLogout }: ProfilePageProps) {
  const SectionCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
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

  const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 0",
        borderBottom: "1px solid var(--color-border-light)",
      }}
    >
      <div style={{ flexShrink: 0, color: "var(--color-text-muted)", display: "flex" }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)", display: "block" }}>{label}</span>
        <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-sm)", fontWeight: 500, color: "var(--color-text-primary)" }}>{value}</span>
      </div>
    </div>
  );

  const SettingsRow = ({ icon, label, description, onClick, danger }: { icon: React.ReactNode; label: string; description?: string; onClick?: () => void; danger?: boolean }) => (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        padding: "14px 0",
        border: "none",
        borderBottom: "1px solid var(--color-border-light)",
        background: "none",
        cursor: "pointer",
        textAlign: "left",
        transition: "opacity var(--transition-fast)",
      }}
    >
      <div style={{ flexShrink: 0, color: danger ? "var(--color-error)" : "var(--color-text-muted)", display: "flex" }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-sm)", fontWeight: 500, color: danger ? "var(--color-error)" : "var(--color-text-primary)", display: "block" }}>
          {label}
        </span>
        {description && (
          <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)", display: "block" }}>
            {description}
          </span>
        )}
      </div>
      <ChevronRight size={16} style={{ color: "var(--color-text-muted)", flexShrink: 0 }} />
    </button>
  );

  return (
    <div
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "var(--space-24)",
        paddingBottom: 100,
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
            Profile
          </h1>
        </div>
      </div>

      {/* Avatar + Name */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 32,
          background: "var(--color-surface-primary)",
          borderRadius: "var(--radius-card)",
          border: "1px solid var(--color-border-light)",
          padding: "var(--space-32)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--color-primary-blue), var(--color-primary-green))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            color: "#fff",
          }}
        >
          <User size={36} />
        </div>
        <h2
          style={{
            fontFamily: "var(--font-family-title)",
            fontSize: "var(--font-size-xl)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            margin: 0,
          }}
        >
          Sarah Benali
        </h2>
        <span
          style={{
            fontFamily: "var(--font-family-body)",
            fontSize: "var(--font-size-sm)",
            color: "var(--color-primary-green)",
            fontWeight: 500,
          }}
        >
          Patient
        </span>
        <button
          style={{
            display: "block",
            margin: "12px auto 0",
            padding: "6px 16px",
            border: "2px solid var(--color-border)",
            borderRadius: "var(--radius-full)",
            background: "transparent",
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-family-body)",
            fontSize: "var(--font-size-xs)",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Change Photo
        </button>
      </div>

      {/* Patient Information */}
      <SectionCard title="Patient Information" icon={<User size={16} />}>
        <InfoRow icon={<User size={14} />} label="Full Name" value="Sarah Benali" />
        <InfoRow icon={<Mail size={14} />} label="Email" value="sarah.benali@email.com" />
        <InfoRow icon={<Phone size={14} />} label="Phone" value="+212 6 12 34 56 78" />
        <InfoRow icon={<MapPin size={14} />} label="Location" value="Rabat, Morocco" />
        <InfoRow icon={<Calendar size={14} />} label="Date of Birth" value="March 15, 1992 (34 yrs)" />
        <InfoRow icon={<HeartPulse size={14} />} label="Blood Type" value="A+" />
        <div style={{ paddingTop: 12 }}>
          <button
            style={{
              width: "100%",
              padding: "8px",
              border: "2px solid var(--color-border)",
              borderRadius: "var(--radius-button)",
              background: "transparent",
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Edit Information
          </button>
        </div>
      </SectionCard>

      {/* Emergency Contacts */}
      <div style={{ marginTop: 20 }}>
        <SectionCard title="Emergency Contacts" icon={<Phone size={16} />}>
          <InfoRow icon={<User size={14} />} label="Primary Contact" value="Ahmed Benali (Spouse)" />
          <InfoRow icon={<Phone size={14} />} label="Phone" value="+212 6 98 76 54 32" />
          <InfoRow icon={<AlertTriangle size={14} />} label="Emergency Notes" value="Allergic to penicillin" />
        </SectionCard>
      </div>

      {/* Doctor Information */}
      <div style={{ marginTop: 20 }}>
        <SectionCard title="Primary Doctor" icon={<Stethoscope size={16} />}>
          <InfoRow icon={<User size={14} />} label="Name" value="Dr. Sarah Benali" />
          <InfoRow icon={<Stethoscope size={14} />} label="Specialty" value="Cardiology" />
          <InfoRow icon={<MapPin size={14} />} label="Hospital" value="CHU Ibn Sina, Rabat" />
          <InfoRow icon={<Phone size={14} />} label="Contact" value="+212 5 37 77 12 34" />
          <InfoRow icon={<Calendar size={14} />} label="Next Appointment" value="Jul 28, 2026 at 10:00 AM" />
        </SectionCard>
      </div>

      {/* Settings */}
      <div style={{ marginTop: 20 }}>
        <SectionCard title="Settings" icon={<Settings size={16} />}>
          <SettingsRow icon={<Bell size={16} />} label="Notifications" description="Manage alert preferences" />
          <SettingsRow icon={<Shield size={16} />} label="Privacy" description="Data sharing and permissions" />
          <SettingsRow icon={<Moon size={16} />} label="Dark Mode" description="Toggle dark theme" />
          <SettingsRow icon={<User size={16} />} label="Account" description="Email, password, security" />
        </SectionCard>
      </div>

      {/* Logout */}
      <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 8 }}>
        <DangerButton onClick={onLogout} fullWidth icon={<LogOut size={18} />}>
          Sign Out
        </DangerButton>
      </div>
    </div>
  );
}
