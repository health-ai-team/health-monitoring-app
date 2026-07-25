import { useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarItem {
  icon: ReactNode;
  label: string;
  href: string;
  active?: boolean;
  badge?: number;
}

interface SidebarProps {
  items: SidebarItem[];
  header?: ReactNode;
  footer?: ReactNode;
  collapsible?: boolean;
}

export function Sidebar({
  items,
  header,
  footer,
  collapsible = true,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{
        display: "flex",
        flexDirection: "column",
        width: collapsed ? 72 : "var(--sidebar-width)",
        height: "100vh",
        background: "var(--color-surface-primary)",
        borderRight: "1px solid var(--color-border-light)",
        transition: "width var(--transition-base)",
        overflow: "hidden",
        position: "sticky",
        top: 0,
      }}
      className="sidebar"
    >
      {/* Header */}
      {header && (
        <div
          style={{
            padding: collapsed ? "var(--space-16) var(--space-12)" : "var(--space-16) var(--space-24)",
            borderBottom: "1px solid var(--color-border-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            minHeight: 64,
          }}
        >
          <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
            {collapsed ? null : header}
          </div>

          {collapsible && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              style={{
                background: "var(--color-surface-secondary)",
                border: "1px solid var(--color-border-light)",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                color: "var(--color-text-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                flexShrink: 0,
                transition: "background var(--transition-fast)",
              }}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          )}
        </div>
      )}

      {/* Navigation items */}
      <nav
        style={{
          flex: 1,
          padding: "var(--space-8)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflowY: "auto",
        }}
      >
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: collapsed ? "var(--space-12)" : "var(--space-12) var(--space-16)",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              background: item.active ? "var(--color-light-blue)" : "transparent",
              color: item.active
                ? "var(--color-primary-blue)"
                : "var(--color-text-secondary)",
              fontWeight: item.active ? 600 : 500,
              fontSize: "var(--font-size-sm)",
              fontFamily: "var(--font-family-body)",
              transition: "all var(--transition-fast)",
              justifyContent: collapsed ? "center" : "flex-start",
              position: "relative",
            }}
            title={collapsed ? item.label : undefined}
          >
            <div style={{ flexShrink: 0, display: "flex" }}>
              {item.icon}
            </div>

            {!collapsed && (
              <span style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
                {item.label}
              </span>
            )}

            {!collapsed && item.badge && (
              <span
                style={{
                  marginLeft: "auto",
                  background: "var(--color-primary-blue)",
                  color: "#fff",
                  fontSize: "var(--font-size-xs)",
                  fontWeight: 600,
                  borderRadius: "var(--radius-full)",
                  padding: "2px 8px",
                  minWidth: 20,
                  textAlign: "center",
                }}
              >
                {item.badge}
              </span>
            )}
          </a>
        ))}
      </nav>

      {/* Footer */}
      {footer && (
        <div
          style={{
            padding: collapsed ? "var(--space-12)" : "var(--space-16) var(--space-24)",
            borderTop: "1px solid var(--color-border-light)",
            display: "flex",
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          {collapsed ? null : footer}
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .sidebar {
            display: none;
          }
        }
      `}</style>
    </aside>
  );
}
