import { useState } from "react";
import { SplashPage } from "./pages/SplashPage";
import { ChooseRolePage } from "./pages/ChooseRolePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { PatientDashboardPage } from "./pages/PatientDashboardPage";
import type { PatientView } from "./pages/PatientDashboardPage";
import { DailyCheckInPage } from "./pages/DailyCheckInPage";
import { AIAssistantPage } from "./pages/AIAssistantPage";
import { HealthHistoryPage } from "./pages/HealthHistoryPage";
import { AlertsPage } from "./pages/AlertsPage";
import { ProfilePage } from "./pages/ProfilePage";

type AuthScreen = "splash" | "choose-role" | "login" | "register" | "dashboard";

export default function App() {
  const [screen, setScreen] = useState<AuthScreen>("splash");
  const [patientView, setPatientView] = useState<PatientView>("dashboard");
  const [selectedRole, setSelectedRole] = useState<"patient" | "doctor" | null>(null);

  const handleSplashComplete = () => {
    setScreen("choose-role");
  };

  const handleRoleSelect = (role: "patient" | "doctor") => {
    setSelectedRole(role);
    setScreen("login");
  };

  const handleLogin = () => {
    setPatientView("dashboard");
    setScreen("dashboard");
  };

  const handleRegister = (_data: { name: string; email: string; password: string; role: "patient" | "doctor" }) => {
    setSelectedRole(_data.role);
    setPatientView("dashboard");
    setScreen("dashboard");
  };

  const handleSignOut = () => {
    setSelectedRole(null);
    setPatientView("dashboard");
    setScreen("choose-role");
  };

  const navigatePatient = (view: PatientView) => {
    setPatientView(view);
  };

  // Render patient pages
  if (screen === "dashboard" && selectedRole === "patient") {
    switch (patientView) {
      case "daily-checkin":
        return <DailyCheckInPage onBack={() => navigatePatient("dashboard")} />;
      case "ai-assistant":
        return <AIAssistantPage onBack={() => navigatePatient("dashboard")} />;
      case "health-history":
        return <HealthHistoryPage onBack={() => navigatePatient("dashboard")} />;
      case "alerts":
        return <AlertsPage onBack={() => navigatePatient("dashboard")} />;
      case "profile":
        return <ProfilePage onBack={() => navigatePatient("dashboard")} onLogout={handleSignOut} />;
      default:
        return <PatientDashboardPage onSignOut={handleSignOut} onNavigate={navigatePatient} />;
    }
  }

  switch (screen) {
    case "splash":
      return <SplashPage onComplete={handleSplashComplete} />;

    case "choose-role":
      return (
        <ChooseRolePage
          onSelectRole={handleRoleSelect}
          onBack={() => setScreen("splash")}
        />
      );

    case "login":
      return (
        <LoginPage
          onLogin={handleLogin}
          onSwitchToRegister={() => setScreen("register")}
          onSwitchToSplash={() => setScreen("splash")}
        />
      );

    case "register":
      return (
        <RegisterPage
          onRegister={handleRegister}
          onSwitchToLogin={() => setScreen("login")}
        />
      );

    case "dashboard":
      // Doctor dashboard placeholder
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--color-background)",
            padding: "var(--space-24)",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, var(--color-primary-green), var(--color-primary-blue))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-family-title)",
              fontSize: "var(--font-size-2xl)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              textAlign: "center",
              margin: 0,
            }}
          >
            Doctor Portal
          </h1>
          <p
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-base)",
              color: "var(--color-text-secondary)",
              textAlign: "center",
              maxWidth: 360,
              margin: 0,
            }}
          >
            Coming soon — the doctor dashboard will display patient lists, AI insights, and schedule.
          </p>
          <button
            onClick={handleSignOut}
            style={{
              padding: "8px 20px",
              border: "2px solid var(--color-border)",
              borderRadius: "var(--radius-button)",
              background: "transparent",
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              fontWeight: 600,
              cursor: "pointer",
              marginTop: 8,
            }}
          >
            Sign Out
          </button>
        </div>
      );
  }
}
