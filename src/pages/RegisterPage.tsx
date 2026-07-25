import { useState, type FormEvent } from "react";
import { User, Mail, Lock, HeartPulse, Eye, EyeOff, UserRound, Stethoscope } from "lucide-react";
import { InputField } from "../components/InputField";
import { PrimaryButton } from "../components/PrimaryButton";

interface RegisterPageProps {
  onRegister: (data: {
    name: string;
    email: string;
    password: string;
    role: "patient" | "doctor";
  }) => void;
  onSwitchToLogin: () => void;
}

export function RegisterPage({ onRegister, onSwitchToLogin }: RegisterPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"patient" | "doctor" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword || !role) {
      setError("Please fill in all fields and select a role");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onRegister({ name, email, password, role });
    }, 800);
  };

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
      <div
        style={{
          width: "100%",
          maxWidth: 440,
          background: "var(--color-surface-primary)",
          borderRadius: "var(--radius-card)",
          border: "1px solid var(--color-border-light)",
          boxShadow: "var(--shadow-lg)",
          padding: "var(--space-32)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, var(--color-primary-green), var(--color-primary-blue))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <HeartPulse size={28} color="#fff" />
          </div>
          <h1
            style={{
              fontFamily: "var(--font-family-title)",
              fontSize: "var(--font-size-2xl)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              margin: 0,
            }}
          >
            Create Account
          </h1>
          <p
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              color: "var(--color-text-secondary)",
              margin: "4px 0 0",
            }}
          >
            Join DIHA FS7TK today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <InputField
            label="Full Name"
            type="text"
            placeholder="Dr. Ahmed Alaoui"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={<User size={16} />}
            fullWidth
            required
          />

          <InputField
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail size={16} />}
            fullWidth
            required
          />

          <div>
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={16} />}
              fullWidth
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "relative",
                float: "right",
                marginTop: -34,
                marginRight: 12,
                background: "none",
                border: "none",
                color: "var(--color-text-muted)",
                cursor: "pointer",
                padding: 4,
              }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div>
            <InputField
              label="Confirm Password"
              type={showConfirm ? "text" : "password"}
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<Lock size={16} />}
              fullWidth
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              style={{
                position: "relative",
                float: "right",
                marginTop: -34,
                marginRight: 12,
                background: "none",
                border: "none",
                color: "var(--color-text-muted)",
                cursor: "pointer",
                padding: 4,
              }}
              aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Role selection */}
          <div>
            <label
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-sm)",
                fontWeight: 500,
                color: "var(--color-text-primary)",
                display: "block",
                marginBottom: 8,
              }}
            >
              I am a
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <button
                type="button"
                onClick={() => setRole("patient")}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  padding: "14px 12px",
                  border: `2px solid ${role === "patient" ? "var(--color-primary-blue)" : "var(--color-border)"}`,
                  borderRadius: "var(--radius-input)",
                  background: role === "patient" ? "var(--color-light-blue)" : "transparent",
                  cursor: "pointer",
                  transition: "all var(--transition-fast)",
                  color: role === "patient" ? "var(--color-primary-blue)" : "var(--color-text-secondary)",
                  fontFamily: "var(--font-family-body)",
                  fontSize: "var(--font-size-sm)",
                  fontWeight: 600,
                }}
              >
                <UserRound size={22} />
                Patient
              </button>
              <button
                type="button"
                onClick={() => setRole("doctor")}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  padding: "14px 12px",
                  border: `2px solid ${role === "doctor" ? "var(--color-primary-green)" : "var(--color-border)"}`,
                  borderRadius: "var(--radius-input)",
                  background: role === "doctor" ? "var(--color-light-green)" : "transparent",
                  cursor: "pointer",
                  transition: "all var(--transition-fast)",
                  color: role === "doctor" ? "var(--color-primary-green)" : "var(--color-text-secondary)",
                  fontFamily: "var(--font-family-body)",
                  fontSize: "var(--font-size-sm)",
                  fontWeight: 600,
                }}
              >
                <Stethoscope size={22} />
                Doctor
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                background: "#fef2f2",
                color: "var(--color-error)",
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-sm)",
                border: "1px solid #fecaca",
              }}
            >
              {error}
            </div>
          )}

          <PrimaryButton type="submit" loading={loading} fullWidth>
            Create Account
          </PrimaryButton>
        </form>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: 24,
            fontFamily: "var(--font-family-body)",
            fontSize: "var(--font-size-sm)",
            color: "var(--color-text-secondary)",
          }}
        >
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            style={{
              background: "none",
              border: "none",
              color: "var(--color-primary-blue)",
              fontWeight: 600,
              cursor: "pointer",
              padding: 0,
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
