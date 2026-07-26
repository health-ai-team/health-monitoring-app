import { useState, useRef, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Heart,
  Activity,
  Thermometer,
  Droplets,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Download,
  BarChart3,
  LineChart,
  AreaChart,
  Eye,
  EyeOff,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────

type VitalType = "heart_rate" | "blood_pressure" | "temperature" | "oxygen";
type TimeRange = "7d" | "30d" | "90d" | "1y";
type ChartStyle = "line" | "area";

interface DataPoint {
  date: string;
  shortDate: string;
  value: number;
  value2?: number;
  day: string;
}

// ── Vital Config ───────────────────────────────────────────

interface VitalConfig {
  id: VitalType;
  label: string;
  unit: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  range: [number, number];
  formatValue: (v: number) => string;
}

const vitals: VitalConfig[] = [
  {
    id: "heart_rate",
    label: "Heart Rate",
    unit: "bpm",
    icon: Heart,
    color: "#e11d48",
    bg: "bg-rose-50",
    range: [60, 100],
    formatValue: (v) => `${Math.round(v)}`,
  },
  {
    id: "blood_pressure",
    label: "Blood Pressure",
    unit: "mmHg",
    icon: Activity,
    color: "#0d9488",
    bg: "bg-teal-50",
    range: [90, 130],
    formatValue: (v) => `${Math.round(v)}`,
  },
  {
    id: "temperature",
    label: "Temperature",
    unit: "°C",
    icon: Thermometer,
    color: "#d97706",
    bg: "bg-amber-50",
    range: [361, 372],
    formatValue: (v) => (v / 10).toFixed(1),
  },
  {
    id: "oxygen",
    label: "Oxygen Level",
    unit: "%",
    icon: Droplets,
    color: "#2563eb",
    bg: "bg-blue-50",
    range: [95, 100],
    formatValue: (v) => `${Math.round(v)}`,
  },
];

// ── Data Generation ────────────────────────────────────────

function generateData(type: VitalType, days: number): DataPoint[] {
  const data: DataPoint[] = [];
  const baseConfig: Record<VitalType, { mean: number; amp: number }> = {
    heart_rate: { mean: 72, amp: 8 },
    blood_pressure: { mean: 120, amp: 12 },
    temperature: { mean: 366, amp: 5 },
    oxygen: { mean: 97, amp: 2 },
  };

  const { mean, amp } = baseConfig[type];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const noise = (Math.random() - 0.5) * amp * 2;
    const trend = Math.sin((i / days) * Math.PI * 2) * 2;
    const weekend = d.getDay() === 0 || d.getDay() === 6 ? 3 : 0;
    const value = Math.max(1, mean + noise + trend + weekend);

    data.push({
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      shortDate: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Math.round(value * 10) / 10,
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
    });
  }

  return data;
}

// Blood pressure has systolic and diastolic
function generateBPData(days: number): DataPoint[] {
  const data: DataPoint[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const sysNoise = (Math.random() - 0.5) * 20;
    const diaNoise = (Math.random() - 0.5) * 10;
    const sysTrend = Math.sin((i / days) * Math.PI) * 5;

    data.push({
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      shortDate: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Math.round(120 + sysNoise + sysTrend),
      value2: Math.round(80 + diaNoise),
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
    });
  }

  return data;
}

// ── Tooltip Data ───────────────────────────────────────────

interface TooltipState {
  x: number;
  y: number;
  point: DataPoint;
  visible: boolean;
}

// ── SVG Chart Component ────────────────────────────────────

function HealthChart({
  data,
  vitalType,
  chartStyle,
}: {
  data: DataPoint[];
  vitalType: VitalType;
  chartStyle: ChartStyle;
}) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 320 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: Math.max(280, Math.min(400, containerRef.current.clientWidth * 0.4)),
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const config = vitals.find((v) => v.id === vitalType)!;
  const isBP = vitalType === "blood_pressure";

  const padding = { top: 20, right: 20, bottom: 36, left: 48 };
  const chartW = dimensions.width - padding.left - padding.right;
  const chartH = dimensions.height - padding.top - padding.bottom;

  // Find min/max
  const allValues = isBP
    ? data.flatMap((d) => [d.value, d.value2 ?? d.value])
    : data.map((d) => d.value);
  let dataMin = Math.min(...allValues);
  let dataMax = Math.max(...allValues);
  const dataRange = dataMax - dataMin || 1;
  const yPad = dataRange * 0.1;
  dataMin = Math.max(0, dataMin - yPad);
  dataMax = dataMax + yPad;
  const yRange = dataMax - dataMin || 1;

  const toX = (i: number) => padding.left + (i / (data.length - 1)) * chartW;
  const toY = (v: number) => padding.top + chartH - ((v - dataMin) / yRange) * chartH;

  // Y-axis labels
  const ySteps = 5;
  const yLabels = Array.from({ length: ySteps + 1 }, (_, i) => dataMin + (yRange * i) / ySteps);

  // X-axis labels (show ~6 evenly spaced)
  const xLabelCount = 6;
  const xLabelIndices = Array.from({ length: xLabelCount }, (_, i) =>
    Math.round((i * (data.length - 1)) / (xLabelCount - 1))
  );

  // Build path
  const buildPath = (values: number[]) => {
    return values
      .map((v, i) => {
        const x = toX(i);
        const y = toY(v);
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ");
  };  const buildAreaPath = (values: number[]) => {
    const linePath = values
      .map((v, i) => {
        const x = toX(i);
        const y = toY(v);
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ");
    return `${linePath} L${toX(values.length - 1)},${padding.top + chartH} L${toX(0)},${padding.top + chartH} Z`;
  };

  const mainValues = isBP
    ? data.map((d) => d.value)
    : data.map((d) => d.value);
  const secondaryValues = isBP ? data.map((d) => d.value2 ?? d.value) : undefined;

  const linePath = buildPath(mainValues);
  const areaPath = chartStyle === "area" ? buildAreaPath(mainValues) : undefined;
  const secondaryLinePath = secondaryValues ? buildPath(secondaryValues) : undefined;

  const colorHex = config.color;

  // Handle mouse move for tooltip
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const dataIdx = Math.round(((mouseX - padding.left) / chartW) * (data.length - 1));
    const clampedIdx = Math.max(0, Math.min(data.length - 1, dataIdx));
    const point = data[clampedIdx];
    setTooltip({
      x: toX(clampedIdx),
      y: toY(point.value),
      point,
      visible: true,
    });
  };

  return (
    <div ref={containerRef} className="relative w-full select-none">
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="w-full h-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Y-axis grid lines and labels */}
        {yLabels.map((v) => {
          const y = toY(v);
          return (
            <g key={v}>
              <line
                x1={padding.left}
                y1={y}
                x2={padding.left + chartW}
                y2={y}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <text
                x={padding.left - 8}
                y={y + 4}
                textAnchor="end"
                className="fill-gray-400 text-[11px]"
              >
                {config.formatValue(v)}
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {xLabelIndices.map((idx) => (
          <text
            key={idx}
            x={toX(idx)}
            y={dimensions.height - 6}
            textAnchor="middle"
            className="fill-gray-400 text-[10px]"
          >
            {data[idx]?.shortDate ?? ""}
          </text>
        ))}

        {/* Normal range band */}
        <rect
          x={padding.left}
          y={toY(config.range[1])}
          width={chartW}
          height={toY(config.range[0]) - toY(config.range[1])}
          fill={colorHex}
          fillOpacity="0.06"
          rx="2"
        />

        {/* Area fill */}
        {areaPath && (
          <defs>
            <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colorHex} stopOpacity="0.15" />
              <stop offset="100%" stopColor={colorHex} stopOpacity="0.01" />
            </linearGradient>
          </defs>
        )}
        {areaPath && <path d={areaPath} fill="url(#chart-fill)" />}

        {/* Secondary line (diastolic for BP) */}
        {secondaryLinePath && (
          <path
            d={secondaryLinePath}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.7"
          />
        )}

        {/* Main line */}
        <path
          d={linePath}
          fill="none"
          stroke={colorHex}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {data.map((d, i) => {
          const isLast = i === data.length - 1;
          return (
            <circle
              key={i}
              cx={toX(i)}
              cy={toY(d.value)}
              r={isLast ? 4.5 : 2}
              fill={isLast ? "white" : colorHex}
              stroke={colorHex}
              strokeWidth={isLast ? 2.5 : 0}
              className="transition-all duration-200"
            />
          );
        })}

        {/* Secondary data points for BP */}
        {secondaryValues?.map((v, i) => {
          const isLast = i === secondaryValues.length - 1;
          return (
            <circle
              key={`bp-dia-${i}`}
              cx={toX(i)}
              cy={toY(v)}
              r={isLast ? 3.5 : 1.5}
              fill={isLast ? "white" : "#3b82f6"}
              stroke="#3b82f6"
              strokeWidth={isLast ? 2 : 0}
            />
          );
        })}

        {/* Hover tooltip line */}
        {tooltip?.visible && (
          <>
            <line
              x1={tooltip.x}
              y1={padding.top}
              x2={tooltip.x}
              y2={padding.top + chartH}
              stroke={colorHex}
              strokeWidth="1"
              strokeDasharray="4,3"
              opacity="0.5"
            />
            <rect
              x={Math.min(Math.max(tooltip.x - 60, 0), dimensions.width - 130)}
              y={Math.max(tooltip.y - 50, 0)}
              width="130"
              height="38"
              rx="6"
              fill="white"
              stroke="#e2e8f0"
              strokeWidth="1"
              className="shadow-lg"
            />
            <text
              x={Math.min(Math.max(tooltip.x - 60, 0) + 10, 10)}
              y={Math.max(tooltip.y - 34, 6)}
              className="fill-gray-500 text-[10px]"
            >
              {tooltip.point.date}
            </text>
            <text
              x={Math.min(Math.max(tooltip.x - 60, 0) + 10, 10)}
              y={Math.max(tooltip.y - 18, 20)}
              className="fill-gray-900 text-[13px] font-bold"
            >
              {config.formatValue(tooltip.point.value)} {config.unit}
              {isBP && tooltip.point.value2 && ` / ${tooltip.point.value2}`}
            </text>
          </>
        )}
      </svg>

      {/* Legend for BP */}
      {isBP && (
        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded" style={{ backgroundColor: colorHex }} />
            Systolic
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded bg-blue-500" />
            Diastolic
          </span>
          <span className="text-gray-300">Normal range: {config.range[0]}–{config.range[1]} mmHg</span>
        </div>
      )}

      {/* Normal range note for non-BP */}
      {!isBP && (
        <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
          <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: colorHex, opacity: 0.2 }} />
          Normal range: {config.range[0]}–{config.range[1]} {config.unit}
        </div>
      )}
    </div>
  );
}

// ── Comparison Mini Chart ──────────────────────────────────

function MiniComparisonChart({
  title,
  data,
  color,
}: {
  title: string;
  data: number[];
  color: string;
}) {
  const width = 120;
  const height = 40;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * (height - 8) - 4,
  }));

  const line = pts.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;

  const change = ((data[data.length - 1] - data[0]) / data[0] * 100).toFixed(1);
  const isUp = Number(change) > 0;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500 font-medium">{title}</p>
          <span className={cn(
            "text-xs font-medium flex items-center gap-0.5",
            isUp ? "text-emerald-600" : change === "0.0" ? "text-gray-400" : "text-red-500"
          )}>
            {isUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {Math.abs(Number(change))}%
          </span>
        </div>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[40px]">
          <defs>
            <linearGradient id={`comp-${title}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.15" />
              <stop offset="100%" stopColor={color} stopOpacity="0.01" />
            </linearGradient>
          </defs>
          <path d={area} fill={`url(#comp-${title})`} />
          <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="2.5" fill={color} />
        </svg>
      </CardContent>
    </Card>
  );
}

// ── Main Page Component ────────────────────────────────────

export default function HealthGraphsPage() {
  const [selectedVital, setSelectedVital] = useState<VitalType>("heart_rate");
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const [chartStyle, setChartStyle] = useState<ChartStyle>("area");
  const [showComparison, setShowComparison] = useState(true);

  const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : timeRange === "90d" ? 90 : 365;

  const data = useMemo(() => {
    if (selectedVital === "blood_pressure") {
      return generateBPData(days);
    }
    return generateData(selectedVital, days);
  }, [selectedVital, days]);

  const config = vitals.find((v) => v.id === selectedVital)!;

  // Stats
  const values = selectedVital === "blood_pressure"
    ? data.map((d) => d.value)
    : data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const latest = values[values.length - 1];
  const prevLatest = values[values.length - 2] ?? latest;
  const change = ((latest - prevLatest) / prevLatest * 100).toFixed(1);
  const isUp = Number(change) > 0;

  // Comparison data slices
  const halfIdx = Math.floor(data.length / 2);
  const firstHalf = data.slice(0, halfIdx).map((d) => d.value);
  const secondHalf = data.slice(halfIdx).map((d) => d.value);
  const recentThird = data.slice(-Math.floor(data.length / 3)).map((d) => d.value);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ═══ Header ═══ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center shadow-sm">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Health Analytics</h1>
          </div>
          <p className="text-gray-500 mt-1">Track and analyze your health trends over time</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-gray-600 border-gray-200">
            <Download className="w-3.5 h-3.5 mr-1" />
            Export Data
          </Button>
        </div>
      </div>

      {/* ═══ Controls ═══ */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Time Range */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          {[
            { value: "7d" as TimeRange, label: "7 Days" },
            { value: "30d" as TimeRange, label: "30 Days" },
            { value: "90d" as TimeRange, label: "90 Days" },
            { value: "1y" as TimeRange, label: "1 Year" },
          ].map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                timeRange === range.value
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Chart Controls */}
        <div className="flex items-center gap-2">
          {/* Chart Style Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setChartStyle("line")}
              className={cn(
                "p-1.5 rounded-md transition-all",
                chartStyle === "line" ? "bg-white text-teal-700 shadow-sm" : "text-gray-400"
              )}
              title="Line chart"
            >
              <LineChart className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartStyle("area")}
              className={cn(
                "p-1.5 rounded-md transition-all",
                chartStyle === "area" ? "bg-white text-teal-700 shadow-sm" : "text-gray-400"
              )}
              title="Area chart"
            >
              <AreaChart className="w-4 h-4" />
            </button>
          </div>

          {/* Toggle Comparison */}
          <button
            onClick={() => setShowComparison(!showComparison)}
            className={cn(
              "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border",
              showComparison
                ? "bg-teal-50 text-teal-700 border-teal-200"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
            )}
          >
            {showComparison ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            Comparisons
          </button>
        </div>
      </div>

      {/* ═══ Vital Selector Pills ═══ */}
      <div className="flex flex-wrap items-center gap-2">
        {vitals.map((v) => (
          <button
            key={v.id}
            onClick={() => setSelectedVital(v.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all border",
              selectedVital === v.id
                ? "bg-white text-gray-900 border-gray-300 shadow-sm ring-1 ring-gray-200"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700"
            )}
          >
            <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center", v.bg)}>
              <v.icon className={cn("w-3.5 h-3.5", v.color)} />
            </div>
            <span>{v.label}</span>
            <span className="text-gray-300">·</span>
            <span className={cn(
              selectedVital === v.id ? "text-gray-700" : "text-gray-400"
            )}>
              {v.unit}
            </span>
          </button>
        ))}
      </div>

      {/* ═══ Main Chart Card ═══ */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", config.bg)}>
                <config.icon className={cn("w-5 h-5", config.color)} />
              </div>
              <div>
                <CardTitle className="text-lg">{config.label} Trends</CardTitle>
                <p className="text-xs text-gray-500">
                  {timeRange === "7d" ? "7" : timeRange === "30d" ? "30" : timeRange === "90d" ? "90" : "365"}-day history
                </p>
              </div>
            </div>

            {/* Stats Badges */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Min</p>
                <p className="text-sm font-bold text-gray-700">{config.formatValue(min)}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Avg</p>
                <p className="text-sm font-bold text-gray-700">{config.formatValue(avg)}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Max</p>
                <p className="text-sm font-bold text-gray-700">{config.formatValue(max)}</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Latest</p>
                <p className="text-sm font-bold flex items-center gap-1">
                  <span style={{ color: config.color }}>{config.formatValue(latest)}</span>
                  <span className="text-[10px] text-gray-400 font-normal">{config.unit}</span>
                </p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Change</p>
                <p className={cn(
                  "text-sm font-bold flex items-center gap-0.5",
                  isUp ? "text-emerald-600" : "text-red-500"
                )}>
                  {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {change}%
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Mobile Stats */}
        <div className="sm:hidden px-6 pb-2">
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
            <div className="text-center flex-1">
              <p className="text-[10px] text-gray-400">Min</p>
              <p className="text-xs font-bold text-gray-700">{config.formatValue(min)}</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-[10px] text-gray-400">Avg</p>
              <p className="text-xs font-bold text-gray-700">{config.formatValue(avg)}</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-[10px] text-gray-400">Max</p>
              <p className="text-xs font-bold text-gray-700">{config.formatValue(max)}</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-[10px] text-gray-400">Latest</p>
              <p className="text-xs font-bold" style={{ color: config.color }}>{config.formatValue(latest)}</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-[10px] text-gray-400">Δ</p>
              <p className={cn("text-xs font-bold", isUp ? "text-emerald-600" : "text-red-500")}>
                {change}%
              </p>
            </div>
          </div>
        </div>

        <CardContent className="pt-2">
          <HealthChart
            data={data}
            vitalType={selectedVital}
            chartStyle={chartStyle}
          />
        </CardContent>
      </Card>

      {/* ═══ Comparison Charts ═══ */}
      {showComparison && (
        <div className="grid sm:grid-cols-3 gap-4">
          <MiniComparisonChart
            title="First Half"
            data={firstHalf}
            color={config.color}
          />
          <MiniComparisonChart
            title="Second Half"
            data={secondHalf}
            color={config.color}
          />
          <MiniComparisonChart
            title="Recent Period"
            data={recentThird}
            color={config.color}
          />
        </div>
      )}

      {/* ═══ Quick Insights ═══ */}
      <Card className="bg-gradient-to-br from-teal-600 to-teal-700 text-white border-0">
        <CardContent className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Health Insight</h3>
            <p className="text-sm text-teal-100 leading-relaxed">
              Your {config.label.toLowerCase()} has been {isUp ? "trending slightly upward" : "showing a slight decrease"} recently.
              Your {timeRange === "7d" ? "7-day" : timeRange === "30d" ? "30-day" : timeRange === "90d" ? "90-day" : "annual"} average is{" "}
              <strong>{config.formatValue(avg)} {config.unit}</strong>,
              which is {avg >= config.range[0] && avg <= config.range[1] ? "within the normal range" : "outside the normal range"}.
              {avg >= config.range[0] && avg <= config.range[1] 
                ? " Keep up the great work!" 
                : " Consider consulting your doctor."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ═══ Footer ═══ */}
      <div className="text-center py-2">
        <p className="text-xs text-gray-400">
          Data updated {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          {" · "}Hover over the chart for exact values
        </p>
      </div>
    </div>
  );
}
