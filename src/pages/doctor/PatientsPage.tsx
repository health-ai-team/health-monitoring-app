import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Search,
  Users,
  Filter,
  ChevronRight,
  Phone,
  Mail,
  MessageSquare,
  FileText,
} from "lucide-react";

interface PatientRecord {
  id: string; name: string; age: number; gender: "M" | "F";
  bloodType: string; condition: string; doctor: string;
  lastVisit: string; nextAppt: string; phone: string; email: string;
  status: "stable" | "warning" | "critical" | "improving";
}

const allPatients: PatientRecord[] = [
  { id: "p1", name: "Sarah Johnson", age: 54, gender: "F", bloodType: "A+", condition: "Post-MI Recovery", doctor: "Dr. Chen", lastVisit: "Mar 15", nextAppt: "Mar 22", phone: "+1 (555) 111-1111", email: "sarah.j@email.com", status: "critical" },
  { id: "p2", name: "Robert Chen", age: 67, gender: "M", bloodType: "O-", condition: "Hypertension", doctor: "Dr. Chen", lastVisit: "Mar 14", nextAppt: "Mar 28", phone: "+1 (555) 222-2222", email: "robert.c@email.com", status: "warning" },
  { id: "p3", name: "Emily Davis", age: 42, gender: "F", bloodType: "B+", condition: "Post-Surgery", doctor: "Dr. Chen", lastVisit: "Mar 12", nextAppt: "Mar 19", phone: "+1 (555) 333-3333", email: "emily.d@email.com", status: "improving" },
  { id: "p4", name: "Michael Park", age: 71, gender: "M", bloodType: "AB+", condition: "COPD", doctor: "Dr. Chen", lastVisit: "Mar 10", nextAppt: "Mar 24", phone: "+1 (555) 444-4444", email: "michael.p@email.com", status: "warning" },
  { id: "p5", name: "Lisa Thompson", age: 35, gender: "F", bloodType: "A-", condition: "Diabetes Type 2", doctor: "Dr. Chen", lastVisit: "Mar 8", nextAppt: "Apr 5", phone: "+1 (555) 555-5555", email: "lisa.t@email.com", status: "stable" },
  { id: "p6", name: "James Wilson", age: 58, gender: "M", bloodType: "O+", condition: "Atrial Fibrillation", doctor: "Dr. Chen", lastVisit: "Mar 5", nextAppt: "Mar 26", phone: "+1 (555) 666-6666", email: "james.w@email.com", status: "stable" },
  { id: "p7", name: "Maria Garcia", age: 45, gender: "F", bloodType: "B-", condition: "Thyroid Disorder", doctor: "Dr. Chen", lastVisit: "Mar 3", nextAppt: "Apr 2", phone: "+1 (555) 777-7777", email: "maria.g@email.com", status: "stable" },
  { id: "p8", name: "David Kim", age: 29, gender: "M", bloodType: "A+", condition: "Asthma", doctor: "Dr. Chen", lastVisit: "Feb 28", nextAppt: "Jun 15", phone: "+1 (555) 888-8888", email: "david.k@email.com", status: "stable" },
  { id: "p9", name: "Jennifer Lee", age: 52, gender: "F", bloodType: "AB-", condition: "High Cholesterol", doctor: "Dr. Chen", lastVisit: "Feb 25", nextAppt: "Mar 30", phone: "+1 (555) 999-9999", email: "jennifer.l@email.com", status: "improving" },
  { id: "p10", name: "Thomas Brown", age: 63, gender: "M", bloodType: "O-", condition: "Heart Failure", doctor: "Dr. Chen", lastVisit: "Feb 22", nextAppt: "Mar 20", phone: "+1 (555) 000-0000", email: "thomas.b@email.com", status: "warning" },
];

const statusStyles: Record<string, string> = {
  critical: "bg-red-100 text-red-700 border-red-200",
  warning: "bg-amber-100 text-amber-700 border-amber-200",
  improving: "bg-teal-100 text-teal-700 border-teal-200",
  stable: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const statusDots: Record<string, string> = {
  critical: "bg-red-500 animate-pulse",
  warning: "bg-amber-500",
  improving: "bg-teal-500",
  stable: "bg-emerald-500",
};

export default function DoctorPatientsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const filtered = allPatients.filter((p) => {
    const matchesSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.condition.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const active = allPatients.find((p) => p.id === selectedPatient);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2"><Users className="w-5 h-5 text-teal-600" /><h1 className="text-2xl font-bold text-gray-900">Patients</h1></div>
          <p className="text-gray-500 mt-1">{allPatients.length} active patients under your care</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search by name or condition..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-10 text-sm" />
        </div>
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-gray-400 mr-1"><Filter className="w-3 h-3 inline mr-1" />Status:</span>
        {["all", "critical", "warning", "improving", "stable"].map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={cn("px-3 py-1.5 rounded-full text-xs font-medium border transition-all capitalize",
              statusFilter === s ? "bg-teal-50 text-teal-700 border-teal-200 shadow-sm" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            )}>
            {s === "all" ? "All" : s}
          </button>
        ))}
        <span className="text-xs text-gray-400 ml-auto">{filtered.length} of {allPatients.length}</span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16"><Search className="w-10 h-10 text-gray-300 mx-auto mb-3" /><h3 className="text-lg font-semibold text-gray-700">No patients found</h3><p className="text-sm text-gray-500">Try adjusting your search or filters.</p></div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Patient list */}
          <div className="lg:col-span-3 space-y-2">
            {filtered.map((p) => (
              <button key={p.id} onClick={() => setSelectedPatient(selectedPatient === p.id ? null : p.id)}
                className={cn("w-full text-left p-4 rounded-xl border transition-all",
                  selectedPatient === p.id ? "border-teal-200 bg-teal-50/50 shadow-sm ring-1 ring-teal-100" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                )}>
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <Avatar fallback={p.name.split(" ").map(n => n[0]).join("")} size="md" />
                    <span className={cn("absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white", statusDots[p.status])} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900">{p.name}</span>
                      <span className="text-xs text-gray-400">{p.age}y · {p.gender}</span>
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium border", statusStyles[p.status])}>{p.status}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                      <span>{p.condition}</span><span>·</span><span>Blood: {p.bloodType}</span>
                    </div>
                  </div>
                  <ChevronRight className={cn("w-4 h-4 text-gray-300 shrink-0", selectedPatient === p.id && "text-teal-500")} />
                </div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-2">
            {active ? (
              <Card className="sticky top-24">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar fallback={active.name.split(" ").map(n => n[0]).join("")} size="lg" />
                    <div>
                      <CardTitle className="text-base">{active.name}</CardTitle>
                      <CardDescription>{active.condition}</CardDescription>
                    </div>
                    <span className={cn("ml-auto text-[10px] px-2 py-0.5 rounded-full font-medium border", statusStyles[active.status])}>{active.status}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <div><p className="text-xs text-gray-400">Age / Gender</p><p className="font-medium text-gray-700">{active.age} · {active.gender === "M" ? "Male" : "Female"}</p></div>
                    <div><p className="text-xs text-gray-400">Blood Type</p><p className="font-medium text-gray-700">{active.bloodType}</p></div>
                    <div><p className="text-xs text-gray-400">Primary Doctor</p><p className="font-medium text-gray-700">{active.doctor}</p></div>
                    <div><p className="text-xs text-gray-400">Last Visit</p><p className="font-medium text-gray-700">{active.lastVisit}</p></div>
                    <div className="col-span-2"><p className="text-xs text-gray-400">Next Appointment</p><p className="font-medium text-teal-600">{active.nextAppt}</p></div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50"><Phone className="w-4 h-4 text-gray-400" /><span className="text-xs text-gray-600">{active.phone}</span></div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50"><Mail className="w-4 h-4 text-gray-400" /><span className="text-xs text-gray-600 truncate">{active.email}</span></div>
                  </div>
                  <Separator />
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-teal-600 to-teal-500 text-white"><MessageSquare className="w-3.5 h-3.5 mr-1" /> Message</Button>
                    <Button size="sm" variant="outline" className="flex-1"><FileText className="w-3.5 h-3.5 mr-1" /> Records</Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="sticky top-24">
                <CardContent className="flex flex-col items-center py-12">
                  <Users className="w-10 h-10 text-gray-300 mb-3" />
                  <p className="text-sm font-semibold text-gray-600">Select a patient</p>
                  <p className="text-xs text-gray-400">Click on a patient to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
