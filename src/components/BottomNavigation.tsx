import type { ReactNode } from "react";

interface BottomNavTab {
  icon: ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

interface BottomNavigationProps {
  tabs: BottomNavTab[];
}

export function BottomNavigation({ tabs }: BottomNavigationProps) {
  return (
    <nav
      style={{
        display: "none",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: "var(--z-sticky)",
        background: "var(--color-surface-primary)",
        borderTop: "1px solid var(--color-border-light)",
        padding: "8px 0",
        paddingBottom: "max(8px, env(safe-area-inset-bottom))",
      }}
      className="bottom-nav"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
        }}
      >
        {tabs.map((tab) => (
          <a
            key={tab.href}
            href={tab.href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: "4px 16px",
              textDecoration: "none",
              color: tab.active
                ? "var(--color-primary-blue)"
                : "var(--color-text-muted)",
              position: "relative",
            }}
          >
            {tab.active && (
              <div
                style={{
                  position: "absolute",
                  top: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 24,
                  height: 3,
                  borderRadius: 2,
                  background: "var(--color-primary-blue)",
                }}
              />
            )}
            <div style={{ display: "flex" }}>{tab.icon}</div>
            <span
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: 10,
                fontWeight: tab.active ? 600 : 500,
              }}
            >
              {tab.label}
            </span>
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .bottom-nav {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}
