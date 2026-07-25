import { User, Check, CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  content: string;
  sender: "patient" | "doctor" | "user" | "system";
  senderName: string;
  timestamp: string;
  avatarUrl?: string;
  status?: "sent" | "delivered" | "read";
}

const senderAlignment: Record<string, React.CSSProperties["justifyContent"]> = {
  user: "flex-end",
  patient: "flex-start",
  doctor: "flex-start",
  system: "center",
};

const senderColors: Record<string, { bg: string; color: string }> = {
  user: { bg: "var(--color-primary-blue)", color: "#fff" },
  patient: { bg: "var(--color-surface-secondary)", color: "var(--color-text-primary)" },
  doctor: { bg: "var(--color-light-green)", color: "var(--color-text-primary)" },
  system: { bg: "var(--color-border-light)", color: "var(--color-text-secondary)" },
};

function MessageStatus({ status }: { status?: string }) {
  if (!status) return null;

  return (
    <span style={{ display: "inline-flex", alignItems: "center", marginLeft: 4 }}>
      {status === "sent" && <Check size={12} style={{ color: "var(--color-text-muted)" }} />}
      {status === "delivered" && <CheckCheck size={12} style={{ color: "var(--color-text-muted)" }} />}
      {status === "read" && <CheckCheck size={12} style={{ color: "var(--color-primary-blue)" }} />}
    </span>
  );
}

export function MessageBubble({
  content,
  sender,
  senderName,
  timestamp,
  avatarUrl,
  status,
}: MessageBubbleProps) {
  const align = senderAlignment[sender] || "flex-start";
  const colors = senderColors[sender] || senderColors.system;
  const isSystem = sender === "system";

  if (isSystem) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "8px 0",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-family-body)",
            fontSize: "var(--font-size-xs)",
            color: "var(--color-text-muted)",
            background: "var(--color-border-light)",
            padding: "4px 12px",
            borderRadius: "var(--radius-full)",
          }}
        >
          {content}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: align,
        gap: 8,
        maxWidth: "80%",
        alignSelf: align === "flex-end" ? "flex-end" : "flex-start",
      }}
    >
      {/* Avatar for received messages */}
      {align === "flex-start" && (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "var(--color-light-blue)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-primary-blue)",
            flexShrink: 0,
            marginTop: 4,
          }}
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt={senderName} style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
          ) : (
            <User size={14} />
          )}
        </div>
      )}

      <div>
        {align === "flex-start" && (
          <span
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-xs)",
              color: "var(--color-text-muted)",
              fontWeight: 500,
              display: "block",
              marginBottom: 4,
            }}
          >
            {senderName}
          </span>
        )}

        <div
          style={{
            padding: "10px 14px",
            borderRadius: 16,
            background: colors.bg,
            color: colors.color,
            fontFamily: "var(--font-family-body)",
            fontSize: "var(--font-size-sm)",
            lineHeight: 1.5,
            wordBreak: "break-word",
            borderBottomLeftRadius: align === "flex-start" ? 4 : 16,
            borderBottomRightRadius: align === "flex-end" ? 4 : 16,
          }}
        >
          {content}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: align === "flex-end" ? "flex-end" : "flex-start",
            gap: 4,
            marginTop: 4,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-xs)",
              color: "var(--color-text-muted)",
            }}
          >
            {timestamp}
          </span>
          {align === "flex-end" && <MessageStatus status={status} />}
        </div>
      </div>
    </div>
  );
}
