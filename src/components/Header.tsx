import type { ReactNode } from "react";
import { SearchBar } from "./SearchBar";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface HeaderProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
  actions?: ReactNode;
}

export function Header({ title, breadcrumbs, search, actions }: HeaderProps) {
  return (
    <header
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-12)",
        padding: "var(--space-24)",
        background: "var(--color-surface-primary)",
        borderBottom: "1px solid var(--color-border-light)",
      }}
    >
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          {breadcrumbs.map((crumb, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {i > 0 && (
                <span style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-xs)" }}>
                  /
                </span>
              )}
              {crumb.href ? (
                <a
                  href={crumb.href}
                  style={{
                    fontSize: "var(--font-size-xs)",
                    color: "var(--color-text-muted)",
                    textDecoration: "none",
                    fontFamily: "var(--font-family-body)",
                  }}
                >
                  {crumb.label}
                </a>
              ) : (
                <span
                  style={{
                    fontSize: "var(--font-size-xs)",
                    color: "var(--color-text-secondary)",
                    fontFamily: "var(--font-family-body)",
                  }}
                >
                  {crumb.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      )}

      {/* Title row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-16)",
          flexWrap: "wrap",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-family-title)",
            fontSize: "var(--font-size-2xl)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            letterSpacing: "var(--letter-spacing-tight)",
            margin: 0,
          }}
        >
          {title}
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-12)",
            flexWrap: "wrap",
          }}
        >
          {search && (
            <SearchBar
              value={search.value}
              onChange={search.onChange}
              placeholder={search.placeholder}
            />
          )}
          {actions}
        </div>
      </div>
    </header>
  );
}
