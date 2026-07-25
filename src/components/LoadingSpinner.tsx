import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  fullPage?: boolean;
}

const sizeMap: Record<string, number> = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

export function LoadingSpinner({
  size = "md",
  label,
  fullPage,
}: LoadingSpinnerProps) {
  const iconSize = sizeMap[size];

  const spinner = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <Loader2
        size={iconSize}
        style={{
          color: "var(--color-primary-blue)",
          animation: "spinner-rotate 1s linear infinite",
        }}
      />
      {label && (
        <span
          style={{
            fontFamily: "var(--font-family-body)",
            fontSize: "var(--font-size-sm)",
            color: "var(--color-text-secondary)",
          }}
        >
          {label}
        </span>
      )}
      <style>{`
        @keyframes spinner-rotate {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  if (fullPage) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          width: "100%",
          background: "var(--color-background)",
        }}
      >
        {spinner}
      </div>
    );
  }

  return spinner;
}
