import { User, Mail, Calendar, MapPin, Settings, LogOut } from "lucide-react";
import type { ReactNode } from "react";

interface ProfileStats {
  label: string;
  value: string | number;
}

interface ProfileCardProps {
  name: string;
  email?: string;
  role?: string;
  location?: string;
  joinDate?: string;
  avatar?: ReactNode;
  avatarUrl?: string;
  stats?: ProfileStats[];
  onEdit?: () => void;
  onLogout?: () => void;
}

export function ProfileCard({
  name,
  email,
  role,
  location,
  joinDate,
  avatar,
  avatarUrl,
  stats = [],
  onEdit,
  onLogout,
}: ProfileCardProps) {
  return (
    <div
      style={{
        background: "var(--color-surface-primary)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border-light)",
        overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Cover */}
      <div
        style={{
          height: 80,
          background: "linear-gradient(135deg, var(--color-primary-blue), var(--color-primary-green))",
        }}
      />

      {/* Avatar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: -32,
          marginBottom: 16,
        }}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              border: "3px solid var(--color-surface-primary)",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              border: "3px solid var(--color-surface-primary)",
              background: "var(--color-light-blue)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-primary-blue)",
            }}
          >
            {avatar || <User size={28} />}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ textAlign: "center", padding: "0 var(--space-24)" }}>
        <h4
          style={{
            fontFamily: "var(--font-family-title)",
            fontSize: "var(--font-size-lg)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            margin: 0,
          }}
        >
          {name}
        </h4>
        {role && (
          <span
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              color: "var(--color-primary-green)",
              fontWeight: 500,
            }}
          >
            {role}
          </span>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 12 }}>
          {email && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Mail size={12} style={{ color: "var(--color-text-muted)" }} />
              <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>
                {email}
              </span>
            </div>
          )}
          {location && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <MapPin size={12} style={{ color: "var(--color-text-muted)" }} />
              <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>
                {location}
              </span>
            </div>
          )}
          {joinDate && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Calendar size={12} style={{ color: "var(--color-text-muted)" }} />
              <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>
                Joined {joinDate}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      {stats.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 24,
            padding: "var(--space-16) var(--space-24)",
            margin: "var(--space-16) 0",
            borderTop: "1px solid var(--color-border-light)",
            borderBottom: "1px solid var(--color-border-light)",
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-family-title)",
                  fontSize: "var(--font-size-xl)",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  display: "block",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-family-body)",
                  fontSize: "var(--font-size-xs)",
                  color: "var(--color-text-muted)",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: 8, padding: "var(--space-16) var(--space-24)" }}>
        {onEdit && (
          <button
            onClick={onEdit}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "8px 16px",
              border: "2px solid var(--color-primary-blue)",
              borderRadius: "var(--radius-button)",
              background: "transparent",
              color: "var(--color-primary-blue)",
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background var(--transition-fast)",
            }}
          >
            <Settings size={14} />
            Edit Profile
          </button>
        )}
        {onLogout && (
          <button
            onClick={onLogout}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "8px 16px",
              border: "2px solid var(--color-border-light)",
              borderRadius: "var(--radius-button)",
              background: "transparent",
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background var(--transition-fast)",
            }}
          >
            <LogOut size={14} />
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
