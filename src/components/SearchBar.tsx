import { type InputHTMLAttributes, useRef } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  fullWidth,
  style,
  ...props
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      style={{
        position: "relative",
        width: fullWidth ? "100%" : 320,
        maxWidth: "100%",
        ...style,
      }}
    >
      <Search
        size={18}
        style={{
          position: "absolute",
          left: 12,
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--color-text-muted)",
          pointerEvents: "none",
        }}
      />

      <input
        ref={inputRef}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 36px 10px 40px",
          border: "2px solid var(--color-border)",
          borderRadius: "var(--radius-input)",
          background: "var(--color-surface-primary)",
          color: "var(--color-text-primary)",
          fontFamily: "var(--font-family-body)",
          fontSize: "var(--font-size-sm)",
          lineHeight: 1.5,
          outline: "none",
          transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border-focus)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(9, 93, 126, 0.12)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border)";
          e.currentTarget.style.boxShadow = "none";
        }}
        {...props}
      />

      {value && (
        <button
          onClick={() => onChange("")}
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 24,
            height: 24,
            borderRadius: "50%",
            border: "none",
            background: "var(--color-border-light)",
            color: "var(--color-text-muted)",
            cursor: "pointer",
            transition: "background var(--transition-fast)",
          }}
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
