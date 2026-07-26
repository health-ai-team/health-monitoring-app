import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Search,
  AlertTriangle,
  Users,
  Clock,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Heart,
  Activity,
  Thermometer,
  Droplets,
  Calendar,
  Bell,
  MessageSquare,
  FileText,
  ChevronRight,
  Stethoscope,
  Syringe,
  ClipboardList,
  CheckCircle2,
  UserPlus,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";

// ── Mock Data ──────────────────────────────────────────────

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "M" | "F";
  condition: string;
  room: string;
  status: "critical" | "warning" | "stable" | "improving";
  vitals: { hr: number; bp: string; temp: number; o2: number };
  lastUpdate: string;
  visitReason: string;
  doctorNotes?: string;
}

const patients: Patient[] = [
  {
    id: "p1", name: "Sarah Johnson", age: 54, gender: "F",
    condition: "Post-MI Recovery", room: "ICU-4",
    status: "critical",
    vitals: { hr: 112, bp: "145/92", temp: 38.2, o2: 91 },
    lastUpdate: "2 min ago",
    visitReason: "Chest pain, monitoring post-MI",
    doctorNotes: "Elevated troponin, monitoring closely",
  },
  {
    id: "p2", name: "Robert Chen", age: 67, gender: "M",
    condition: "Hypertensive Crisis", room: "Med-212",
    status: "warning",
    vitals: { hr: 95, bp: "165/105", temp: 36.8, o2: 94 },
    lastUpdate: "15 min ago",
    visitReason: "Severe headache, BP spike",
  },
  {
    id: "p3", name: "Emily Davis", age: 42, gender: "F",
    condition: "Post-Surgery", room: "Surg-108",
    status: "improving",
    vitals: { hr: 78, bp: "118/76", temp: 36.9, o2: 98 },
    lastUpdate: "1 hour ago",
    visitReason: "Appendectomy follow-up",
    doctorNotes: "Recovering well, discharge tomorrow",
  },
  {
    id: "p4", name: "Michael Park", age: 71, gender: "M",
    condition: "COPD Exacerbation", room: "Resp-306",
    status: "warning",
    vitals: { hr: 88, bp: "130/85", temp: 37.1, o2: 89 },
    lastUpdate: "35 min ago",
    visitReason: "Shortness of breath, O2 sats low",
  },
  {
    id: "p5", name: "Lisa Thompson", age: 35, gender: "F",
    condition: "Diabetes Management", room: "Med-105",
    status: "stable",
    vitals: { hr: 72, bp: "122/78", temp: 36.6, o2: 99 },
    lastUpdate: "3 hours ago",
    visitReason: "Routine glucose monitoring",
  },
];

interface Appointment {
  id: string;
  time: string;
  patient: string;
  type: string;
  duration: string;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
}

const todayAppts: Appointment[] = [
  { id: "a1", time: "9:00 AM", patient: "James Wilson", type: "Follow-up", duration: "30 min", status: "completed" },
  { id: "a2", time: "10:00 AM", patient: "Maria Garcia", type: "Annual Checkup", duration: "45 min", status: "in-progress" },
  { id: "a3", time: "11:00 AM", patient: "David Kim", type: "Consultation", duration: "30 min", status: "scheduled" },
  { id: "a4", time: "1:00 PM", patient: "Jennifer Lee", type: "Test Results", duration: "20 min", status: "scheduled" },
  { id: "a5", time: "2:00 PM", patient: "Thomas Brown", type: "Medication Review", duration: "30 min", status: "scheduled" },
  { id: "a6", time: "3:30 PM", patient: "Amanda White", type: "New Patient Visit", duration: "60 min", status: "scheduled" },
];

interface Activity {
  id: string;
  action: string;
  patient: string;
  detail: string;
  time: string;
  type: "lab" | "prescription" | "alert" | "note" | "admission" | "discharge";
}

const recentActivity: Activity[] = [
  { id: "act1", action: "Lab results uploaded", patient: "Sarah Johnson", detail: "Cardiac enzyme panel", time: "10 min ago", type: "lab" },
  { id: "act2", action: "Prescription refilled", patient: "Michael Park", detail: "Albuterol inhaler", time: "45 min ago", type: "prescription" },
  { id: "act3", action: "Vitals alert resolved", patient: "Robert Chen", detail: "BP now 145/92, responding to meds", time: "1 hour ago", type: "alert" },
  { id: "act4", action: "New patient admitted", patient: "Lisa Thompson", detail: "Med-Surg unit, bed 105", time: "2 hours ago", type: "admission" },
  { id: "act5", action: "Follow-up scheduled", patient: "Emily Davis", detail: "Post-op day 2 check", time: "3 hours ago", type: "note" },
  { id: "act6", action: "Discharge summary signed", patient: "George Harris", detail: "Discharged to home care", time: "4 hours ago", type: "discharge" },
];

const quickStats = [
  { label: "Total Patients", value: "128", change: "+4", changeLabel: "this week", icon: Users, color: "text-teal-600", bg: "bg-teal-50" },
  { label: "Critical Alerts", value: "3", change: "-2", changeLabel: "from yesterday", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
  { label: "Pending Reviews", value: "12", change: "+3", changeLabel: "since morning", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Avg Response", value: "4.2", unit: "min", change: "-0.8", changeLabel: "improvement", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
];

const statusConfig = {
  critical: { variant: "destructive" as const, label: "Critical", dot: "bg-red-500 animate-pulse" },
  warning: { variant: "warning" as const, label: "Warning", dot: "bg-amber-500" },
  improving: { variant: "success" as const, label: "Improving", dot: "bg-teal-500" },
  stable: { variant: "success" as const, label: "Stable", dot: "bg-emerald-500" },
};

const activityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  lab: FileText,
  prescription: Syringe,
  alert: Bell,
  admission: UserPlus,
  note: ClipboardList,
  discharge: CheckCircle2,
};

const apptStatusConfig = {
  completed: { label: "Done", class: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  "in-progress": { label: "Now", class: "bg-blue-100 text-blue-700 border-blue-200" },
  scheduled: { label: "Upcoming", class: "bg-gray-100 text-gray-500 border-gray-200" },
  cancelled: { label: "Cancelled", class: "bg-red-50 text-red-500 border-red-100" },
};

// ── Vital Sparkline Mini ───────────────────────────────────

function VitalMini({ label, value, unit, color, bg }: {
  label: string; value: string; unit: string; color: string; bg: string;
}) {
  return (
    <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-gray-50/80">
      <div className={cn("w-6 h-6 rounded-md flex items-center justify-center", bg)}>
        {label === "HR" ? <Heart className={cn("w-3 h-3", color)} /> :
         label === "BP" ? <Activity className={cn("w-3 h-3", color)} /> :
         label === "Temp" ? <Thermometer className={cn("w-3 h-3", color)} /> :
         <Droplets className={cn("w-3 h-3", color)} />}
      </div>
      <div className="leading-tight">
        <p className="text-[10px] text-gray-400">{label}</p>
        <p className={cn("text-xs font-semibold", color)}>{value}<span className="text-[9px] text-gray-400 font-normal ml-0.5">{unit}</span></p>
      </div>
    </div>
  );
}

// ── Demo Bar Chart ─────────────────────────────────────────

function AgeBar({ label, count, total, color = "bg-teal-500" }: { label: string; count: number; total: number; color?: string }) {
  const pct = (count / total) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 w-12 shrink-0">{label}</span>
      <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all duration-500", color)} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-500 w-6 text-right">{count}</span>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────

export default function DoctorDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Age demographics
  const ageGroups = [
    { label: "0-18", count: 8, color: "bg-blue-400" },
    { label: "19-35", count: 22, color: "bg-teal-400" },
    { label: "36-50", count: 35, color: "bg-teal-500" },
    { label: "51-65", count: 38, color: "bg-amber-400" },
    { label: "65+", count: 25, color: "bg-rose-400" },
  ];
  const totalPatients = ageGroups.reduce((a, g) => a + g.count, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ═══ Header ═══ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">Good morning, Dr. Chen</h1>
            <Sparkles className="w-5 h-5 text-amber-400 hidden sm:inline" />
          </div>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            <span className="text-gray-300">·</span>
            <Stethoscope className="w-3.5 h-3.5" />
            Cardiology Department
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search patients by name, condition, room..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 text-sm"
          />
        </div>
      </div>

      {/* ═══ Quick Stats ═══ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {quickStats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-md transition-all duration-200">
            <CardContent className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
              <div className={cn("w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0", stat.bg)}>
                <stat.icon className={cn("w-5 h-5 sm:w-6 sm:h-6", stat.color)} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500">{stat.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</span>
                  {stat.unit && <span className="text-xs text-gray-400">{stat.unit}</span>}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  {stat.change.startsWith("+") ? (
                    <ArrowUp className="w-3 h-3 text-emerald-500" />
                  ) : stat.change.startsWith("-") ? (
                    <ArrowDown className="w-3 h-3 text-teal-500" />
                  ) : null}
                  <span className={cn(
                    "text-xs",
                    stat.change.startsWith("+") ? "text-emerald-600" :
                    stat.change.startsWith("-") ? "text-teal-600" : "text-gray-400"
                  )}>
                    {stat.change} {stat.changeLabel}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ═══ Main Content ═══ */}
      <div className="grid xl:grid-cols-5 gap-6">
        {/* ── Left Column (3/5) ── */}
        <div className="xl:col-span-3 space-y-6">
          {/* Priority Patients */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">Patients Needing Attention</CardTitle>
                <Badge variant="destructive" size="sm">
                  {patients.filter((p) => p.status === "critical" || p.status === "warning").length}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" className="text-teal-600 text-xs">
                View all <ChevronRight className="ml-1 w-3 h-3" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              {filteredPatients.length === 0 ? (
                <div className="py-8 text-center">
                  <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No patients match your search</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {filteredPatients.map((patient) => {
                    const status = statusConfig[patient.status];
                    return (
                      <div key={patient.id} className="p-4 sm:p-5 hover:bg-gray-50/50 transition-colors cursor-pointer">
                        <div className="flex items-start gap-4">
                          <div className="relative shrink-0">
                            <Avatar
                              fallback={patient.name.split(" ").map((n) => n[0]).join("")}
                              size="md"
                              className={cn(patient.status === "critical" && "ring-2 ring-red-300")}
                            />
                            <span className={cn(
                              "absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white",
                              status.dot
                            )} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-sm font-semibold text-gray-900">{patient.name}</h3>
                              <span className="text-xs text-gray-400">{patient.age}y · {patient.gender}</span>
                              <Badge variant={status.variant} size="sm">{status.label}</Badge>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                              <span className="font-medium text-gray-700">{patient.condition}</span>
                              <span>·</span>
                              <span>{patient.room}</span>
                              <span>·</span>
                              <span className="text-gray-400">{patient.lastUpdate}</span>
                            </div>

                            {/* Vitals Mini Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-2">
                              <VitalMini label="HR" value={String(patient.vitals.hr)} unit="bpm"
                                color={patient.vitals.hr > 100 ? "text-red-500" : "text-gray-700"}
                                bg={patient.vitals.hr > 100 ? "bg-red-50" : "bg-gray-100"} />
                              <VitalMini label="BP" value={patient.vitals.bp} unit="mmHg"
                                color={patient.vitals.bp.startsWith("1") && parseInt(patient.vitals.bp) > 140 ? "text-red-500" : "text-gray-700"}
                                bg={patient.vitals.bp.startsWith("1") && parseInt(patient.vitals.bp) > 140 ? "bg-red-50" : "bg-gray-100"} />
                              <VitalMini label="Temp" value={patient.vitals.temp.toFixed(1)} unit="°C"
                                color={patient.vitals.temp > 38 ? "text-red-500" : "text-gray-700"}
                                bg={patient.vitals.temp > 38 ? "bg-red-50" : "bg-gray-100"} />
                              <VitalMini label="O₂" value={String(patient.vitals.o2)} unit="%"
                                color={patient.vitals.o2 < 93 ? "text-red-500" : "text-gray-700"}
                                bg={patient.vitals.o2 < 93 ? "bg-red-50" : "bg-gray-100"} />
                            </div>

                            <div className="flex items-center justify-between">
                              <p className="text-xs text-gray-400 italic truncate max-w-[250px]">
                                {patient.doctorNotes ?? patient.visitReason}
                              </p>
                              <div className="flex gap-1 shrink-0">
                                <button className="p-1.5 rounded-md hover:bg-teal-50 text-gray-400 hover:text-teal-600 transition-colors">
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </button>
                                <button className="p-1.5 rounded-md hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors">
                                  <FileText className="w-3.5 h-3.5" />
                                </button>
                                <button className="p-1.5 rounded-md hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-colors">
                                  <MoreHorizontal className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">Today's Schedule</CardTitle>
                <Badge variant="secondary" size="sm">{todayAppts.length} appointments</Badge>
              </div>
              <Button variant="ghost" size="sm" className="text-teal-600 text-xs">
                Full schedule <ChevronRight className="ml-1 w-3 h-3" />
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="relative pl-8">
                {/* Timeline line */}
                <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-gray-200 rounded-full" />

                <div className="space-y-0">
                  {todayAppts.map((appt) => {
                    const apptConfig = apptStatusConfig[appt.status];
                    const isNow = appt.status === "in-progress";
                    const isComplete = appt.status === "completed";

                    let dotColor = "bg-gray-300";
                    if (isNow) dotColor = "bg-blue-500 ring-2 ring-blue-100";
                    else if (isComplete) dotColor = "bg-emerald-500";

                    return (
                      <div key={appt.id} className={cn("relative pb-5 last:pb-0")}>
                        {/* Timeline dot */}
                        <div className={cn("absolute -left-[23px] top-1 w-[14px] h-[14px] rounded-full border-2 border-white", dotColor)} />

                        <div className={cn(
                          "p-3 rounded-xl border transition-all",
                          isNow
                            ? "bg-blue-50/50 border-blue-200 ring-1 ring-blue-100"
                            : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
                        )}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={cn(
                                "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                                isNow ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                              )}>
                                {appt.time.replace(" AM", "").replace(" PM", "")}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className={cn(
                                    "text-sm font-medium",
                                    isComplete ? "text-gray-400 line-through" : "text-gray-900"
                                  )}>
                                    {appt.patient}
                                  </p>
                                  <span className={cn(
                                    "text-[10px] px-2 py-0.5 rounded-full border font-medium",
                                    apptConfig.class
                                  )}>
                                    {apptConfig.label}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {appt.type} · {appt.duration}
                                </p>
                              </div>
                            </div>
                            {!isComplete && (
                              <Button variant="ghost" size="sm" className="text-teal-600 shrink-0 h-7 px-2 text-xs">
                                Open
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Right Column (2/5) ── */}
        <div className="xl:col-span-2 space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <Badge variant="secondary" size="sm">Live</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {recentActivity.map((act) => {
                  const Icon = activityIcons[act.type] ?? Bell;
                  const iconColors: Record<string, string> = {
                    lab: "text-blue-600 bg-blue-50",
                    prescription: "text-purple-600 bg-purple-50",
                    alert: "text-amber-600 bg-amber-50",
                    admission: "text-teal-600 bg-teal-50",
                    note: "text-gray-600 bg-gray-50",
                    discharge: "text-emerald-600 bg-emerald-50",
                  };
                  const colors = iconColors[act.type] ?? "text-gray-600 bg-gray-50";

                  return (
                    <div key={act.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", colors)}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700">{act.action}</p>
                        <p className="text-xs text-gray-400">
                          <span className="font-medium text-gray-500">{act.patient}</span> · {act.detail}
                        </p>
                      </div>
                      <span className="text-[10px] text-gray-400 shrink-0">{act.time}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Patient Demographics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Patient Demographics</CardTitle>
              <CardDescription>{totalPatients} active patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Age Distribution</p>
                {ageGroups.map((group) => (
                  <AgeBar
                    key={group.label}
                    label={group.label}
                    count={group.count}
                    total={totalPatients}
                    color={group.color}
                  />
                ))}
              </div>

              <Separator className="my-4" />

              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Gender Split</p>
                <div className="flex gap-2">
                  {[
                    { label: "Female", count: 68, total: totalPatients, color: "bg-teal-400", icon: "♀" },
                    { label: "Male", count: 60, total: totalPatients, color: "bg-blue-400", icon: "♂" },
                  ].map((g) => (
                    <div key={g.label} className="flex-1 p-3 rounded-xl bg-gray-50 text-center">
                      <p className="text-xl font-bold text-gray-900">{g.count}</p>
                      <p className="text-xs text-gray-500">{g.label} ({Math.round((g.count / g.total) * 100)}%)</p>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                        <div className={cn("h-full rounded-full", g.color)} style={{ width: `${(g.count / g.total) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status breakdown */}
              <Separator className="my-4" />
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Patient Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Critical", count: 3, color: "bg-red-100 text-red-700" },
                    { label: "Warning", count: 8, color: "bg-amber-100 text-amber-700" },
                    { label: "Stable", count: 95, color: "bg-emerald-100 text-emerald-700" },
                    { label: "Improving", count: 22, color: "bg-teal-100 text-teal-700" },
                  ].map((s) => (
                    <div key={s.label} className={cn("p-2 rounded-lg text-center", s.color.split(" ")[0])}>
                      <p className="text-lg font-bold">{s.count}</p>
                      <p className="text-xs">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Add Patient", icon: UserPlus, color: "text-teal-600", bg: "bg-teal-50" },
                  { label: "New Report", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "Send Message", icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50" },
                  { label: "Create Alert", icon: Bell, color: "text-amber-600", bg: "bg-amber-50" },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-teal-100 hover:shadow-sm hover:bg-gray-50 transition-all duration-200 group"
                  >
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform", action.bg)}>
                      <action.icon className={cn("w-5 h-5", action.color)} />
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
