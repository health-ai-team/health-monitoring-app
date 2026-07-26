import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Send,
  Bot,
  Sparkles,
  Heart,
  Activity,
  Pill,
  Stethoscope,
  Lightbulb,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Clock,
  Brain,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ── Mock AI Responses ──────────────────────────────────────

const mockResponses: Record<string, string> = {
  default:
    "That's a great question! Based on your health profile, I'd recommend discussing this with your primary care physician for personalized advice. In the meantime, keep tracking your vitals regularly and maintaining a healthy lifestyle. Would you like me to elaborate on any specific aspect?",

  heart:
    "Looking at your recent cardiac data, here's what I can see:\n\n**Heart Rate** — Your average resting heart rate this week is **72 bpm**, which is well within the normal range (60–100 bpm).\n\n**Blood Pressure** — Your latest reading was **120/80 mmHg**, which is considered optimal.\n\n**Trend** — Both metrics have been stable over the past 7 days with no concerning fluctuations.\n\n> 💡 **Tip:** Consistent readings like yours are a great sign of cardiovascular health. Keep up your current routine!",

  vitals:
    "Here's a breakdown of what your vital signs mean:\n\n**❤️ Heart Rate (72 bpm)** — Number of heartbeats per minute. Normal is 60–100 at rest.\n\n**🩸 Blood Pressure (120/80)** — Measures the force of blood against artery walls. Below 130/85 is considered healthy.\n\n**🌡️ Temperature (36.6°C)** — Body temperature. Normal range is 36.1–37.2°C.\n\n**💨 Oxygen (98%)** — Blood oxygen saturation. 95–100% is normal.\n\nAll your current readings are in the healthy range!",

  medication:
    "I see you're currently taking **4 medications**:\n\n1. **Lisinopril** (10mg) — For blood pressure, taken with breakfast\n2. **Metformin** (500mg) — For blood sugar, taken with meals\n3. **Atorvastatin** (20mg) — For cholesterol, taken at bedtime\n4. **Vitamin D3** (2000 IU) — Supplement, taken with breakfast\n\n📊 Your 7-day adherence rate is **85%** — that's great! Remember to take your evening doses consistently.",

  sleep:
    "Based on your tracked sleep patterns:\n\n**Average sleep duration:** 7.2 hours\n**Target:** 8 hours\n\nYou're close to your goal! Here are some tips:\n\n• Maintain a consistent sleep schedule\n• Avoid screens 30 minutes before bed\n• Keep your bedroom cool and dark\n• Limit caffeine after 2 PM\n\nWould you like me to suggest a personalized sleep routine?",

  diet:
    "Here are some nutrition recommendations based on your health profile:\n\n**🥗 Heart-Healthy Diet**\n• Increase omega-3 fatty acids (salmon, walnuts, flaxseeds)\n• Reduce sodium intake to < 2,300mg per day\n• Eat plenty of leafy greens and berries\n\nYour current calorie intake is **1,450 kcal/day** — which is appropriate for your goals. Aim for 8 glasses of water daily (you're averaging 4).",
};

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("heart") || lower.includes("cardiac") || lower.includes("cardio")) {
    return mockResponses.heart;
  }
  if (lower.includes("vital") || lower.includes("blood pressure") || lower.includes("temperature") || lower.includes("oxygen") || lower.includes("hr") || lower.includes("bpm")) {
    return mockResponses.vitals;
  }
  if (lower.includes("medication") || lower.includes("medicine") || lower.includes("pill") || lower.includes("drug") || lower.includes("prescription")) {
    return mockResponses.medication;
  }
  if (lower.includes("sleep") || lower.includes("insomnia") || lower.includes("tired") || lower.includes("rest")) {
    return mockResponses.sleep;
  }
  if (lower.includes("diet") || lower.includes("food") || lower.includes("eat") || lower.includes("nutrition") || lower.includes("meal") || lower.includes("calorie")) {
    return mockResponses.diet;
  }
  return mockResponses.default;
}

// ── Suggested Questions ────────────────────────────────────

const suggestions = [
  { label: "How is my heart health?", icon: Heart, query: "How is my heart health looking this week?" },
  { label: "Explain my vitals", icon: Activity, query: "Can you explain what my vital signs mean?" },
  { label: "About my medications", icon: Pill, query: "Tell me about my current medications" },
  { label: "Sleep tips", icon: Stethoscope, query: "How can I improve my sleep quality?" },
];

// ── Typing Indicator ───────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 px-4 sm:px-6 animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shrink-0 shadow-sm">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}

// ── Message Component ──────────────────────────────────────

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 sm:px-6 animate-fade-in",
        isUser ? "flex-row-reverse" : ""
      )}
    >
      {/* Avatar */}
      {isUser ? (
        <Avatar fallback="JD" size="sm" className="ring-2 ring-teal-100 shrink-0" />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shrink-0 shadow-sm">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Bubble */}
      <div className={cn("max-w-[85%] sm:max-w-[75%] lg:max-w-[65%] space-y-1")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
            isUser
              ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-tr-sm"
              : "bg-gray-100 text-gray-800 rounded-tl-sm"
          )}
        >
          {message.content}
        </div>

        {/* Message footer */}
        <div className={cn("flex items-center gap-2 px-1", isUser && "justify-end")}>
          <span className="text-[10px] text-gray-400">
            {message.timestamp.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {!isUser && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1 rounded hover:bg-gray-100 text-gray-300 hover:text-gray-500">
                <Copy className="w-3 h-3" />
              </button>
              <button className="p-1 rounded hover:bg-gray-100 text-gray-300 hover:text-gray-500">
                <ThumbsUp className="w-3 h-3" />
              </button>
              <button className="p-1 rounded hover:bg-gray-100 text-gray-300 hover:text-gray-500">
                <ThumbsDown className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────

export default function AiChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = (content: string) => {
    if (!content.trim() || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setShowSuggestions(false);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: getMockResponse(content),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (query: string) => {
    sendMessage(query);
  };

  const clearChat = () => {
    setMessages([]);
    setShowSuggestions(true);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] animate-fade-in">
      {/* ═══ Header ═══ */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-sm">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-gray-900">AI Health Assistant</h1>
              <Badge variant="secondary" size="sm" className="gap-1">
                <Sparkles className="w-3 h-3" />
                Beta
              </Badge>
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Online · Health insights powered by AI
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearChat}
            className="text-gray-400 hover:text-gray-600 text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" />
            New chat
          </Button>
        </div>
      </div>

      {/* ═══ Messages Area ═══ */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 scroll-smooth custom-scrollbar">
        {/* Welcome State */}
        {messages.length === 0 && !isTyping && (
          <div className="flex flex-col items-center text-center px-4 pt-4 sm:pt-8">
            {/* AI Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-200 mb-4">
              <Bot className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Hello! I'm your AI Health Assistant
            </h2>
            <p className="text-sm text-gray-500 max-w-md leading-relaxed mb-6">
              I can help you understand your health data, answer questions about your vitals,
              explain medications, and provide personalized wellness insights.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-8 w-full max-w-sm">
              <div className="bg-teal-50 rounded-xl p-3">
                <Activity className="w-4 h-4 text-teal-600 mx-auto mb-1" />
                <p className="text-xs text-gray-500">Vitals</p>
                <p className="text-xs font-semibold text-teal-700">Real-time</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-3">
                <Pill className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                <p className="text-xs text-gray-500">Medications</p>
                <p className="text-xs font-semibold text-purple-700">Tracker</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-3">
                <Lightbulb className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <p className="text-xs text-gray-500">Insights</p>
                <p className="text-xs font-semibold text-amber-700">Personalized</p>
              </div>
            </div>

            {/* Suggested Questions */}
            {showSuggestions && (
              <div className="w-full max-w-lg">
                <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wider">
                  Try asking me
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.label}
                      onClick={() => handleSuggestion(suggestion.query)}
                      className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 hover:border-teal-200 hover:bg-teal-50/50 transition-all duration-200 text-left group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-teal-100 flex items-center justify-center shrink-0 transition-colors">
                        <suggestion.icon className="w-4 h-4 text-gray-600 group-hover:text-teal-600 transition-colors" />
                      </div>
                      <span className="text-sm text-gray-600 group-hover:text-teal-700 transition-colors">
                        {suggestion.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Chat Messages */}
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {/* Typing Indicator */}
        {isTyping && <TypingIndicator />}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* ═══ Input Area ═══ */}
      <div className="pt-3 border-t border-gray-100">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your health, vitals, or medications..."
              className="w-full h-11 px-4 pr-12 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition-all"
              disabled={isTyping}
            />
            {input.length > 0 && (
              <button
                type="button"
                onClick={() => setInput("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                tabIndex={-1}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
          <Button
            type="submit"
            disabled={!input.trim() || isTyping}
            className={cn(
              "h-11 w-11 rounded-xl flex items-center justify-center shrink-0 transition-all",
              input.trim() && !isTyping
                ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-200 hover:shadow-xl hover:from-teal-500 hover:to-teal-400"
                : "bg-gray-100 text-gray-300"
            )}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>

        {/* Footer info */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-[10px] text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Responses are simulated · Not medical advice
          </p>
          <Badge variant="outline" size="sm" className="text-[10px] gap-1">
            <Brain className="w-3 h-3" />
            HealthGPT
          </Badge>
        </div>
      </div>
    </div>
  );
}
