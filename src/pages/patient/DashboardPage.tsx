import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  Heart,
  Activity,
  Thermometer,
  Droplets,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  Bell,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ClipboardList,
  MessageSquare,
  Clock,
  Target,
  Footprints,
  Moon,
  Droplet,
  Apple,
  Sparkles,
  Timer,
} from "lucide-react";

// ── Mock Data ──────────────────────────────────────────────

const timeOfDay = () => {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  return "evening";
};

const greetings: Record<string, string> = {
  morning: "Good morning",
  afternoon: "Good afternoon",
  evening: "Good evening",
};

interface Vital {
  id: string;
  label: string;
  value: string;
  unit: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "normal" | "warning" | "critical";
  trend: "up" | "down" | "stable";
  change: string;
  color: string;
  bg: string;
  range: string;
  history: number[];
}

const vitals: Vital[] = [
  {
    id: "heart_rate",
    label: "Heart Rate",
    value: "72",
    unit: "bpm",
    icon: Heart,
    status: "normal",
    trend: "stable",
    change: "+2",
    color: "text-rose-600",
    bg: "bg-rose-50",
    range: "60–100 bpm",
    history: [68, 72, 70, 75, 73, 71, 72],
  },
  {
    id: "blood_pressure",
    label: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
    icon: Activity,
    status: "normal",
    trend: "down",
    change: "-5",
    color: "text-teal-600",
    bg: "bg-teal-50",
    range: "< 130/85 mmHg",
    history: [128, 125, 122, 118, 120, 119, 120],
  },
  {
    id: "temperature",
    label: "Temperature",
    value: "36.6",
    unit: "°C",
    icon: Thermometer,
    status: "normal",
    trend: "stable",
    change: "0",
    color: "text-amber-600",
    bg: "bg-amber-50",
    range: "36.1–37.2 °C",
    history: [36.8, 36.5, 36.7, 36.6, 36.4, 36.6, 36.6],
  },
  {
    id: "oxygen",
    label: "Oxygen Level",
    value: "98",
    unit: "%",
    icon: Droplets,
    status: "normal",
    trend: "up",
    change: "+1",
    color: "text-blue-600",
    bg: "bg-blue-50",
    range: "95–100%",
    history: [96, 97, 97, 98, 97, 98, 98],
  },
];

interface Alert {
  id: string;
  type: "info" | "warning" | "success" | "critical";
  message: string;
  time: string;
  read: boolean;
}

const alerts: Alert[] = [
  { id: "1", type: "info", message: "Weekly health report is ready for review", time: "2 hours ago", read: false },
  { id: "2", type: "warning", message: "Slightly elevated heart rate detected during sleep (82 bpm avg)", time: "1 day ago", read: false },
  { id: "3", type: "success", message: "Blood pressure readings have been stable for 7 days", time: "2 days ago", read: true },
  { id: "4", type: "critical", message: "Missed evening medication dose — Log now", time: "5 hours ago", read: false },
  { id: "5", type: "info", message: "Upcoming appointment with Dr. Sarah Chen tomorrow at 10 AM", time: "8 hours ago", read: true },
];

const quickActions = [
  { label: "Log Vitals", icon: Activity, color: "text-teal-600", bg: "bg-teal-50" },
  { label: "Book Appointment", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Message Doctor", icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "View Reports", icon: ClipboardList, color: "text-amber-600", bg: "bg-amber-50" },
];

const todaySchedule = [
  { time: "08:00 AM", label: "Blood Pressure Check", completed: true },
  { time: "09:00 AM", label: "Morning Medication", completed: true },
  { time: "12:00 PM", label: "Lunch — Low sodium", completed: true },
  { time: "03:00 PM", label: "Walk (30 min)", completed: false },
  { time: "06:00 PM", label: "Evening Medication", completed: false },
  { time: "08:00 PM", label: "Blood Pressure Check", completed: false },
];

const healthGoals = [
  { label: "Steps", current: 6842, target: 10000, icon: Footprints, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Water", current: 4, target: 8, icon: Droplet, unit: "glasses", color: "text-cyan-600", bg: "bg-cyan-50" },
  { label: "Sleep", current: 7.2, target: 8, icon: Moon, unit: "hours", color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Calories", current: 1450, target: 2000, icon: Apple, unit: "kcal", color: "text-emerald-600", bg: "bg-emerald-50" },
];

// ── Mini SVG Sparkline Component ──────────────────────────

function MiniSparkline({ data, color = "#0d9488", height = 32 }: { data: number[]; color?: string; height?: number }) {
  const width = 72;
  const padding = 2;
  const chartH = height - padding * 2;
  const chartW = width - padding * 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * chartW;
    const y = padding + chartH - ((val - min) / range) * chartH;
    return `${x},${y}`;
  });

  const linePath = points.map((p, i) => (i === 0 ? `M${p}` : `L${p}`)).join(" ");
  const areaPath = `${linePath} L${padding + chartW},${padding + chartH} L${padding},${padding + chartH} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="shrink-0">
      <defs>
        <linearGradient id={`grad-${data.join("")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#grad-${data.join("")})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={points[points.length - 1].split(",")[0]} cy={points[points.length - 1].split(",")[1]} r="2" fill={color} />
    </svg>
  );
}

// ── Progress Bar Component ────────────────────────────────

function ProgressBar({ value, max, color = "bg-teal-500" }: { value: number; max: number; color?: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ease-out ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ── Main Dashboard Component ──────────────────────────────

export default function PatientDashboardPage() {
  const [greeting] = useState(greetings[timeOfDay()] ?? "Hello");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ═══ Welcome Header ═══ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {greeting}, John! 👋
            </h1>
            <span className="hidden sm:inline">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </span>
          </div>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" size="md" className="gap-1.5">
            <Heart className="w-3 h-3" />
            All vitals normal
          </Badge>
          <Avatar fallback="JD" size="md" />
        </div>
      </div>

      {/* ═══ Quick Stats Row ═══ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="hover:shadow-md transition-all duration-200">
          <CardContent className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shrink-0 shadow-sm">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Health Score</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-bold text-gray-900">85</span>
                <span className="text-xs text-gray-400">/100</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                <span className="text-xs text-emerald-600">+2 this week</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-200">
          <CardContent className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Daily Goals</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-bold text-gray-900">3</span>
                <span className="text-xs text-gray-400">/6 done</span>
              </div>
              <ProgressBar value={3} max={6} color="bg-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-200">
          <CardContent className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Appointments</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-bold text-gray-900">2</span>
                <span className="text-xs text-gray-400">this week</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Next: Tomorrow 10 AM</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-200">
          <CardContent className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Alerts</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-bold text-red-500">3</span>
                <span className="text-xs text-gray-400">unread</span>
              </div>
              <p className="text-xs text-amber-600 mt-0.5">1 requires attention</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ═══ Vitals Grid + Side Panel ═══ */}
      <div className="grid xl:grid-cols-3 gap-6">
        {/* ── Vitals Grid (2/3) ── */}
        <div className="xl:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {vitals.map((vital) => (
              <Card
                key={vital.id}
                className="group hover:shadow-md hover:border-teal-100 transition-all duration-300"
              >
                <CardContent className="p-5">
                  {/* Icon + Status */}
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${vital.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <vital.icon className={`w-5 h-5 ${vital.color}`} />
                    </div>
                    <Badge
                      variant={
                        vital.status === "normal" ? "success"
                        : vital.status === "warning" ? "warning"
                        : "destructive"
                      }
                      size="sm"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mr-1 ${
                        vital.status === "normal" ? "bg-emerald-500"
                        : vital.status === "warning" ? "bg-amber-500"
                        : "bg-red-500 animate-pulse"
                      }`} />
                      {vital.status}
                    </Badge>
                  </div>

                  {/* Value + Mini Chart */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{vital.label}</p>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-2xl font-bold text-gray-900">{vital.value}</span>
                        <span className="text-sm text-gray-400">{vital.unit}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {vital.trend === "up" && vital.id !== "temperature" ? (
                          <ArrowUp className="w-3 h-3 text-emerald-500" />
                        ) : vital.trend === "down" && vital.id === "blood_pressure" ? (
                          <ArrowDown className="w-3 h-3 text-teal-500" />
                        ) : vital.trend === "up" || vital.trend === "down" ? (
                          <ArrowUp className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <TrendingUp className="w-3 h-3 text-gray-400" />
                        )}
                        <span className={`text-xs ${
                          vital.trend === "up" && vital.id !== "temperature" ? "text-emerald-600"
                          : vital.trend === "down" && vital.id === "blood_pressure" ? "text-teal-600"
                          : "text-gray-400"
                        }`}>
                          {vital.change} vs yesterday
                        </span>
                      </div>
                    </div>
                    <MiniSparkline
                      data={vital.history}
                      color={
                        vital.id === "heart_rate" ? "#e11d48"
                        : vital.id === "blood_pressure" ? "#0d9488"
                        : vital.id === "temperature" ? "#d97706"
                        : "#2563eb"
                      }
                    />
                  </div>

                  {/* Range footer */}
                  <div className="mt-3 pt-3 border-t border-gray-50">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      Normal range: {vital.range}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ── Weekly Trends (SVG Line Chart) ── */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">7-Day Vitals Trends</CardTitle>
              <Badge variant="secondary" size="sm" className="gap-1">
                <Timer className="w-3 h-3" />
                This week
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vitals.map((vital) => (
                  <div key={vital.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-8 h-8 rounded-lg ${vital.bg} flex items-center justify-center shrink-0`}>
                      <vital.icon className={`w-4 h-4 ${vital.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700">{vital.label}</span>
                        <span className="text-xs text-gray-400">
                          {vital.history[vital.history.length - 1]} {vital.unit}
                        </span>
                      </div>
                      <div className="relative w-full h-8">
                        <svg
                          width="100%"
                          height="32"
                          viewBox="0 0 120 32"
                          preserveAspectRatio="none"
                          className="overflow-visible"
                        >
                          <defs>
                            <linearGradient id={`trend-${vital.id}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={
                                vital.id === "heart_rate" ? "#e11d48"
                                : vital.id === "blood_pressure" ? "#0d9488"
                                : vital.id === "temperature" ? "#d97706"
                                : "#2563eb"
                              } stopOpacity="0.15" />
                              <stop offset="100%" stopColor={
                                vital.id === "heart_rate" ? "#e11d48"
                                : vital.id === "blood_pressure" ? "#0d9488"
                                : vital.id === "temperature" ? "#d97706"
                                : "#2563eb"
                              } stopOpacity="0.01" />
                            </linearGradient>
                          </defs>
                          {(() => {
                            const min = Math.min(...vital.history);
                            const max = Math.max(...vital.history);
                            const range = max - min || 1;
                            const pts = vital.history.map((v, i) => {
                              const x = (i / (vital.history.length - 1)) * 120;
                              const y = 30 - ((v - min) / range) * 26;
                              return `${x},${y}`;
                            });
                            const line = pts.map((p, i) => (i === 0 ? `M${p}` : `L${p}`)).join(" ");
                            const area = `${line} L120,30 L0,30 Z`;
                            return (
                              <>
                                <path d={area} fill={`url(#trend-${vital.id})`} />
                                <path
                                  d={line}
                                  fill="none"
                                  stroke={
                                    vital.id === "heart_rate" ? "#e11d48"
                                    : vital.id === "blood_pressure" ? "#0d9488"
                                    : vital.id === "temperature" ? "#d97706"
                                    : "#2563eb"
                                  }
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                {pts.map((p, i) => {
                                  const [cx, cy] = p.split(",");
                                  return i === pts.length - 1 ? (
                                    <circle key={i} cx={cx} cy={cy} r="2.5" fill={
                                      vital.id === "heart_rate" ? "#e11d48"
                                      : vital.id === "blood_pressure" ? "#0d9488"
                                      : vital.id === "temperature" ? "#d97706"
                                      : "#2563eb"
                                    } />
                                  ) : null;
                                })}
                              </>
                            );
                          })()}
                        </svg>
                      </div>
                      {/* Day labels */}
                      <div className="flex justify-between mt-0.5">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                          <span key={day} className="text-[10px] text-gray-400">{day}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ── Alerts & Activity Feed ── */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">Alerts & Activity</CardTitle>
                <Badge variant="destructive" size="sm">{alerts.filter((a) => !a.read).length} new</Badge>
              </div>
              <Button variant="ghost" size="sm" className="text-teal-600 text-xs">
                View all <ChevronRight className="ml-1 w-3 h-3" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                      alert.read ? "hover:bg-gray-50" : "bg-teal-50/30 hover:bg-teal-50"
                    }`}
                  >
                    {alert.type === "warning" ? (
                      <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    ) : alert.type === "critical" ? (
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0 animate-pulse" />
                    ) : alert.type === "success" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    ) : (
                      <Bell className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm ${alert.read ? "text-gray-600" : "text-gray-900 font-medium"}`}>
                          {alert.message}
                        </p>
                        {!alert.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Right Side Panel (1/3) ── */}
        <div className="space-y-6">
          {/* Health Score Card */}
          <Card className="bg-gradient-to-br from-teal-600 to-teal-700 text-white border-0">
            <CardHeader>
              <CardTitle className="text-white text-lg">Health Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center pb-8">
              <div className="relative w-28 h-28 mb-3">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" />
                  <circle
                    cx="18" cy="18" r="15.5"
                    fill="none" stroke="white"
                    strokeWidth="2.5"
                    strokeDasharray={`${85}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-4xl font-bold">85</p>
                    <p className="text-xs text-teal-200">/100</p>
                  </div>
                </div>
              </div>
              <p className="text-teal-100 text-sm font-medium">Good — Keep it up! 👍</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-teal-200">
                <span className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                  Excellent &gt; 80
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                  Needs attention
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Today's Schedule</CardTitle>
                <Badge variant="secondary" size="sm">3/6 done</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {todaySchedule.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors ${
                      item.completed ? "bg-gray-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      item.completed
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-gray-100 text-gray-400"
                    }`}>
                      {item.completed ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${item.completed ? "text-gray-400 line-through" : "text-gray-700"}`}>
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-400">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Health Goals Progress */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Daily Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {healthGoals.map((goal) => (
                  <div key={goal.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg ${goal.bg} flex items-center justify-center`}>
                          <goal.icon className={`w-3.5 h-3.5 ${goal.color}`} />
                        </div>
                        <span className="text-sm text-gray-700">{goal.label}</span>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        {goal.current}{goal.unit ? ` ${goal.unit}` : ""} / {goal.target}
                      </span>
                    </div>
                    <ProgressBar
                      value={goal.current}
                      max={goal.target}
                      color={
                        goal.label === "Steps" ? "bg-blue-500"
                        : goal.label === "Water" ? "bg-cyan-500"
                        : goal.label === "Sleep" ? "bg-indigo-500"
                        : "bg-emerald-500"
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-teal-100 hover:shadow-sm hover:bg-gray-50 transition-all duration-200 group"
                  >
                    <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <action.icon className={`w-5 h-5 ${action.color}`} />
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ═══ Footer ═══ */}
      <div className="text-center py-4">
        <p className="text-xs text-gray-400">
          Last updated: {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          {" · "}Data refreshes every 30 seconds
        </p>
      </div>
    </div>
  );
}
