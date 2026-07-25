import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, ArrowLeft, Bot } from "lucide-react";

interface AIAssistantPageProps {
  onBack: () => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "0",
    role: "assistant",
    content: "Hello! I'm your AI health assistant. I can help you understand your health data, answer questions about symptoms, provide wellness tips, and track your health goals. How can I help you today?",
    timestamp: new Date(),
  },
];

const suggestedPrompts = [
  "What do my vitals mean?",
  "Tips for better sleep",
  "Explain my blood pressure",
  "Healthy eating advice",
];

const botResponses: Record<string, string> = {
  "default": "That's a great question! Based on your health data, I'd recommend keeping track of how you feel and consulting with your doctor for personalized medical advice. Would you like me to help you with anything else?",
  "what do my vitals mean": "Your vitals are key indicators of your overall health. Here's a quick overview:\n\n• **Heart Rate (72 bpm)**: Normal resting rate is 60-100 bpm. Yours is in the healthy range!\n• **Blood Pressure (128/82)**: Slightly elevated. A reading under 120/80 is ideal.\n• **Blood Sugar (95 mg/dL)**: Normal fasting glucose is 70-100 mg/dL.\n• **SpO₂ (98%)**: Excellent oxygen saturation (95-100% is normal).\n\nTrack these regularly to spot trends!",
  "tips for better sleep": "Here are some science-backed tips for better sleep:\n\n1. **Stick to a schedule** — Go to bed and wake up at the same time daily\n2. **Limit screen time** — Avoid phones/laptops 1 hour before bed\n3. **Cool room** — 65-68°F (18-20°C) is ideal for sleep\n4. **Avoid caffeine after 2 PM**\n5. **Wind-down routine** — Try reading or meditation\n\nYou're averaging 7h 24m which is good, but quality matters too!",
  "explain my blood pressure": "Your latest reading was **128/82 mmHg**, which is classified as **elevated** (not yet high blood pressure).\n\n• **Systolic (128)**: The pressure when your heart beats\n• **Diastolic (82)**: The pressure between beats\n\n**Normal**: <120/80\n**Elevated**: 120-129/<80\n**Stage 1 HTN**: 130-139/80-89\n\nA follow-up check is recommended within 3 days. Try reducing sodium intake and staying active!",
  "healthy eating advice": "Great question! Here are personalized nutrition tips:\n\n• **Mediterranean diet** — Rich in fruits, veggies, whole grains, and healthy fats\n• **Reduce sodium** — Aim for <2,300mg per day\n• **Stay hydrated** — You're at 5 cups, try to reach 8 cups daily\n• **Limit processed foods** — They often contain hidden sugars and sodium\n\nWant me to create a sample meal plan for you?",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const [key, response] of Object.entries(botResponses)) {
    if (key !== "default" && lower.includes(key)) {
      return response;
    }
  }
  return botResponses.default;
}

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 4, padding: "4px 0" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--color-text-muted)",
            animation: "typing-dot 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes typing-dot {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

export function AIAssistantPage({ onBack }: AIAssistantPageProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--color-background)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "var(--space-16) var(--space-24)",
          borderBottom: "1px solid var(--color-border-light)",
          background: "var(--color-surface-primary)",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-text-secondary)",
            display: "flex",
            padding: 4,
          }}
          aria-label="Back"
        >
          <ArrowLeft size={20} />
        </button>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "linear-gradient(135deg, var(--color-primary-green), var(--color-primary-blue))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <Sparkles size={18} />
        </div>
        <div>
          <h2
            style={{
              fontFamily: "var(--font-family-title)",
              fontSize: "var(--font-size-base)",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              margin: 0,
            }}
          >
            AI Health Assistant
          </h2>
          <span
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-xs)",
              color: isTyping ? "var(--color-primary-green)" : "var(--color-text-muted)",
            }}
          >
            {isTyping ? "Typing..." : "Online"}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "var(--space-24)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {messages.length === 1 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 8,
            }}
          >
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => {
                  setInput(prompt);
                }}
                style={{
                  padding: "8px 14px",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-full)",
                  background: "var(--color-surface-primary)",
                  cursor: "pointer",
                  fontFamily: "var(--font-family-body)",
                  fontSize: "var(--font-size-xs)",
                  color: "var(--color-text-secondary)",
                  transition: "all var(--transition-fast)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-primary-blue)"; e.currentTarget.style.color = "var(--color-primary-blue)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-text-secondary)"; }}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              gap: 8,
            }}
          >
            {msg.role === "assistant" && (
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, var(--color-primary-green), var(--color-primary-blue))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  flexShrink: 0,
                  marginTop: 4,
                }}
              >
                <Bot size={16} />
              </div>
            )}

            <div style={{ maxWidth: "75%" }}>
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: 16,
                  background: msg.role === "user" ? "var(--color-primary-blue)" : "var(--color-surface-primary)",
                  color: msg.role === "user" ? "#fff" : "var(--color-text-primary)",
                  fontFamily: "var(--font-family-body)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                  border: msg.role === "user" ? "none" : "1px solid var(--color-border-light)",
                  borderBottomRightRadius: msg.role === "user" ? 4 : 16,
                  borderBottomLeftRadius: msg.role === "assistant" ? 4 : 16,
                  boxShadow: msg.role === "user" ? "0 2px 8px rgba(9, 93, 126, 0.2)" : "var(--shadow-sm)",
                }}
              >
                {msg.content}
              </div>
              <div
                style={{
                  fontSize: "var(--font-size-xs)",
                  color: "var(--color-text-muted)",
                  marginTop: 4,
                  textAlign: msg.role === "user" ? "right" : "left",
                  fontFamily: "var(--font-family-body)",
                }}
              >
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: "flex", gap: 8 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, var(--color-primary-green), var(--color-primary-blue))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                flexShrink: 0,
              }}
            >
              <Bot size={16} />
            </div>
            <div
              style={{
                padding: "14px 18px",
                borderRadius: 16,
                background: "var(--color-surface-primary)",
                border: "1px solid var(--color-border-light)",
                borderBottomLeftRadius: 4,
              }}
            >
              <TypingDots />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div
        style={{
          padding: "var(--space-16) var(--space-24)",
          borderTop: "1px solid var(--color-border-light)",
          background: "var(--color-surface-primary)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "flex-end",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your health assistant anything..."
            style={{
              flex: 1,
              padding: "12px 16px",
              border: "2px solid var(--color-border)",
              borderRadius: "var(--radius-input)",
              background: "var(--color-surface-secondary)",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              outline: "none",
              transition: "border-color var(--transition-fast)",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-border-focus)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            style={{
              width: 44,
              height: 44,
              borderRadius: "var(--radius-input)",
              border: "none",
              background: input.trim() && !isTyping
                ? "linear-gradient(135deg, var(--color-primary-blue), #0a7a9e)"
                : "var(--color-border-light)",
              color: input.trim() && !isTyping ? "#fff" : "var(--color-text-muted)",
              cursor: input.trim() && !isTyping ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all var(--transition-fast)",
              flexShrink: 0,
            }}
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
        <p
          style={{
            fontFamily: "var(--font-family-body)",
            fontSize: "var(--font-size-xs)",
            color: "var(--color-text-muted)",
            textAlign: "center",
            margin: "8px 0 0",
          }}
        >
          AI-generated for informational purposes. Not a substitute for medical advice.
        </p>
      </div>
    </div>
  );
}
