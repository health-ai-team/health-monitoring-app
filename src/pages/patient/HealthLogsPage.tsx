import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Heart,
  Activity,
  Thermometer,
  Droplets,
  Plus,
  Download,
  Search,
  Clock,
  Calendar,
  X,
  Filter,
  LineChart,
  Table2,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────

type VitalType = "all" | "heart_rate" | "blood_pressure" | "temperature" | "oxygen";
type DateRange = "7d" | "30d" | "90d" | "custom";

interface VitalDefinition {
  id: VitalType;
  label: string;
  unit: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  range: string;
  normalMin: number;
  normalMax: number;
}

interface LogEntry {
  id: string;
  date: string;
  time: string;
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  temperature: number;
  oxygen: number;
  status: "normal" | "warning" | "critical";
  notes?: string;
}

// ── Mock Data ──────────────────────────────────────────────

const vitalDefs: VitalDefinition[] = [
  { id: "heart_rate", label: "Heart Rate", unit: "bpm", icon: Heart, color: "text-rose-600", bg: "bg-rose-50", range: "60–100 bpm", normalMin: 60, normalMax: 100 },
  { id: "blood_pressure", label: "Blood Pressure", unit: "mmHg", icon: Activity, color: "text-teal-600", bg: "bg-teal-50", range: "< 130/85", normalMin: 90, normalMax: 130 },
  { id: "temperature", label: "Temperature", unit: "°C", icon: Thermometer, color: "text-amber-600", bg: "bg-amber-50", range: "36.1–37.2 °C", normalMin: 361, normalMax: 372 },
  { id: "oxygen", label: "Oxygen Level", unit: "%", icon: Droplets, color: "text-blue-600", bg: "bg-blue-50", range: "95–100%", normalMin: 95, normalMax: 100 },
];

function generateLogData(): LogEntry[] {
  const entries: LogEntry[] = [];
  const now = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const time = `${8 + (i % 10)}:${i % 2 === 0 ? "00" : "30"} ${i % 2 === 0 ? "AM" : "PM"}`;
    const hr = 65 + Math.floor(Math.random() * 20);
    const sys = 110 + Math.floor(Math.random() * 25);
    const dia = 70 + Math.floor(Math.random() * 15);
    const temp = 36 + Math.floor(Math.random() * 10) / 10;
    const oxy = 95 + Math.floor(Math.random() * 5);

    let status: "normal" | "warning" | "critical" = "normal";
    if (hr > 95 || sys > 140 || oxy < 92) status = "critical";
    else if (hr > 85 || sys > 130 || oxy < 95) status = "warning";

    entries.push({
      id: `log-${i}`,
      date,
      time,
      heartRate: hr,
      bloodPressureSystolic: sys,
      bloodPressureDiastolic: dia,
      temperature: parseFloat(temp.toFixed(1)),
      oxygen: oxy,
      status,
    });
  }
  return entries;
}

const logData = generateLogData();

function getVitalValue(entry: LogEntry, type: VitalType): number {
  switch (type) {
    case "heart_rate": return entry.heartRate;
    case "blood_pressure": return entry.bloodPressureSystolic;
    case "temperature": return entry.temperature * 10;
    case "oxygen": return entry.oxygen;
    default: return entry.heartRate;
  }
}

function getVitalUnit(type: VitalType): string {
  switch (type) {
    case "heart_rate": return "bpm";
    case "blood_pressure": return "mmHg";
    case "temperature": return "°C";
    case "oxygen": return "%";
    default: return "";
  }
}

// ── SVG Chart Component ────────────────────────────────────

function VitalChart({
  data,
  vitalType,
  height = 200,
}: {
  data: LogEntry[];
  vitalType: VitalType;
  height?: number;
}) {
  if (vitalType === "all" || vitalType === "blood_pressure") {
    // Show multiple lines or BP with systolic/diastolic
    return null; // handled by parent
  }

  const def = vitalDefs.find((v) => v.id === vitalType);
  if (!def) return null;

  const values = data.map((d) => getVitalValue(d, vitalType));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const padding = { top: 20, right: 16, bottom: 24, left: 40 };
  const width = 600;
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const yLabels = [min, Math.round((min + max) / 2), max];

  const points = values.map((v, i) => ({
    x: padding.left + (i / (values.length - 1)) * chartW,
    y: padding.top + chartH - ((v - min) / range) * chartH,
    value: v,
  }));

  const linePath = points.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1].x},${padding.top + chartH} L${points[0].x},${padding.top + chartH} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      {/* Grid lines */}
      {yLabels.map((v) => {
        const y = padding.top + chartH - ((v - min) / range) * chartH;
        return (
          <g key={v}>
            <line x1={padding.left} y1={y} x2={padding.left + chartW} y2={y} stroke="#f1f5f9" strokeWidth="1" />
            <text x={padding.left - 8} y={y + 4} textAnchor="end" className="text-[10px] fill-gray-400">
              {vitalType === "temperature" ? (v / 10).toFixed(1) : v}
            </text>
          </g>
        );
      })}

      {/* Area fill */}
      <defs>
        <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={def.color.replace("text-", "#").replace("rose-600", "e11d48").replace("teal-600", "0d9488").replace("amber-600", "d97706").replace("blue-600", "2563eb")} stopOpacity="0.12" />
          <stop offset="100%" stopColor={def.color.replace("text-", "#").replace("rose-600", "e11d48").replace("teal-600", "0d9488").replace("amber-600", "d97706").replace("blue-600", "2563eb")} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#chart-gradient)" />

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke={def.color.replace("text-", "currentColor")}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={def.color}
      />

      {/* Data points - latest one highlighted */}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={i === points.length - 1 ? 4 : 2}
          fill={i === points.length - 1 ? "white" : def.color.replace("text-", "#").replace("rose-600", "e11d48").replace("teal-600", "0d9488").replace("amber-600", "d97706").replace("blue-600", "2563eb")}
          stroke={def.color.replace("text-", "#").replace("rose-600", "e11d48").replace("teal-600", "0d9488").replace("amber-600", "d97706").replace("blue-600", "2563eb")}
          strokeWidth={i === points.length - 1 ? 2.5 : 0}
          className="transition-all duration-300"
        />
      ))}

      {/* X-axis labels */}
      {[0, Math.floor(values.length / 2), values.length - 1].map((i) => (
        <text
          key={i}
          x={points[i]?.x ?? 0}
          y={height - 4}
          textAnchor="middle"
          className="text-[10px] fill-gray-400"
        >
          {data[i]?.date ?? ""}
        </text>
      ))}
    </svg>
  );
}

// ── BP Chart (dual line: systolic/diastolic) ──────────────

function BloodPressureChart({ data, height = 200 }: { data: LogEntry[]; height?: number }) {
  const sysValues = data.map((d) => d.bloodPressureSystolic);
  const diaValues = data.map((d) => d.bloodPressureDiastolic);
  const allValues = [...sysValues, ...diaValues];
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1;
  const padding = { top: 20, right: 16, bottom: 24, left: 40 };
  const width = 600;
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const yLabels = [min, Math.round((min + max) / 2), max];

  const toPoint = (vals: number[]) =>
    vals.map((v, i) => ({
      x: padding.left + (i / (vals.length - 1)) * chartW,
      y: padding.top + chartH - ((v - min) / range) * chartH,
    }));

  const sysPoints = toPoint(sysValues);
  const diaPoints = toPoint(diaValues);

  const sysPath = sysPoints.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(" ");
  const diaPath = diaPoints.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      {/* Grid */}
      {yLabels.map((v) => {
        const y = padding.top + chartH - ((v - min) / range) * chartH;
        return (
          <g key={v}>
            <line x1={padding.left} y1={y} x2={padding.left + chartW} y2={y} stroke="#f1f5f9" strokeWidth="1" />
            <text x={padding.left - 8} y={y + 4} textAnchor="end" className="text-[10px] fill-gray-400">{v}</text>
          </g>
        );
      })}

      <defs>
        <linearGradient id="sys-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d9488" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0.01" />
        </linearGradient>
        <linearGradient id="dia-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {/* Systolic area */}
      <path d={`${sysPath} L${sysPoints[sysPoints.length - 1].x},${padding.top + chartH} L${sysPoints[0].x},${padding.top + chartH} Z`} fill="url(#sys-grad)" />
      <path d={sysPath} fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Diastolic area */}
      <path d={`${diaPath} L${diaPoints[diaPoints.length - 1].x},${padding.top + chartH} L${diaPoints[0].x},${padding.top + chartH} Z`} fill="url(#dia-grad)" />
      <path d={diaPath} fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* End dots */}
      <circle cx={sysPoints[sysPoints.length - 1].x} cy={sysPoints[sysPoints.length - 1].y} r="4" fill="white" stroke="#0d9488" strokeWidth="2.5" />
      <circle cx={diaPoints[diaPoints.length - 1].x} cy={diaPoints[diaPoints.length - 1].y} r="4" fill="white" stroke="#2563eb" strokeWidth="2.5" />

      {/* X labels */}
      {[0, Math.floor(sysPoints.length / 2), sysPoints.length - 1].map((i) => (
        <text key={i} x={sysPoints[i]?.x ?? 0} y={height - 4} textAnchor="middle" className="text-[10px] fill-gray-400">
          {data[i]?.date ?? ""}
        </text>
      ))}

      {/* Legend */}
      <line x1={width - 100} y1={8} x2={width - 84} y2={8} stroke="#0d9488" strokeWidth="2" />
      <text x={width - 80} y={12} className="text-[10px] fill-gray-500">Systolic</text>
      <line x1={width - 100} y1={22} x2={width - 84} y2={22} stroke="#2563eb" strokeWidth="2" />
      <text x={width - 80} y={26} className="text-[10px] fill-gray-500">Diastolic</text>
    </svg>
  );
}

// ── All Vitals Overview Chart ──────────────────────────────

function AllVitalsChart({ data }: { data: LogEntry[] }) {
  return (
    <div className="space-y-4">
      {vitalDefs.filter((v) => v.id !== "blood_pressure").map((def) => {
        const values = data.map((d) => getVitalValue(d, def.id));
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min || 1;
        const width = 120;
        const height = 32;
        const pts = values.map((v, i) => ({
          x: (i / (values.length - 1)) * width,
          y: height - ((v - min) / range) * (height - 4) - 2,
        }));
        const line = pts.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(" ");
        const area = `${line} L${width},${height} L0,${height} Z`;

        return (
          <div key={def.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className={`w-8 h-8 rounded-lg ${def.bg} flex items-center justify-center shrink-0`}>
              <def.icon className={`w-4 h-4 ${def.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs font-medium text-gray-700">{def.label}</span>
                <span className="text-xs text-gray-400">
                  {values[values.length - 1]} {def.unit}
                </span>
              </div>
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[32px]">
                <defs>
                  <linearGradient id={`mini-${def.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={def.color.replace("text-", "#").replace("rose-600", "e11d48").replace("teal-600", "0d9488").replace("amber-600", "d97706").replace("blue-600", "2563eb")} stopOpacity="0.15" />
                    <stop offset="100%" stopColor={def.color.replace("text-", "#").replace("rose-600", "e11d48").replace("teal-600", "0d9488").replace("amber-600", "d97706").replace("blue-600", "2563eb")} stopOpacity="0.01" />
                  </linearGradient>
                </defs>
                <path d={area} fill={`url(#mini-${def.id})`} />
                <path d={line} fill="none" stroke={def.color.replace("text-", "#").replace("rose-600", "e11d48").replace("teal-600", "0d9488").replace("amber-600", "d97706").replace("blue-600", "2563eb")} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="2.5" fill={def.color.replace("text-", "#").replace("rose-600", "e11d48").replace("teal-600", "0d9488").replace("amber-600", "d97706").replace("blue-600", "2563eb")} />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── New Reading Form Component ────────────────────────────

function AddReadingForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    heartRate: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    temperature: "",
    oxygen: "",
    notes: "",
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would post to the backend
    // For now, close the form
    onClose();
  };

  return (
    <Card className="border-teal-100 bg-teal-50/30">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-lg">Log New Reading</CardTitle>
          <CardDescription>Enter your current vital signs</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400">
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="hr" className="text-xs text-gray-600">Heart Rate (bpm)</Label>
              <Input
                id="hr"
                type="number"
                placeholder="72"
                value={formData.heartRate}
                onChange={handleChange("heartRate")}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bp-sys" className="text-xs text-gray-600">Systolic (mmHg)</Label>
              <Input
                id="bp-sys"
                type="number"
                placeholder="120"
                value={formData.bloodPressureSystolic}
                onChange={handleChange("bloodPressureSystolic")}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bp-dia" className="text-xs text-gray-600">Diastolic (mmHg)</Label>
              <Input
                id="bp-dia"
                type="number"
                placeholder="80"
                value={formData.bloodPressureDiastolic}
                onChange={handleChange("bloodPressureDiastolic")}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="temp" className="text-xs text-gray-600">Temperature (°C)</Label>
              <Input
                id="temp"
                type="number"
                step="0.1"
                placeholder="36.6"
                value={formData.temperature}
                onChange={handleChange("temperature")}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="oxy" className="text-xs text-gray-600">Oxygen (%)</Label>
              <Input
                id="oxy"
                type="number"
                placeholder="98"
                value={formData.oxygen}
                onChange={handleChange("oxygen")}
                className="h-9 text-sm"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="notes" className="text-xs text-gray-600">Notes (optional)</Label>
            <Input
              id="notes"
              type="text"
              placeholder="Any symptoms or observations..."
              value={formData.notes}
              onChange={handleChange("notes")}
              className="h-9 text-sm"
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-1">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
            <Button type="submit" size="sm" className="bg-gradient-to-r from-teal-600 to-teal-500 text-white">
              <Plus className="w-3.5 h-3.5 mr-1" />
              Save Reading
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// ── Main Page Component ────────────────────────────────────

export default function HealthLogsPage() {
  const [selectedVital, setSelectedVital] = useState<VitalType>("all");
  const [dateRange, setDateRange] = useState<DateRange>("7d");
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState<"chart" | "table">("chart");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = logData.filter((entry) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return entry.date.toLowerCase().includes(q) || entry.notes?.toLowerCase().includes(q);
    }
    return true;
  });

  const statsForVital = (type: VitalType) => {
    if (type === "all" || type === "blood_pressure") {
      const sysValues = filteredData.map((d) => d.bloodPressureSystolic);
      const diaValues = filteredData.map((d) => d.bloodPressureDiastolic);
      return {
        min: Math.min(...sysValues),
        max: Math.max(...sysValues),
        avg: Math.round(sysValues.reduce((a, b) => a + b, 0) / sysValues.length),
        latest: `${sysValues[sysValues.length - 1]}/${diaValues[diaValues.length - 1]}`,
        unit: "mmHg",
        normal: true,
      };
    }
    const values = filteredData.map((d) => getVitalValue(d, type));
    if (values.length === 0) return null;
    const avg = type === "temperature"
      ? (values.reduce((a, b) => a + b, 0) / values.length / 10).toFixed(1)
      : Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    return {
      min: type === "temperature" ? (Math.min(...values) / 10).toFixed(1) : Math.min(...values),
      max: type === "temperature" ? (Math.max(...values) / 10).toFixed(1) : Math.max(...values),
      avg,
      latest: type === "temperature" ? (values[values.length - 1] / 10).toFixed(1) : values[values.length - 1],
      unit: getVitalUnit(type),
      normal: true,
    };
  };

  const selectedDef = vitalDefs.find((v) => v.id === selectedVital);
  const stats = statsForVital(selectedVital);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ═══ Header ═══ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Health Logs</h1>
          <p className="text-gray-500 mt-1">Track and review your vital signs history</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 border-gray-200"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-sm"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Log Reading
          </Button>
        </div>
      </div>

      {/* ═══ Add Reading Form ═══ */}
      {showAddForm && (
        <AddReadingForm onClose={() => setShowAddForm(false)} />
      )}

      {/* ═══ Date Range + View Toggle ═══ */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Date range pills */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          {([
            { value: "7d", label: "7 Days" },
            { value: "30d", label: "30 Days" },
            { value: "90d", label: "3 Months" },
          ] as { value: DateRange; label: string }[]).map((range) => (
            <button
              key={range.value}
              onClick={() => setDateRange(range.value)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                dateRange === range.value
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* View toggle + Search */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial sm:w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("chart")}
              className={cn(
                "p-1.5 rounded-md transition-all",
                viewMode === "chart" ? "bg-white text-teal-700 shadow-sm" : "text-gray-400 hover:text-gray-600"
              )}
              title="Chart view"
            >
              <LineChart className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={cn(
                "p-1.5 rounded-md transition-all",
                viewMode === "table" ? "bg-white text-teal-700 shadow-sm" : "text-gray-400 hover:text-gray-600"
              )}
              title="Table view"
            >
              <Table2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ═══ Vital Type Filter Pills ═══ */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-gray-400 mr-1 flex items-center gap-1">
          <Filter className="w-3 h-3" />
          Filter:
        </span>
        {[
          { id: "all" as VitalType, label: "All Vitals" },
          ...vitalDefs.map((v) => ({ id: v.id, label: v.label })),
        ].map((vital) => (
          <button
            key={vital.id}
            onClick={() => setSelectedVital(vital.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
              selectedVital === vital.id
                ? "bg-teal-50 text-teal-700 border-teal-200 shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-800"
            )}
          >
            {vital.id !== "all" && (
              <span className={`w-1.5 h-1.5 rounded-full ${
                vital.id === "heart_rate" ? "bg-rose-500"
                : vital.id === "blood_pressure" ? "bg-teal-500"
                : vital.id === "temperature" ? "bg-amber-500"
                : "bg-blue-500"
              }`} />
            )}
            {vital.label}
          </button>
        ))}
      </div>

      {/* ═══ Main Content ═══ */}
      {viewMode === "chart" ? (
        <div className="space-y-6">
          {/* Chart Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {selectedDef && (
                    <div className={`w-9 h-9 rounded-lg ${selectedDef.bg} flex items-center justify-center`}>
                      <selectedDef.icon className={`w-5 h-5 ${selectedDef.color}`} />
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-lg">
                      {selectedVital === "all" ? "All Vitals" : `${selectedDef?.label} Trends`}
                    </CardTitle>
                    <CardDescription>
                      Showing {dateRange === "7d" ? "7" : dateRange === "30d" ? "30" : "90"}-day history
                    </CardDescription>
                  </div>
                </div>

                {/* Stats Summary */}
                {stats && (
                  <div className="hidden sm:flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Min</p>
                      <p className="text-sm font-semibold text-gray-700">{stats.min}{stats.unit !== "mmHg" ? ` ${stats.unit}` : ""}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Avg</p>
                      <p className="text-sm font-semibold text-gray-700">{stats.avg}{stats.unit !== "mmHg" ? ` ${stats.unit}` : ""}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Max</p>
                      <p className="text-sm font-semibold text-gray-700">{stats.max}{stats.unit !== "mmHg" ? ` ${stats.unit}` : ""}</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Latest</p>
                      <p className="text-sm font-semibold text-teal-600">{stats.latest}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {/* Chart content */}
              {selectedVital === "all" ? (
                <AllVitalsChart data={filteredData} />
              ) : selectedVital === "blood_pressure" ? (
                <div className="pt-2">
                  <BloodPressureChart data={filteredData} />
                  {/* Stats row for mobile */}
                  <div className="flex sm:hidden items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Min</p>
                      <p className="text-sm font-semibold text-gray-700">{stats?.min} mmHg</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Avg</p>
                      <p className="text-sm font-semibold text-gray-700">{stats?.avg} mmHg</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Max</p>
                      <p className="text-sm font-semibold text-gray-700">{stats?.max} mmHg</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Latest</p>
                      <p className="text-sm font-semibold text-teal-600">{stats?.latest}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-teal-500 rounded" />
                      Systolic
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-blue-500 rounded" />
                      Diastolic
                    </span>
                    <span className="text-gray-300">Normal: &lt; 130/85 mmHg</span>
                  </div>
                </div>
              ) : (
                <div className="pt-2">
                  <VitalChart data={filteredData} vitalType={selectedVital} />
                  {/* Stats for mobile */}
                  <div className="flex sm:hidden items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Min</p>
                      <p className="text-sm font-semibold text-gray-700">{stats?.min}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Avg</p>
                      <p className="text-sm font-semibold text-gray-700">{stats?.avg}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Max</p>
                      <p className="text-sm font-semibold text-gray-700">{stats?.max}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Latest</p>
                      <p className="text-sm font-semibold text-teal-600">{stats?.latest} {stats?.unit}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-3 h-0.5 rounded ${
                        selectedVital === "heart_rate" ? "bg-rose-500"
                        : selectedVital === "temperature" ? "bg-amber-500"
                        : "bg-blue-500"
                      }`} />
                      {selectedDef?.label}
                    </span>
                    <span className="text-gray-300">Normal: {selectedDef?.range}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Log History Table */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Reading History</CardTitle>
                <Badge variant="secondary" size="sm">{filteredData.length} entries</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-rose-500" /> HR</span>
                      </th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-teal-500" /> BP</span>
                      </th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <span className="flex items-center gap-1"><Thermometer className="w-3 h-3 text-amber-500" /> Temp</span>
                      </th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <span className="flex items-center gap-1"><Droplets className="w-3 h-3 text-blue-500" /> O₂</span>
                      </th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredData.map((entry) => (
                      <tr
                        key={entry.id}
                        className="hover:bg-gray-50 transition-colors group"
                      >
                        <td className="px-5 py-3 text-sm text-gray-700 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-gray-300" />
                            {entry.date}
                          </div>
                        </td>
                        <td className="px-5 py-3 text-sm text-gray-500 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-gray-300" />
                            {entry.time}
                          </div>
                        </td>
                        <td className="px-5 py-3 whitespace-nowrap">
                          <span className={cn(
                            "text-sm font-medium",
                            entry.heartRate > 90 ? "text-rose-600" : entry.heartRate > 80 ? "text-amber-600" : "text-gray-700"
                          )}>
                            {entry.heartRate}
                          </span>
                          <span className="text-xs text-gray-400 ml-0.5">bpm</span>
                        </td>
                        <td className="px-5 py-3 whitespace-nowrap">
                          <span className={cn(
                            "text-sm font-medium",
                            entry.bloodPressureSystolic > 140 ? "text-rose-600" : entry.bloodPressureSystolic > 130 ? "text-amber-600" : "text-gray-700"
                          )}>
                            {entry.bloodPressureSystolic}/{entry.bloodPressureDiastolic}
                          </span>
                        </td>
                        <td className="px-5 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-700">{entry.temperature}</span>
                          <span className="text-xs text-gray-400 ml-0.5">°C</span>
                        </td>
                        <td className="px-5 py-3 whitespace-nowrap">
                          <span className={cn(
                            "text-sm font-medium",
                            entry.oxygen < 93 ? "text-rose-600" : entry.oxygen < 95 ? "text-amber-600" : "text-gray-700"
                          )}>
                            {entry.oxygen}
                          </span>
                          <span className="text-xs text-gray-400 ml-0.5">%</span>
                        </td>
                        <td className="px-5 py-3 whitespace-nowrap">
                          <Badge
                            variant={
                              entry.status === "normal" ? "success"
                              : entry.status === "warning" ? "warning"
                              : "destructive"
                            }
                            size="sm"
                          >
                            <span className={`w-1 h-1 rounded-full mr-1 ${
                              entry.status === "normal" ? "bg-emerald-500"
                              : entry.status === "warning" ? "bg-amber-500"
                              : "bg-red-500"
                            }`} />
                            {entry.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* ── Table View ── */
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">All Health Logs</CardTitle>
              <Badge variant="secondary" size="sm">{filteredData.length} entries</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Heart Rate</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Blood Pressure</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Temperature</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Oxygen</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredData.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 text-sm text-gray-700 whitespace-nowrap">{entry.date}</td>
                      <td className="px-5 py-3 text-sm text-gray-500 whitespace-nowrap">{entry.time}</td>
                      <td className="px-5 py-3 text-sm text-gray-700 whitespace-nowrap">{entry.heartRate} bpm</td>
                      <td className="px-5 py-3 text-sm text-gray-700 whitespace-nowrap">{entry.bloodPressureSystolic}/{entry.bloodPressureDiastolic}</td>
                      <td className="px-5 py-3 text-sm text-gray-700 whitespace-nowrap">{entry.temperature} °C</td>
                      <td className="px-5 py-3 text-sm text-gray-700 whitespace-nowrap">{entry.oxygen}%</td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <Badge
                          variant={
                            entry.status === "normal" ? "success"
                            : entry.status === "warning" ? "warning"
                            : "destructive"
                          }
                          size="sm"
                        >
                          {entry.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
