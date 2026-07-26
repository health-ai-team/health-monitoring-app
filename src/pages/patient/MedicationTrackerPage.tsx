import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Pill,
  Plus,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  ChevronDown,
  TrendingUp,
  Timer,
  Syringe,
  FlaskConical,
  Info,
  Trash2,
  Edit,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────

interface Medication {
  id: string;
  name: string;
  dosage: string;
  unit: string;
  frequency: string;
  times: string[];
  instructions: string;
  prescribedBy: string;
  prescribedByTitle: string;
  startDate: string;
  endDate: string;
  color: string;
  bg: string;
  icon: "pill" | "syringe" | "liquid";
}

interface Dose {
  id: string;
  medicationId: string;
  date: string;
  time: string;
  taken: boolean | null;
  notes?: string;
}

// ── Mock Data ──────────────────────────────────────────────

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const medications: Medication[] = [
  {
    id: "med-1",
    name: "Lisinopril",
    dosage: "10",
    unit: "mg",
    frequency: "1x daily",
    times: ["08:00"],
    instructions: "Take with food, avoid grapefruit",
    prescribedBy: "Dr. Sarah Chen",
    prescribedByTitle: "Cardiologist",
    startDate: "Jan 15, 2026",
    endDate: "Jun 15, 2026",
    color: "text-rose-600",
    bg: "bg-rose-50",
    icon: "pill",
  },
  {
    id: "med-2",
    name: "Metformin",
    dosage: "500",
    unit: "mg",
    frequency: "2x daily",
    times: ["08:00", "20:00"],
    instructions: "Take with meals",
    prescribedBy: "Dr. James Lee",
    prescribedByTitle: "Endocrinologist",
    startDate: "Feb 1, 2026",
    endDate: "Aug 1, 2026",
    color: "text-blue-600",
    bg: "bg-blue-50",
    icon: "pill",
  },
  {
    id: "med-3",
    name: "Atorvastatin",
    dosage: "20",
    unit: "mg",
    frequency: "1x daily",
    times: ["20:00"],
    instructions: "Take at bedtime",
    prescribedBy: "Dr. Sarah Chen",
    prescribedByTitle: "Cardiologist",
    startDate: "Jan 15, 2026",
    endDate: "Dec 31, 2026",
    color: "text-amber-600",
    bg: "bg-amber-50",
    icon: "pill",
  },
  {
    id: "med-4",
    name: "Vitamin D3",
    dosage: "2000",
    unit: "IU",
    frequency: "1x daily",
    times: ["08:00"],
    instructions: "Take with breakfast",
    prescribedBy: "Self",
    prescribedByTitle: "Supplement",
    startDate: "Mar 1, 2026",
    endDate: "Ongoing",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    icon: "pill",
  },
];

function generateDoseLogs(): Dose[] {
  const logs: Dose[] = [];
  const now = new Date();

  for (let dayOffset = 6; dayOffset >= 0; dayOffset--) {
    const d = new Date(now);
    d.setDate(d.getDate() - dayOffset);
    const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    for (const med of medications) {
      for (const time of med.times) {
        const [hours] = time.split(":").map(Number);
        const isPast = dayOffset > 0 || (dayOffset === 0 && hours <= now.getHours());
        logs.push({
          id: `dose-${med.id}-${dateStr}-${time.replace(":", "")}`,
          medicationId: med.id,
          date: dateStr,
          time,
          taken: isPast ? Math.random() > 0.2 : null,
          notes: isPast && Math.random() > 0.9 ? "Felt nauseous after taking" : undefined,
        });
      }
    }
  }

  return logs;
}

const doseLogs = generateDoseLogs();

const timeFormat = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
};

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ── Icon Component ─────────────────────────────────────────

function MedIcon({ type, className }: { type: Medication["icon"]; className?: string }) {
  switch (type) {
    case "syringe": return <Syringe className={className} />;
    case "liquid": return <FlaskConical className={className} />;
    default: return <Pill className={className} />;
  }
}

// ── Dose Button ────────────────────────────────────────────

// ── Add Medication Form ────────────────────────────────────

function AddMedicationForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    unit: "mg",
    frequency: "1x daily",
    times: "08:00",
    instructions: "",
    prescribedBy: "",
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Card className="border-teal-100 bg-gradient-to-br from-teal-50/50 to-white">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-lg">Add New Medication</CardTitle>
          <CardDescription>Enter the medication details prescribed by your doctor</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <XCircle className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="med-name" className="text-xs text-gray-600">Medication Name</Label>
              <Input
                id="med-name"
                placeholder="e.g. Lisinopril"
                value={formData.name}
                onChange={handleChange("name")}
                className="h-9"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <Label htmlFor="med-dosage" className="text-xs text-gray-600">Dosage</Label>
                <Input
                  id="med-dosage"
                  type="number"
                  placeholder="10"
                  value={formData.dosage}
                  onChange={handleChange("dosage")}
                  className="h-9"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="med-unit" className="text-xs text-gray-600">Unit</Label>
                <select
                  id="med-unit"
                  value={formData.unit}
                  onChange={handleChange("unit")}
                  className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all"
                >
                  <option value="mg">mg</option>
                  <option value="mcg">mcg</option>
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                  <option value="IU">IU</option>
                  <option value="tablets">tablets</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="med-frequency" className="text-xs text-gray-600">Frequency</Label>
              <select
                id="med-frequency"
                value={formData.frequency}
                onChange={handleChange("frequency")}
                className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all"
              >
                <option value="1x daily">1x daily</option>
                <option value="2x daily">2x daily</option>
                <option value="3x daily">3x daily</option>
                <option value="4x daily">4x daily</option>
                <option value="Every other day">Every other day</option>
                <option value="1x weekly">1x weekly</option>
                <option value="As needed">As needed</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="med-times" className="text-xs text-gray-600">Time(s)</Label>
              <Input
                id="med-times"
                type="time"
                value={formData.times}
                onChange={handleChange("times")}
                className="h-9"
              />
              <p className="text-[10px] text-gray-400">Comma separated for multiple times</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="med-instructions" className="text-xs text-gray-600">Instructions</Label>
            <Input
              id="med-instructions"
              placeholder="e.g. Take with food"
              value={formData.instructions}
              onChange={handleChange("instructions")}
              className="h-9"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="med-prescriber" className="text-xs text-gray-600">Prescribed By</Label>
            <Input
              id="med-prescriber"
              placeholder="Dr. Name"
              value={formData.prescribedBy}
              onChange={handleChange("prescriber")}
              className="h-9"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-1">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
            <Button type="submit" size="sm" className="bg-gradient-to-r from-teal-600 to-teal-500 text-white">
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Medication
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// ── Main Page Component ────────────────────────────────────

export default function MedicationTrackerPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedMed, setExpandedMed] = useState<string | null>(null);
  const [selectedDate] = useState(
    new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })
  );

  // Calculate adherence
  const totalDoses = doseLogs.filter((d) => d.date === selectedDate).length;
  const takenDoses = doseLogs.filter((d) => d.date === selectedDate && d.taken === true).length;
  const pendingDoses = doseLogs.filter((d) => d.date === selectedDate && d.taken === null).length;

  const weekDoses = doseLogs.length;
  const weekTaken = doseLogs.filter((d) => d.taken === true).length;
  const adherenceRate = weekDoses > 0 ? Math.round((weekTaken / weekDoses) * 100) : 0;

  // Today's schedule (sorted by time)
  const todayMeds = medications
    .map((med) => ({
      ...med,
      times: med.times.filter((t) => {
        const [h] = t.split(":").map(Number);
        const now = new Date().getHours();
        return h >= now - 2 && h <= now + 8;
      }),
    }))
    .filter((med) => med.times.length > 0)
    .sort((a, b) => {
      const aTime = parseInt(a.times[0]?.replace(":", "") ?? "9999");
      const bTime = parseInt(b.times[0]?.replace(":", "") ?? "9999");
      return aTime - bTime;
    });

  // Weekly adherence data for chart
  const weekData = weekDays.map((day) => {
    const dayDoses = doseLogs.filter((d) => {
      const doseDate = new Date();
      const dayIndex = weekDays.indexOf(day);
      doseDate.setDate(doseDate.getDate() - (6 - dayIndex));
      return d.date === doseDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    });
    return {
      day,
      total: dayDoses.length,
      taken: dayDoses.filter((d) => d.taken === true).length,
    };
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ═══ Header ═══ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-sm">
              <Pill className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Medication Tracker</h1>
          </div>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            {today}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-50 border border-teal-100">
            <TrendingUp className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-medium text-teal-700">{adherenceRate}% adherence</span>
          </div>
          <Button
            size="sm"
            className="bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-sm"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Add Medication
          </Button>
        </div>
      </div>

      {/* ═══ Add Medication Form ═══ */}
      {showAddForm && <AddMedicationForm onClose={() => setShowAddForm(false)} />}

      {/* ═══ Today's Summary ═══ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-4 sm:p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
              <Pill className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Meds</p>
              <p className="text-xl font-bold text-gray-900">{medications.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Taken Today</p>
              <p className="text-xl font-bold text-gray-900">{takenDoses}/{totalDoses}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <Timer className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-xl font-bold text-gray-900">{pendingDoses}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Best Streak</p>
              <p className="text-xl font-bold text-gray-900">12 days</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ═══ Main 2-Column Layout ═══ */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* ── Left Column (3/5) — Today's Schedule + Active Meds ── */}
        <div className="lg:col-span-3 space-y-6">
          {/* Today's Schedule */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Today's Schedule</CardTitle>
                <Badge variant="secondary" size="sm" className="gap-1">
                  <Clock className="w-3 h-3" />
                  {takenDoses}/{totalDoses} taken
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {/* Timeline */}
              <div className="relative pl-8 space-y-0">
                {/* Timeline line */}
                <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-200 rounded-full" />

                {todayMeds.length === 0 ? (
                  <div className="py-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-6 h-6 text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-500">All medications for today are completed!</p>
                  </div>
                ) : (
                  todayMeds.map((med) => (
                    med.times.map((time) => {
                      const dose = doseLogs.find(
                        (d) => d.medicationId === med.id && d.time === time && d.date === selectedDate
                      );
                      const isTaken = dose?.taken === true;
                      const isMissed = dose?.taken === false;
                      const isPending = dose?.taken === null;

                      let dotColor = "bg-gray-300";
                      if (isTaken) dotColor = "bg-emerald-500";
                      else if (isMissed) dotColor = "bg-red-500";
                      else if (isPending) dotColor = "bg-amber-400";

                      return (
                        <div key={`${med.id}-${time}`} className="relative pb-6 last:pb-0">
                          {/* Timeline dot */}
                          <div className={cn("absolute -left-[23px] top-1 w-[14px] h-[14px] rounded-full border-2 border-white ring-2", dotColor)} />

                          <div className={cn(
                            "p-4 rounded-xl border transition-all duration-200",
                            isTaken ? "bg-emerald-50/50 border-emerald-100" :
                            isMissed ? "bg-red-50/50 border-red-100" :
                            "bg-white border-gray-100 hover:border-teal-100 hover:shadow-sm"
                          )}>
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3 min-w-0">
                                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5", med.bg)}>
                                  <MedIcon type={med.icon} className={cn("w-4 h-4", med.color)} />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-sm font-semibold text-gray-900">{med.name}</h3>
                                    <span className="text-xs text-gray-500">{med.dosage}{med.unit}</span>
                                    <Badge variant="secondary" size="sm">{med.frequency}</Badge>
                                  </div>
                                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {timeFormat(time)}
                                    </span>
                                    <span>{med.instructions}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Dose status badge */}
                              <div className="shrink-0">
                                {isTaken ? (
                                  <Badge variant="success" size="sm" className="gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> Taken
                                  </Badge>
                                ) : isMissed ? (
                                  <Badge variant="destructive" size="sm" className="gap-1">
                                    <XCircle className="w-3 h-3" /> Missed
                                  </Badge>
                                ) : (
                                  <div className="flex gap-1">
                                    <button className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" /> Take
                                    </button>
                                    <button className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium border border-red-200 hover:bg-red-100 transition-colors flex items-center gap-1">
                                      <XCircle className="w-3 h-3" /> Skip
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Active Medications */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Active Medications</CardTitle>
                <Badge variant="secondary" size="sm">{medications.length} total</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {medications.map((med) => {
                const isExpanded = expandedMed === med.id;
                const doseCount = doseLogs.filter(
                  (d) => d.medicationId === med.id && d.taken !== null
                ).length;
                const takenCount = doseLogs.filter(
                  (d) => d.medicationId === med.id && d.taken === true
                ).length;
                const medAdherence = doseCount > 0 ? Math.round((takenCount / doseCount) * 100) : 0;

                return (
                  <div key={med.id} className={cn("border-b border-gray-50 last:border-0", isExpanded && "bg-gray-50/50")}>

                    <button
                      onClick={() => setExpandedMed(isExpanded ? null : med.id)}
                      className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", med.bg)}>
                        <MedIcon type={med.icon} className={cn("w-5 h-5", med.color)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-gray-900">{med.name}</span>
                          <span className="text-xs text-gray-500">{med.dosage}{med.unit}</span>
                          <span className="text-xs text-gray-400">·</span>
                          <span className="text-xs text-gray-500">{med.frequency}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400">
                          <span>By {med.prescribedBy}</span>
                          <span>·</span>
                          <span>Until {med.endDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className={cn(
                            "text-sm font-semibold",
                            medAdherence >= 80 ? "text-emerald-600" :
                            medAdherence >= 60 ? "text-amber-600" : "text-red-600"
                          )}>
                            {medAdherence}%
                          </div>
                          <div className="text-[10px] text-gray-400">adherence</div>
                        </div>
                        <ChevronDown className={cn(
                          "w-4 h-4 text-gray-400 transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )} />
                      </div>
                    </button>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <div className="px-5 pb-4 space-y-3 animate-fade-in">
                        <Separator />
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div>
                            <p className="text-xs text-gray-400">Prescribed By</p>
                            <p className="text-sm font-medium text-gray-700">{med.prescribedBy}</p>
                            <p className="text-xs text-gray-400">{med.prescribedByTitle}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Dosage</p>
                            <p className="text-sm font-medium text-gray-700">{med.dosage}{med.unit}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Frequency</p>
                            <p className="text-sm font-medium text-gray-700">{med.frequency}</p>
                            <p className="text-xs text-gray-400">{med.times.map(timeFormat).join(", ")}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Period</p>
                            <p className="text-sm font-medium text-gray-700">{med.startDate}</p>
                            <p className="text-xs text-gray-400">→ {med.endDate}</p>
                          </div>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-3 flex items-start gap-2">
                          <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                          <p className="text-xs text-amber-800">{med.instructions}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="text-gray-600 text-xs">
                            <Edit className="w-3 h-3 mr-1" /> Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 text-xs hover:text-red-600 hover:bg-red-50">
                            <Trash2 className="w-3 h-3 mr-1" /> Remove
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* ── Right Column (2/5) — Adherence + Info ── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Adherence Chart */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Weekly Adherence</CardTitle>
                <Badge variant="secondary" size="sm" className="gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {adherenceRate}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Bar Chart */}
              <div className="flex items-end justify-between gap-2 h-32 mb-4">
                {weekData.map((day) => {
                  const pct = day.total > 0 ? (day.taken / day.total) * 100 : 0;
                  const barHeight = Math.max(pct * 0.01 * 100, day.total > 0 ? 8 : 0);

                  return (
                    <div key={day.day} className="flex flex-col items-center gap-1.5 flex-1">
                      <span className="text-[10px] text-gray-400 font-medium">
                        {day.taken}/{day.total}
                      </span>
                      <div className="w-full bg-gray-100 rounded-full h-20 relative overflow-hidden">
                        <div
                          className={cn(
                            "absolute bottom-0 w-full rounded-full transition-all duration-500",
                            pct >= 80 ? "bg-emerald-500" :
                            pct >= 50 ? "bg-amber-500" : "bg-red-500"
                          )}
                          style={{ height: `${barHeight}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400">{day.day}</span>
                    </div>
                  );
                })}
              </div>

              <Separator className="my-4" />

              {/* Adherence Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Total doses this week</span>
                  <span className="font-semibold text-gray-900">{weekDoses}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Taken</span>
                  <span className="font-semibold text-emerald-600">{weekTaken}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Missed</span>
                  <span className="font-semibold text-red-500">{weekDoses - weekTaken - doseLogs.filter(d => d.taken === null).length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Pending</span>
                  <span className="font-semibold text-amber-500">{doseLogs.filter(d => d.taken === null).length}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Current Streak</span>
                  <span className="font-semibold text-teal-600">12 days 🎉</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                  ≥ 80%
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
                  50–79%
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-red-500" />
                  {'<'} 50%
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Tips & Info */}
          <Card className="bg-gradient-to-br from-teal-600 to-teal-700 text-white border-0">
            <CardHeader>
              <CardTitle className="text-white text-lg">Medication Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold">1</span>
                </div>
                <p className="text-sm text-teal-100">Set daily reminders for each medication time.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold">2</span>
                </div>
                <p className="text-sm text-teal-100">Keep a medication log to track side effects.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold">3</span>
                </div>
                <p className="text-sm text-teal-100">Refill prescriptions at least 5 days before running out.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold">4</span>
                </div>
                <p className="text-sm text-teal-100">Always consult your doctor before stopping medication.</p>
              </div>
            </CardContent>
          </Card>

          {/* Doctor Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Prescribing Doctors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[...new Set(medications.map((m) => m.prescribedBy))].map((doctor) => {
                  const docMeds = medications.filter((m) => m.prescribedBy === doctor);
                  return (
                    <div key={doctor} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold">
                        {doctor.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{doctor}</p>
                        <p className="text-xs text-gray-400">{docMeds[0].prescribedByTitle} · {docMeds.length} medication{docMeds.length > 1 ? "s" : ""}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
