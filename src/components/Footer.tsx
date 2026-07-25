import { HeartPulse } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  sections?: FooterSection[];
  copyright?: string;
}

export function Footer({
  sections = [
    {
      title: "Platform",
      links: [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Health Records", href: "/records" },
        { label: "Appointments", href: "/appointments" },
        { label: "Messages", href: "/messages" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} DIHA FS7TK. All rights reserved.`,
}: FooterProps) {
  return (
    <footer
      style={{
        background: "var(--color-surface-primary)",
        borderTop: "1px solid var(--color-border-light)",
        padding: "var(--space-48) var(--space-24) var(--space-32)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-width-content)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "var(--space-32)",
        }}
      >
        {/* Brand column */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <HeartPulse size={24} style={{ color: "var(--color-primary-green)" }} />
            <span
              style={{
                fontFamily: "var(--font-family-title)",
                fontWeight: 700,
                fontSize: "var(--font-size-lg)",
                color: "var(--color-primary-blue)",
              }}
            >
              DIHA FS7TK
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
              marginBottom: 0,
            }}
          >
            Your Digital Health Portfolio
          </p>
        </div>

        {sections.map((section) => (
          <div key={section.title}>
            <h4
              style={{
                fontFamily: "var(--font-family-title)",
                fontSize: "var(--font-size-sm)",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: 16,
              }}
            >
              {section.title}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {section.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-family-body)",
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                    transition: "color var(--transition-fast)",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: "var(--max-width-content)",
          margin: "32px auto 0",
          paddingTop: "var(--space-24)",
          borderTop: "1px solid var(--color-border-light)",
          textAlign: "center",
          fontFamily: "var(--font-family-body)",
          fontSize: "var(--font-size-sm)",
          color: "var(--color-text-muted)",
        }}
      >
        {copyright}
      </div>
    </footer>
  );
}
