import { useState, type FormEvent } from "react";
import { Mail, Lock, HeartPulse, Eye, EyeOff } from "lucide-react";
import { InputField } from "../components/InputField";
import { Checkbox } from "../components/Checkbox";
import { PrimaryButton } from "../components/PrimaryButton";

interface LoginPageProps {
  onLogin: (data: { email: string; password: string; remember: boolean }) => void;
  onSwitchToRegister: () => void;
  onSwitchToSplash?: () => void;
}

export function LoginPage({ onLogin, onSwitchToRegister, onSwitchToSplash }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    // Simulate async login
    setTimeout(() => {
      setLoading(false);
      onLogin({ email, password, remember });
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
      {/* Logo top-left */}
      <button
        onClick={onSwitchToSplash}
        style={{
          position: "fixed",
          top: 24,
          left: 24,
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "var(--color-primary-blue)",
          fontFamily: "var(--font-family-title)",
          fontWeight: 700,
          fontSize: "var(--font-size-base)",
        }}
      >
        <HeartPulse size={22} />
        DIHA
      </button>

      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "var(--color-surface-primary)",
          borderRadius: "var(--radius-card)",
          border: "1px solid var(--color-border-light)",
          boxShadow: "var(--shadow-lg)",
          padding: "var(--space-32)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, var(--color-primary-blue), var(--color-primary-green))",
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
            Welcome Back
          </h1>
          <p
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              color: "var(--color-text-secondary)",
              margin: "4px 0 0",
            }}
          >
            Sign in to your health portfolio
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
              placeholder="Enter your password"
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

          {/* Remember me + Forgot password */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Checkbox
              label="Remember me"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "var(--color-primary-blue)",
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-sm)",
                fontWeight: 500,
                cursor: "pointer",
                padding: 0,
              }}
            >
              Forgot password?
            </button>
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
            Sign In
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
          Don't have an account?{" "}
          <button
            onClick={onSwitchToRegister}
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
            Create one
          </button>
        </div>
      </div>
    </div>
  );
}
