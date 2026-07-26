import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  FileText,
  Search,
  Download,
  Eye,
  Plus,
  Calendar,
  User,
  FileBarChart,
  Microscope,
  Heart,
  Syringe,
  ChevronRight,
  Printer,
} from "lucide-react";

interface Report {
  id: string; name: string; patient: string; type: string; date: string; status: "final" | "preliminary"; pages: number; doctor: string;
}

const reports: Report[] = [
  { id: "r1", name: "Cardiac MRI - Sarah Johnson", patient: "Sarah Johnson", type: "Imaging", date: "Mar 15, 2026", status: "final", pages: 5, doctor: "Dr. Park" },
  { id: "r2", name: "Complete Blood Count - R. Chen", patient: "Robert Chen", type: "Lab", date: "Mar 14, 2026", status: "final", pages: 2, doctor: "Dr. Chen" },
  { id: "r3", name: "Chest X-Ray - M. Park", patient: "Michael Park", type: "Imaging", date: "Mar 12, 2026", status: "final", pages: 3, doctor: "Dr. Wong" },
  { id: "r4", name: "Lipid Panel - E. Davis", patient: "Emily Davis", type: "Lab", date: "Mar 10, 2026", status: "final", pages: 1, doctor: "Dr. Chen" },
  { id: "r5", name: "Echocardiogram - L. Thompson", patient: "Lisa Thompson", type: "Imaging", date: "Mar 8, 2026", status: "final", pages: 4, doctor: "Dr. Park" },
  { id: "r6", name: "HbA1c - J. Wilson", patient: "James Wilson", type: "Lab", date: "Mar 5, 2026", status: "final", pages: 1, doctor: "Dr. Chen" },
  { id: "r7", name: "Annual Physical - M. Garcia", patient: "Maria Garcia", type: "Report", date: "Mar 3, 2026", status: "final", pages: 4, doctor: "Dr. Chen" },
  { id: "r8", name: "ECG Report - T. Brown", patient: "Thomas Brown", type: "Test", date: "Feb 28, 2026", status: "preliminary", pages: 2, doctor: "Dr. Chen" },
  { id: "r9", name: "Vitamin D Level - D. Kim", patient: "David Kim", type: "Lab", date: "Feb 25, 2026", status: "final", pages: 1, doctor: "Dr. Chen" },
  { id: "r10", name: "Pulmonary Function - M. Park", patient: "Michael Park", type: "Test", date: "Feb 22, 2026", status: "final", pages: 3, doctor: "Dr. Wong" },
];

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = { Lab: Microscope, Imaging: Heart, Report: FileBarChart, Test: Syringe };

const typeColors: Record<string, string> = { Lab: "text-blue-600 bg-blue-50", Imaging: "text-teal-600 bg-teal-50", Report: "text-amber-600 bg-amber-50", Test: "text-purple-600 bg-purple-50" };

export default function DoctorReportsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = reports.filter((r) => {
    if (typeFilter !== "all" && r.type.toLowerCase() !== typeFilter) return false;
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.patient.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const active = reports.find((r) => r.id === selected);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2"><FileText className="w-5 h-5 text-teal-600" /><h1 className="text-2xl font-bold text-gray-900">Medical Reports</h1></div>
          <p className="text-gray-500 mt-1">{reports.length} patient reports available</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-gray-600"><Printer className="w-3.5 h-3.5 mr-1" />Print</Button>
          <Button size="sm" className="bg-gradient-to-r from-teal-600 to-teal-500 text-white"><Plus className="w-3.5 h-3.5 mr-1" />New Report</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search reports..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-10" />
        </div>
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          {["all", "lab", "imaging", "report", "test"].map((t) => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={cn("px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all",
                typeFilter === t ? "bg-white text-teal-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}>{t}</button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-2">
          {filtered.map((r) => {
            const Icon = typeIcons[r.type] ?? FileText;
            const colors = typeColors[r.type] ?? "text-gray-600 bg-gray-50";
            return (
              <button key={r.id} onClick={() => setSelected(selected === r.id ? null : r.id)}
                className={cn("w-full text-left p-4 rounded-xl border transition-all",
                  selected === r.id ? "border-teal-200 bg-teal-50/50 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                )}>
                <div className="flex items-start gap-3">
                  <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", colors.split(" ")[1])}>
                    <Icon className={cn("w-4 h-4", colors.split(" ")[0])} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900">{r.name}</span>
                      <Badge variant={r.status === "final" ? "success" : "warning"} size="sm">{r.status}</Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{r.patient}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{r.date}</span>
                      <span>·</span>
                      <span>{r.pages}p</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-2">
          {active ? (
            <Card className="sticky top-24">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{active.name}</CardTitle>
                <CardDescription>{active.type} · {active.pages} pages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-xs text-gray-400">Patient</p><p className="font-medium text-gray-700">{active.patient}</p></div>
                  <div><p className="text-xs text-gray-400">Doctor</p><p className="font-medium text-gray-700">{active.doctor}</p></div>
                  <div><p className="text-xs text-gray-400">Date</p><p className="font-medium text-gray-700">{active.date}</p></div>
                  <div><p className="text-xs text-gray-400">Status</p><Badge variant={active.status === "final" ? "success" : "warning"}>{active.status}</Badge></div>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-teal-600 to-teal-500 text-white"><Eye className="w-3.5 h-3.5 mr-1" /> View</Button>
                  <Button size="sm" variant="outline" className="flex-1"><Download className="w-3.5 h-3.5 mr-1" /> Download</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-24">
              <CardContent className="flex flex-col items-center py-12"><FileText className="w-10 h-10 text-gray-300 mb-3" /><p className="text-sm font-semibold text-gray-600">Select a report</p><p className="text-xs text-gray-400">Click on a report to view details</p></CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
