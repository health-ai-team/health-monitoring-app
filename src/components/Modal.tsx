import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnOverlay?: boolean;
}

const sizeWidths = {
  sm: 400,
  md: 520,
  lg: 640,
  xl: 800,
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
}: ModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--z-modal)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-16)",
      }}
    >
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
          zIndex: -1,
        }}
        onClick={() => closeOnOverlay && onClose()}
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          width: "100%",
          maxWidth: sizeWidths[size],
          maxHeight: "90vh",
          borderRadius: "var(--radius-card)",
          background: "var(--color-surface-primary)",
          boxShadow: "var(--shadow-xl)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animation: "modal-enter 0.2s ease-out",
        }}
      >
        {/* Header */}
        {(title || description) && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "var(--space-24) var(--space-24) var(--space-16)",
              borderBottom: "1px solid var(--color-border-light)",
            }}
          >
            <div>
              {title && (
                <h2
                  style={{
                    fontFamily: "var(--font-family-title)",
                    fontSize: "var(--font-size-xl)",
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                    margin: 0,
                  }}
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  style={{
                    fontFamily: "var(--font-family-body)",
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-text-secondary)",
                    margin: "4px 0 0",
                  }}
                >
                  {description}
                </p>
              )}
            </div>

            <button
              onClick={onClose}
              style={{
                flexShrink: 0,
                background: "var(--color-surface-secondary)",
                border: "none",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                color: "var(--color-text-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                transition: "background var(--transition-fast)",
              }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Body */}
        {children && (
          <div
            style={{
              padding: "var(--space-24)",
              overflowY: "auto",
              flex: 1,
            }}
          >
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div
            style={{
              padding: "var(--space-16) var(--space-24)",
              borderTop: "1px solid var(--color-border-light)",
              display: "flex",
              justifyContent: "flex-end",
              gap: "var(--space-12)",
            }}
          >
            {footer}
          </div>
        )}
      </div>

      <style>{`
        @keyframes modal-enter {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
