import { useState, type ReactNode } from "react";
import { Menu, X, HeartPulse } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

interface NavbarProps {
  links: NavLink[];
  logo?: ReactNode;
  actions?: ReactNode;
}

export function Navbar({
  links,
  logo = (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <HeartPulse size={24} style={{ color: "var(--color-primary-green)" }} />
      <span
        style={{
          fontFamily: "var(--font-family-title)",
          fontWeight: 700,
          fontSize: "var(--font-size-lg)",
          color: "var(--color-primary-blue)",
          letterSpacing: "var(--letter-spacing-tight)",
        }}
      >
        DIHA
      </span>
    </div>
  ),
  actions,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: "var(--z-sticky)",
        background: "var(--color-surface-primary)",
        borderBottom: "1px solid var(--color-border-light)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-width-content)",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--space-12) var(--space-24)",
        }}
      >
        {logo}

        {/* Desktop links */}
        <div
          style={{
            display: "none",
            alignItems: "center",
            gap: 32,
          }}
          className="nav-desktop-links"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-sm)",
                fontWeight: link.active ? 600 : 500,
                color: link.active
                  ? "var(--color-primary-blue)"
                  : "var(--color-text-secondary)",
                textDecoration: "none",
                paddingBottom: 4,
                borderBottom: link.active ? "2px solid var(--color-primary-blue)" : "2px solid transparent",
                transition: "color var(--transition-fast), border-color var(--transition-fast)",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {actions}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "var(--color-text-primary)",
              cursor: "pointer",
              padding: 4,
            }}
            className="nav-mobile-toggle"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            padding: "var(--space-16) var(--space-24)",
            borderTop: "1px solid var(--color-border-light)",
            background: "var(--color-surface-primary)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-family-body)",
                  fontSize: "var(--font-size-base)",
                  fontWeight: link.active ? 600 : 500,
                  color: link.active
                    ? "var(--color-primary-blue)"
                    : "var(--color-text-secondary)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .nav-desktop-links { display: flex !important; }
          .nav-mobile-toggle { display: none !important; }
        }
        @media (max-width: 767px) {
          .nav-desktop-links { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
