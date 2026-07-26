import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Heart,
  Activity,
  Thermometer,
  Droplets,
  Filter,
} from "lucide-react";

interface AlertItem {
  id: string; patient: string; type: "critical" | "warning" | "info";
  message: string; time: string; read: boolean; resolved: boolean;
  vital: string; room: string;
}

const alerts: AlertItem[] = [
  { id: "a1", patient: "Sarah Johnson", type: "critical", message: "Heart rate critically elevated: 112 bpm", time: "2 min ago", read: false, resolved: false, vital: "Heart Rate", room: "ICU-4" },
  { id: "a2", patient: "Robert Chen", type: "critical", message: "Blood pressure spike: 165/105 mmHg", time: "15 min ago", read: false, resolved: false, vital: "BP", room: "Med-212" },
  { id: "a3", patient: "Michael Park", type: "warning", message: "Oxygen saturation low: 89%", time: "35 min ago", read: false, resolved: false, vital: "O₂", room: "Resp-306" },
  { id: "a4", patient: "Sarah Johnson", type: "warning", message: "Temperature elevated: 38.2°C", time: "1 hour ago", read: true, resolved: false, vital: "Temp", room: "ICU-4" },
  { id: "a5", patient: "Emily Davis", type: "info", message: "Post-op check completed, recovering well", time: "2 hours ago", read: true, resolved: true, vital: "General", room: "Surg-108" },
  { id: "a6", patient: "Lisa Thompson", type: "info", message: "Blood glucose levels normalizing", time: "3 hours ago", read: true, resolved: true, vital: "Glucose", room: "Med-105" },
  { id: "a7", patient: "James Wilson", type: "warning", message: "Irregular heart rhythm detected", time: "5 hours ago", read: true, resolved: true, vital: "Heart Rate", room: "Tele-202" },
  { id: "a8", patient: "Thomas Brown", type: "info", message: "Weight increase of 2kg in 3 days", time: "6 hours ago", read: true, resolved: true, vital: "Weight", room: "Med-108" },
];

const typeConfig = {
  critical: { icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50", dot: "bg-red-500 animate-pulse", badge: "destructive" as const },
  warning: { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50", dot: "bg-amber-500", badge: "warning" as const },
  info: { icon: Bell, color: "text-blue-600", bg: "bg-blue-50", dot: "bg-blue-500", badge: "default" as const },
};

const vitalIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Heart Rate": Heart, "BP": Activity, "O₂": Droplets, "Temp": Thermometer, "Glucose": Activity, "Weight": Activity, "General": Bell,
};

export default function DoctorAlertsPage() {
  const [filter, setFilter] = useState<"all" | "unread" | "critical" | "warning">("all");
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const filtered = alerts.filter((a) => {
    if (filter === "unread") return !a.read;
    if (filter === "critical") return a.type === "critical";
    if (filter === "warning") return a.type === "warning";
    return true;
  });

  const unreadCount = alerts.filter((a) => !a.read).length;
  const active = alerts.find((a) => a.id === selectedAlert);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-teal-600" />
            <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
            {unreadCount > 0 && <Badge variant="destructive" size="md">{unreadCount} unread</Badge>}
          </div>
          <p className="text-gray-500 mt-1">Monitor and manage patient alerts</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-gray-400 mr-1"><Filter className="w-3 h-3 inline mr-1" />Show:</span>
        {[
          { id: "all" as const, label: `All (${alerts.length})` },
          { id: "unread" as const, label: `Unread (${unreadCount})` },
          { id: "critical" as const, label: `Critical (${alerts.filter(a => a.type === "critical").length})` },
          { id: "warning" as const, label: `Warning (${alerts.filter(a => a.type === "warning").length})` },
        ].map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
              filter === f.id ? "bg-teal-50 text-teal-700 border-teal-200 shadow-sm" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            )}>{f.label}</button>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-3 space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-16"><CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" /><h3 className="text-lg font-semibold text-gray-700">All clear!</h3><p className="text-sm text-gray-500">No alerts match this filter.</p></div>
          ) : filtered.map((alert) => {
            const config = typeConfig[alert.type];
            const Icon = config.icon;
            const isSelected = selectedAlert === alert.id;
            return (
              <button key={alert.id} onClick={() => setSelectedAlert(isSelected ? null : alert.id)}
                className={cn("w-full text-left p-4 rounded-xl border transition-all",
                  isSelected ? "border-teal-200 bg-teal-50/50 shadow-sm" : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm",
                  !alert.read && !isSelected && "border-l-4 border-l-red-400"
                )}>
                <div className="flex items-start gap-3">
                  <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", config.bg)}>
                    <Icon className={cn("w-4 h-4", config.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900">{alert.patient}</span>
                      <Badge variant={config.badge} size="sm">{alert.type}</Badge>
                      {!alert.read && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">{alert.message}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span>{alert.room}</span><span>·</span><span>{alert.vital}</span><span>·</span><span>{alert.time}</span>
                    </div>
                  </div>
                  {alert.resolved && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <div className="lg:col-span-2">
          {active ? (
            <Card className="sticky top-24">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", typeConfig[active.type].bg)}>
                      {(() => { const Icon = typeConfig[active.type].icon; return <Icon className={cn("w-4 h-4", typeConfig[active.type].color)} />; })()}
                    </div>
                    <div><CardTitle className="text-base">{active.patient}</CardTitle><CardDescription>{active.room}</CardDescription></div>
                  </div>
                  <Badge variant={typeConfig[active.type].badge}>{active.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
                  {(() => {
                    const VitalIcon = vitalIcons[active.vital] ?? Bell;
                    return <VitalIcon className="w-5 h-5 text-gray-400" />;
                  })()}
                  <div><p className="text-xs text-gray-400">Affected Vital</p><p className="text-sm font-medium text-gray-700">{active.vital}</p></div>
                </div>
                <p className="text-sm text-gray-700 bg-amber-50 rounded-lg p-3">{active.message}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{active.time}</p>
                <div className="flex gap-2 pt-1">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-teal-600 to-teal-500 text-white"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Resolve</Button>
                  <Button size="sm" variant="outline" className="flex-1"><Heart className="w-3.5 h-3.5 mr-1" /> View Patient</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-24">
              <CardContent className="flex flex-col items-center py-12"><Bell className="w-10 h-10 text-gray-300 mb-3" /><p className="text-sm font-semibold text-gray-600">Select an alert</p><p className="text-xs text-gray-400">Click on an alert to view details</p></CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
