import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Activity,
  Heart,
  Thermometer,
  Droplets,
  AlertTriangle,
  Clock,
  Monitor,
  RefreshCw,
} from "lucide-react";

interface MonitoredPatient {
  id: string; name: string; room: string;
  hr: number; bpSys: number; bpDia: number; temp: number; o2: number;
  hrStatus: "normal" | "warning" | "critical";
  bpStatus: "normal" | "warning" | "critical";
  tempStatus: "normal" | "warning" | "critical";
  o2Status: "normal" | "warning" | "critical";
  lastUpdate: string;
  history: number[];
}

const patients: MonitoredPatient[] = [
  { id: "m1", name: "Sarah Johnson", room: "ICU-4", hr: 112, bpSys: 145, bpDia: 92, temp: 38.2, o2: 91, hrStatus: "critical", bpStatus: "warning", tempStatus: "warning", o2Status: "critical", lastUpdate: "Just now", history: [108, 112, 110, 115, 112, 109, 112] },
  { id: "m2", name: "Robert Chen", room: "Med-212", hr: 95, bpSys: 165, bpDia: 105, temp: 36.8, o2: 94, hrStatus: "warning", bpStatus: "critical", tempStatus: "normal", o2Status: "warning", lastUpdate: "30s ago", history: [92, 95, 98, 94, 96, 93, 95] },
  { id: "m3", name: "Michael Park", room: "Resp-306", hr: 88, bpSys: 130, bpDia: 85, temp: 37.1, o2: 89, hrStatus: "normal", bpStatus: "normal", tempStatus: "normal", o2Status: "critical", lastUpdate: "1m ago", history: [85, 88, 86, 90, 87, 89, 88] },
  { id: "m4", name: "Emily Davis", room: "Surg-108", hr: 78, bpSys: 118, bpDia: 76, temp: 36.9, o2: 98, hrStatus: "normal", bpStatus: "normal", tempStatus: "normal", o2Status: "normal", lastUpdate: "2m ago", history: [76, 78, 80, 77, 75, 78, 78] },
  { id: "m5", name: "Lisa Thompson", room: "Med-105", hr: 72, bpSys: 122, bpDia: 78, temp: 36.6, o2: 99, hrStatus: "normal", bpStatus: "normal", tempStatus: "normal", o2Status: "normal", lastUpdate: "3m ago", history: [70, 72, 74, 71, 73, 72, 72] },
];

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const w = 56, h = 20, min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const pts = data.map((v, i) => ({ x: (i / (data.length - 1)) * w, y: h - ((v - min) / range) * (h - 4) - 2 }));
  const line = pts.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(" ");
  return <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-5"><path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function DoctorMonitoringPage() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedVital, setSelectedVital] = useState<string>("all");

  const vitals = [
    { id: "all", label: "All Vitals", icon: Activity, color: "text-gray-600" },
    { id: "hr", label: "Heart Rate", icon: Heart, color: "text-rose-600" },
    { id: "bp", label: "Blood Pressure", icon: Activity, color: "text-teal-600" },
    { id: "temp", label: "Temperature", icon: Thermometer, color: "text-amber-600" },
    { id: "o2", label: "Oxygen", icon: Droplets, color: "text-blue-600" },
  ];

  const statusColor = (s: string) => s === "critical" ? "bg-red-500" : s === "warning" ? "bg-amber-500" : "bg-emerald-500";

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2"><Monitor className="w-5 h-5 text-teal-600" /><h1 className="text-2xl font-bold text-gray-900">Patient Monitoring</h1></div>
          <p className="text-gray-500 mt-1">Real-time vital signs monitoring · {patients.length} active patients</p>
        </div>
        <button onClick={() => setAutoRefresh(!autoRefresh)} className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
          autoRefresh ? "bg-teal-50 text-teal-700 border-teal-200" : "bg-white text-gray-500 border-gray-200"
        )}>
          <RefreshCw className={cn("w-3 h-3", autoRefresh && "animate-spin")} />
          Auto-refresh
        </button>
      </div>

      {/* Vital filter */}
      <div className="flex flex-wrap items-center gap-2">
        {vitals.map((v) => (
          <button key={v.id} onClick={() => setSelectedVital(v.id)}
            className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
              selectedVital === v.id ? "bg-white text-gray-900 border-gray-300 shadow-sm" : "bg-white text-gray-500 border-gray-200"
            )}>
            <v.icon className={cn("w-3.5 h-3.5", v.color)} />{v.label}
          </button>
        ))}
      </div>

      {/* Patient vitals grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {patients.map((p) => (
          <Card key={p.id} className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{p.name}</span>
                  <Badge variant="outline" size="sm" className="text-[10px]">{p.room}</Badge>
                </div>
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />{p.lastUpdate}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* HR */}
              <div className={cn("p-2.5 rounded-xl border transition-all", selectedVital !== "all" && selectedVital !== "hr" && "opacity-40")}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5"><Heart className={cn("w-3.5 h-3.5", p.hrStatus === "critical" ? "text-red-500" : p.hrStatus === "warning" ? "text-amber-500" : "text-gray-400")} /><span className="text-xs text-gray-500">Heart Rate</span></div>
                  <div className="flex items-center gap-1"><span className={cn("text-sm font-bold", p.hrStatus === "critical" ? "text-red-600" : p.hrStatus === "warning" ? "text-amber-600" : "text-gray-700")}>{p.hr}</span><span className="text-[10px] text-gray-400">bpm</span></div>
                </div>
                <div className="flex items-center justify-between">
                  <MiniSparkline data={p.history} color={p.hrStatus === "critical" ? "#ef4444" : p.hrStatus === "warning" ? "#f59e0b" : "#10b981"} />
                  <span className={cn("w-2 h-2 rounded-full", statusColor(p.hrStatus))} />
                </div>
              </div>

              {/* BP */}
              <div className={cn("p-2.5 rounded-xl border transition-all", selectedVital !== "all" && selectedVital !== "bp" && "opacity-40")}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5"><Activity className={cn("w-3.5 h-3.5", p.bpStatus === "critical" ? "text-red-500" : p.bpStatus === "warning" ? "text-amber-500" : "text-gray-400")} /><span className="text-xs text-gray-500">Blood Pressure</span></div>
                  <div className="flex items-center gap-1"><span className={cn("text-sm font-bold", p.bpStatus === "critical" ? "text-red-600" : p.bpStatus === "warning" ? "text-amber-600" : "text-gray-700")}>{p.bpSys}/{p.bpDia}</span><span className="text-[10px] text-gray-400">mmHg</span></div>
                </div>
                <span className={cn("w-2 h-2 rounded-full block ml-auto", statusColor(p.bpStatus))} />
              </div>

              {/* Temp + O2 side by side */}
              <div className="grid grid-cols-2 gap-2">
                <div className={cn("p-2.5 rounded-xl border", selectedVital !== "all" && selectedVital !== "temp" && "opacity-40")}>
                  <div className="flex items-center justify-between">
                    <Thermometer className={cn("w-3.5 h-3.5", p.tempStatus === "warning" ? "text-amber-500" : "text-gray-400")} />
                    <div className="flex items-center gap-1"><span className={cn("text-xs font-bold", p.tempStatus === "warning" ? "text-amber-600" : "text-gray-700")}>{p.temp.toFixed(1)}</span><span className="text-[9px] text-gray-400">°C</span></div>
                    <span className={cn("w-1.5 h-1.5 rounded-full", statusColor(p.tempStatus))} />
                  </div>
                </div>
                <div className={cn("p-2.5 rounded-xl border", selectedVital !== "all" && selectedVital !== "o2" && "opacity-40")}>
                  <div className="flex items-center justify-between">
                    <Droplets className={cn("w-3.5 h-3.5", p.o2Status === "critical" ? "text-red-500" : p.o2Status === "warning" ? "text-amber-500" : "text-gray-400")} />
                    <div className="flex items-center gap-1"><span className={cn("text-xs font-bold", p.o2Status === "critical" ? "text-red-600" : p.o2Status === "warning" ? "text-amber-600" : "text-gray-700")}>{p.o2}</span><span className="text-[9px] text-gray-400">%</span></div>
                    <span className={cn("w-1.5 h-1.5 rounded-full", statusColor(p.o2Status))} />
                  </div>
                </div>
              </div>

              {/* Critical alert banner */}
              {(p.hrStatus === "critical" || p.bpStatus === "critical" || p.o2Status === "critical") && (
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-red-50 text-red-700 text-[10px] font-medium animate-pulse">
                  <AlertTriangle className="w-3 h-3" /> Critical — immediate attention needed
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center py-2"><p className="text-xs text-gray-400">Vitals refresh every 30 seconds · Hover for details</p></div>
    </div>
  );
}
