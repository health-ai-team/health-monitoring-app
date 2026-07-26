import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Clock,
  Plus,
  User,
  Video,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface Appointment {
  id: string; time: string; patient: string; age: number; type: string;
  duration: string; status: "scheduled" | "in-progress" | "completed" | "cancelled";
  mode: "in-person" | "telehealth"; notes?: string;
}

const todayAppts: Appointment[] = [
  { id: "s1", time: "8:00 AM", patient: "James Wilson", age: 58, type: "Follow-up - Cardiac", duration: "30 min", status: "completed", mode: "in-person" },
  { id: "s2", time: "9:00 AM", patient: "Maria Garcia", age: 45, type: "Annual Checkup", duration: "45 min", status: "completed", mode: "in-person" },
  { id: "s3", time: "10:00 AM", patient: "David Kim", age: 29, type: "Asthma Consultation", duration: "30 min", status: "in-progress", mode: "in-person" },
  { id: "s4", time: "11:00 AM", patient: "Jennifer Lee", age: 52, type: "Cholesterol Results", duration: "20 min", status: "scheduled", mode: "telehealth" },
  { id: "s5", time: "11:30 AM", patient: "Thomas Brown", age: 63, type: "Heart Failure Follow-up", duration: "30 min", status: "scheduled", mode: "in-person" },
  { id: "s6", time: "1:00 PM", patient: "Amanda White", age: 38, type: "New Patient - Hypertension", duration: "60 min", status: "scheduled", mode: "in-person" },
  { id: "s7", time: "2:00 PM", patient: "George Harris", age: 72, type: "Medication Review", duration: "30 min", status: "scheduled", mode: "telehealth" },
  { id: "s8", time: "3:00 PM", patient: "Nancy Park", age: 41, type: "Pre-op Assessment", duration: "45 min", status: "scheduled", mode: "in-person" },
  { id: "s9", time: "4:00 PM", patient: "Steven Kim", age: 55, type: "Stress Test Results", duration: "30 min", status: "scheduled", mode: "in-person" },
];

const statusConfig = {
  completed: { label: "Done", class: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  "in-progress": { label: "Now", class: "bg-blue-100 text-blue-700 border-blue-200 animate-pulse", icon: AlertCircle },
  scheduled: { label: "Upcoming", class: "bg-gray-100 text-gray-500 border-gray-200", icon: Clock },
  cancelled: { label: "Cancelled", class: "bg-red-50 text-red-500 border-red-100", icon: XCircle },
};

const weekDays = ["Mon 17", "Tue 18", "Wed 19", "Thu 20", "Fri 21", "Sat 22", "Sun 23"];

export default function DoctorSchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Wed 19");
  const [selectedAppt, setSelectedAppt] = useState<string | null>(null);

  const active = todayAppts.find((a) => a.id === selectedAppt);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-teal-600" /><h1 className="text-2xl font-bold text-gray-900">Schedule</h1></div>
          <p className="text-gray-500 mt-1">{todayAppts.length} appointments today · {todayAppts.filter(a => a.status === "completed").length} completed</p>
        </div>
        <Button size="sm" className="bg-gradient-to-r from-teal-600 to-teal-500 text-white"><Plus className="w-3.5 h-3.5 mr-1" /> New Appointment</Button>
      </div>

      {/* Week Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {weekDays.map((day) => (
          <button key={day} onClick={() => setSelectedDay(day)}
            className={cn("px-4 py-2.5 rounded-xl text-sm font-medium border transition-all min-w-[80px] text-center",
              selectedDay === day ? "bg-teal-500 text-white border-teal-500 shadow-md" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            )}>{day}</button>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-3 space-y-1">
          {todayAppts.map((appt) => {
            const config = statusConfig[appt.status];
            const isSelected = selectedAppt === appt.id;
            return (
              <button key={appt.id} onClick={() => setSelectedAppt(isSelected ? null : appt.id)}
                className={cn("w-full text-left p-4 rounded-xl border transition-all",
                  isSelected ? "border-teal-200 bg-teal-50/50 shadow-sm ring-1 ring-teal-100" : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm",
                  appt.status === "in-progress" && "border-blue-200 bg-blue-50/30"
                )}>
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[60px]">
                    <p className={cn("text-sm font-bold", appt.status === "in-progress" ? "text-blue-600" : "text-gray-900")}>{appt.time.replace(":00", "")}</p>
                    <p className="text-[10px] text-gray-400">{appt.duration}</p>
                  </div>
                  <div className="w-px h-10 bg-gray-100" />
                  <Avatar fallback={appt.patient.split(" ").map(n => n[0]).join("")} size="md" className="shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={cn("text-sm font-semibold", appt.status === "completed" ? "text-gray-400 line-through" : "text-gray-900")}>{appt.patient}</span>
                      <span className="text-xs text-gray-400">{appt.age}y</span>
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full border font-medium flex items-center gap-1", config.class)}>
                        <config.icon className="w-3 h-3" />{config.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                      <span>{appt.type}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">{appt.mode === "telehealth" ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}{appt.mode === "telehealth" ? "Telehealth" : "In-person"}</span>
                    </div>
                  </div>
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
                  <div className="flex items-center gap-3">
                    <Avatar fallback={active.patient.split(" ").map(n => n[0]).join("")} size="lg" />
                    <div><CardTitle className="text-base">{active.patient}</CardTitle><CardDescription>{active.age} years</CardDescription></div>
                  </div>
                  <span className={cn("text-[10px] px-2 py-0.5 rounded-full border font-medium flex items-center gap-1", statusConfig[active.status].class)}>
                    {(() => { const Icon = statusConfig[active.status].icon; return <Icon className="w-3 h-3" />; })()}{statusConfig[active.status].label}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-xs text-gray-400">Time</p><p className="font-medium text-gray-700 flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gray-300" />{active.time}</p></div>
                  <div><p className="text-xs text-gray-400">Duration</p><p className="font-medium text-gray-700">{active.duration}</p></div>
                  <div><p className="text-xs text-gray-400">Type</p><p className="font-medium text-gray-700">{active.type}</p></div>
                  <div><p className="text-xs text-gray-400">Mode</p><p className="font-medium text-gray-700 flex items-center gap-1">{active.mode === "telehealth" ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}{active.mode === "telehealth" ? "Telehealth" : "In-person"}</p></div>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-teal-600 to-teal-500 text-white"><User className="w-3.5 h-3.5 mr-1" /> Open Chart</Button>
                  <Button size="sm" variant="outline" className="flex-1"><Video className="w-3.5 h-3.5 mr-1" /> Start Visit</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-24">
              <CardContent className="flex flex-col items-center py-12"><Calendar className="w-10 h-10 text-gray-300 mb-3" /><p className="text-sm font-semibold text-gray-600">Select an appointment</p><p className="text-xs text-gray-400">Click on an appointment to view details</p></CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
