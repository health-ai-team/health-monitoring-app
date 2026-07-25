import { useEffect, useState } from "react";
import { HeartPulse } from "lucide-react";

interface SplashPageProps {
  onComplete: () => void;
  duration?: number;
}

export function SplashPage({ onComplete, duration = 2500 }: SplashPageProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 400);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, var(--color-primary-blue) 0%, #0a7a9e 60%, var(--color-primary-green) 100%)",
        padding: "var(--space-24)",
        transition: "opacity 0.4s ease",
        opacity: fadeOut ? 0 : 1,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-20%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "-15%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 24,
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            animation: "splash-logo-bounce 0.6s ease-out",
          }}
        >
          <HeartPulse size={44} color="#fff" />
        </div>

        {/* App Name */}
        <h1
          style={{
            fontFamily: "var(--font-family-title)",
            fontSize: "clamp(2rem, 6vw, 2.75rem)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "var(--letter-spacing-tight)",
            margin: 0,
            animation: "splash-fade-up 0.6s ease-out 0.1s both",
          }}
        >
          DIHA FS7TK
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-family-body)",
            fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
            color: "rgba(255,255,255,0.75)",
            marginTop: 8,
            marginBottom: 48,
            fontWeight: 400,
            animation: "splash-fade-up 0.6s ease-out 0.2s both",
          }}
        >
          Your Digital Health Portfolio
        </p>

        {/* Loading animation */}
        <div
          style={{
            display: "flex",
            gap: 6,
            animation: "splash-fade-up 0.6s ease-out 0.3s both",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.6)",
                animation: "splash-dot-pulse 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes splash-logo-bounce {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes splash-fade-up {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes splash-dot-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
