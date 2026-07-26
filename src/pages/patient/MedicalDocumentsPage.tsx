import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  FileText,
  Plus,
  Download,
  Search,
  Calendar,
  User,
  Heart,
  X,
  Eye,
  File,
  Image as ImageIcon,
  Microscope,
  Syringe,
  FileBarChart,
  ChevronRight,
  Upload,
  Filter,
  Printer,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────

type DocCategory = "all" | "lab" | "prescription" | "imaging" | "report" | "other";
type DocStatus = "final" | "preliminary" | "amended";

interface MedicalDocument {
  id: string;
  name: string;
  type: string;
  category: DocCategory;
  date: string;
  doctor: string;
  doctorTitle: string;
  department: string;
  description: string;
  status: DocStatus;
  fileSize: string;
  pages: number;
}

// ── Mock Data ──────────────────────────────────────────────

const documents: MedicalDocument[] = [
  {
    id: "doc-1",
    name: "Complete Blood Count (CBC)",
    type: "Lab Result",
    category: "lab",
    date: "Mar 15, 2026",
    doctor: "Dr. Sarah Chen",
    doctorTitle: "Cardiologist",
    department: "Cardiology",
    description: "Comprehensive blood panel showing normal RBC, WBC, and platelet counts. All markers within reference range.",
    status: "final",
    fileSize: "245 KB",
    pages: 2,
  },
  {
    id: "doc-2",
    name: "Metformin Prescription",
    type: "Prescription",
    category: "prescription",
    date: "Mar 10, 2026",
    doctor: "Dr. James Lee",
    doctorTitle: "Endocrinologist",
    department: "Endocrinology",
    description: "Metformin 500mg — 2x daily with meals. 90-day supply with 3 refills remaining.",
    status: "final",
    fileSize: "120 KB",
    pages: 1,
  },
  {
    id: "doc-3",
    name: "Cardiac MRI Report",
    type: "Imaging Report",
    category: "imaging",
    date: "Mar 5, 2026",
    doctor: "Dr. Michael Park",
    doctorTitle: "Radiologist",
    department: "Radiology",
    description: "Cardiac MRI with contrast. Normal left ventricular function, EF 60%. No significant abnormalities detected.",
    status: "final",
    fileSize: "2.1 MB",
    pages: 5,
  },
  {
    id: "doc-4",
    name: "Lipid Panel",
    type: "Lab Result",
    category: "lab",
    date: "Mar 1, 2026",
    doctor: "Dr. Sarah Chen",
    doctorTitle: "Cardiologist",
    department: "Cardiology",
    description: "Total Cholesterol: 180 mg/dL (desirable). LDL: 98 mg/dL (near optimal). HDL: 52 mg/dL (good). Triglycerides: 130 mg/dL.",
    status: "final",
    fileSize: "190 KB",
    pages: 1,
  },
  {
    id: "doc-5",
    name: "Lisinopril Prescription",
    type: "Prescription",
    category: "prescription",
    date: "Feb 20, 2026",
    doctor: "Dr. Sarah Chen",
    doctorTitle: "Cardiologist",
    department: "Cardiology",
    description: "Lisinopril 10mg — 1x daily. 90-day supply with 5 refills. Take with food, avoid grapefruit.",
    status: "final",
    fileSize: "115 KB",
    pages: 1,
  },
  {
    id: "doc-6",
    name: "Chest X-Ray Report",
    type: "Imaging Report",
    category: "imaging",
    date: "Feb 15, 2026",
    doctor: "Dr. Emily Wong",
    doctorTitle: "Radiologist",
    department: "Radiology",
    description: "PA and lateral chest views. Lungs are clear without infiltrates or effusions. Heart size normal. No acute findings.",
    status: "final",
    fileSize: "1.8 MB",
    pages: 3,
  },
  {
    id: "doc-7",
    name: "Annual Physical Summary",
    type: "Medical Report",
    category: "report",
    date: "Feb 1, 2026",
    doctor: "Dr. Sarah Chen",
    doctorTitle: "Cardiologist",
    department: "Cardiology",
    description: "Annual comprehensive physical examination. All systems reviewed. Patient in good overall health. Continue current medications and monitoring.",
    status: "final",
    fileSize: "340 KB",
    pages: 4,
  },
  {
    id: "doc-8",
    name: "HbA1c Test",
    type: "Lab Result",
    category: "lab",
    date: "Jan 28, 2026",
    doctor: "Dr. James Lee",
    doctorTitle: "Endocrinologist",
    department: "Endocrinology",
    description: "HbA1c: 5.7% (normal range: <5.7%). Indicates normal blood sugar control over the past 3 months.",
    status: "final",
    fileSize: "160 KB",
    pages: 1,
  },
  {
    id: "doc-9",
    name: "Echocardiogram Report",
    type: "Imaging Report",
    category: "imaging",
    date: "Jan 15, 2026",
    doctor: "Dr. Michael Park",
    doctorTitle: "Radiologist",
    department: "Radiology",
    description: "Transthoracic echocardiogram. Normal chamber sizes, wall motion, and valve function. LVEF 60-65%. No pericardial effusion.",
    status: "final",
    fileSize: "1.5 MB",
    pages: 4,
  },
  {
    id: "doc-10",
    name: "Vitamin D Level",
    type: "Lab Result",
    category: "lab",
    date: "Jan 10, 2026",
    doctor: "Dr. Sarah Chen",
    doctorTitle: "Cardiologist",
    department: "Cardiology",
    description: "25-Hydroxy Vitamin D: 28 ng/mL (sufficient: 30-100 ng/mL). Borderline low — supplement recommended.",
    status: "final",
    fileSize: "145 KB",
    pages: 1,
  },
  {
    id: "doc-11",
    name: "ECG Report",
    type: "Test Result",
    category: "report",
    date: "Dec 20, 2025",
    doctor: "Dr. Sarah Chen",
    doctorTitle: "Cardiologist",
    department: "Cardiology",
    description: "12-lead electrocardiogram. Normal sinus rhythm, rate 72 bpm. No ST-segment abnormalities. Normal axis and intervals.",
    status: "final",
    fileSize: "280 KB",
    pages: 2,
  },
  {
    id: "doc-12",
    name: "Atorvastatin Prescription",
    type: "Prescription",
    category: "prescription",
    date: "Dec 15, 2025",
    doctor: "Dr. Sarah Chen",
    doctorTitle: "Cardiologist",
    department: "Cardiology",
    description: "Atorvastatin 20mg — 1x daily at bedtime. 90-day supply with 5 refills.",
    status: "final",
    fileSize: "110 KB",
    pages: 1,
  },
];

// ── Category Config ────────────────────────────────────────

const categories: { id: DocCategory; label: string; icon: React.ComponentType<{ className?: string }>; color: string; bg: string }[] = [
  { id: "all", label: "All Documents", icon: FileText, color: "text-gray-600", bg: "bg-gray-100" },
  { id: "lab", label: "Lab Results", icon: Microscope, color: "text-blue-600", bg: "bg-blue-50" },
  { id: "prescription", label: "Prescriptions", icon: Syringe, color: "text-purple-600", bg: "bg-purple-50" },
  { id: "imaging", label: "Imaging", icon: ImageIcon, color: "text-teal-600", bg: "bg-teal-50" },
  { id: "report", label: "Reports", icon: FileBarChart, color: "text-amber-600", bg: "bg-amber-50" },
  { id: "other", label: "Other", icon: File, color: "text-gray-600", bg: "bg-gray-50" },
];

const statusConfig: Record<DocStatus, { variant: "success" | "warning" | "outline"; label: string }> = {
  final: { variant: "success", label: "Final" },
  preliminary: { variant: "warning", label: "Preliminary" },
  amended: { variant: "outline", label: "Amended" },
};

const categoryIcons: Record<DocCategory, React.ComponentType<{ className?: string }>> = {
  lab: Microscope,
  prescription: Syringe,
  imaging: Heart,
  report: FileBarChart,
  other: File,
  all: FileText,
};

// ── Document Card Component ────────────────────────────────

function DocumentCard({
  doc,
  isSelected,
  onSelect,
}: {
  doc: MedicalDocument;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const Icon = categoryIcons[doc.category];
  const catConfig = categories.find((c) => c.id === doc.category);

  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full text-left p-4 rounded-xl border transition-all duration-200",
        isSelected
          ? "border-teal-200 bg-teal-50/50 shadow-sm ring-1 ring-teal-100"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", catConfig?.bg)}>
          <Icon className={cn("w-5 h-5", catConfig?.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-gray-900 truncate">{doc.name}</h3>
            <Badge variant={statusConfig[doc.status].variant} size="sm">
              {statusConfig[doc.status].label}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {doc.date}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {doc.doctor}
            </span>
          </div>
          <p className="text-xs text-gray-400 line-clamp-2">{doc.description}</p>
          <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-50 text-[10px] text-gray-400">
            <span>{doc.type}</span>
            <span>·</span>
            <span>{doc.fileSize}</span>
            <span>·</span>
            <span>{doc.pages} page{doc.pages > 1 ? "s" : ""}</span>
          </div>
        </div>
        <ChevronRight className={cn(
          "w-4 h-4 text-gray-300 shrink-0 mt-1 transition-all",
          isSelected && "text-teal-500 translate-x-0.5"
        )} />
      </div>
    </button>
  );
}

// ── Upload Form Component ──────────────────────────────────

function UploadDocumentForm({ onClose }: { onClose: () => void }) {
  return (
    <Card className="border-teal-100 bg-gradient-to-br from-teal-50/50 to-white">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-lg">Upload Document</CardTitle>
          <CardDescription>Add a medical document to your records</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400">
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-teal-300 hover:bg-teal-50/30 transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-teal-100 flex items-center justify-center mx-auto mb-3 transition-colors">
              <Upload className="w-6 h-6 text-gray-400 group-hover:text-teal-600 transition-colors" />
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">Drop files here or click to browse</p>
            <p className="text-xs text-gray-400">PDF, JPG, PNG — Max 10MB</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-gray-600">Document Type</Label>
              <select className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option>Lab Result</option>
                <option>Prescription</option>
                <option>Imaging Report</option>
                <option>Medical Report</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-gray-600">Doctor (optional)</Label>
              <Input placeholder="Dr. Name" className="h-9" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-gray-600">Notes (optional)</Label>
            <Input placeholder="Any additional information..." className="h-9" />
          </div>

          <div className="flex items-center justify-end gap-3 pt-1">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
            <Button size="sm" className="bg-gradient-to-r from-teal-600 to-teal-500 text-white">
              <Upload className="w-3.5 h-3.5 mr-1" />
              Upload Document
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Main Page Component ────────────────────────────────────

export default function MedicalDocumentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<DocCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const filtered = documents.filter((doc) => {
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeDoc = documents.find((d) => d.id === selectedDoc);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ═══ Header ═══ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center shadow-sm">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Medical Documents</h1>
          </div>
          <p className="text-gray-500 mt-1">{documents.length} documents in your health records</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 border-gray-200"
          >
            <Printer className="w-3.5 h-3.5 mr-1" />
            Print
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-sm"
            onClick={() => setShowUpload(!showUpload)}
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Upload
          </Button>
        </div>
      </div>

      {/* ═══ Upload Form ═══ */}
      {showUpload && <UploadDocumentForm onClose={() => setShowUpload(false)} />}

      {/* ═══ Search + Category Filters ═══ */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search documents by name, doctor, or description..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedDoc(null);
            }}
            className="pl-10 h-10 text-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedDoc(null);
              }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                selectedCategory === cat.id
                  ? "bg-teal-50 text-teal-700 border-teal-200 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-800"
              )}
            >
              <cat.icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          ))}
          {searchQuery && (
            <span className="text-xs text-gray-400 ml-1">
              ({filtered.length} result{filtered.length !== 1 ? "s" : ""})
            </span>
          )}
        </div>
      </div>

      {/* ═══ Empty State ═══ */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">No documents found</h3>
          <p className="text-sm text-gray-500">
            {searchQuery ? "Try adjusting your search terms." : "No documents in this category yet."}
          </p>
          {!searchQuery && (
            <Button
              size="sm"
              className="mt-4"
              onClick={() => setShowUpload(true)}
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Upload your first document
            </Button>
          )}
        </div>
      )}

      {/* ═══ Document List + Detail ═══ */}
      {filtered.length > 0 && (
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Document List (3/5) */}
          <div className="lg:col-span-3 space-y-2">
            {/* Summary bar */}
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1 px-1">
              <span>Showing {filtered.length} of {documents.length} documents</span>
              <span className="flex items-center gap-1">
                <Filter className="w-3 h-3" />
                {selectedCategory === "all" ? "All categories" : categories.find(c => c.id === selectedCategory)?.label}
              </span>
            </div>
            <div className="space-y-2">
              {filtered.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  doc={doc}
                  isSelected={selectedDoc === doc.id}
                  onSelect={() => setSelectedDoc(selectedDoc === doc.id ? null : doc.id)}
                />
              ))}
            </div>
          </div>

          {/* Document Detail (2/5) */}
          <div className="lg:col-span-2">
            {activeDoc ? (
              <Card className="sticky top-24">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        categories.find((c) => c.id === activeDoc.category)?.bg
                      )}>
                        {(() => {
                          const Icon = categoryIcons[activeDoc.category];
                          return <Icon className={cn("w-5 h-5", categories.find((c) => c.id === activeDoc.category)?.color)} />;
                        })()}
                      </div>
                      <div>
                        <CardTitle className="text-base">{activeDoc.name}</CardTitle>
                        <CardDescription>{activeDoc.type}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={statusConfig[activeDoc.status].variant} size="sm">
                      {statusConfig[activeDoc.status].label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                    <div>
                      <p className="text-xs text-gray-400">Date</p>
                      <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-300" />
                        {activeDoc.date}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Department</p>
                      <p className="text-sm font-medium text-gray-700">{activeDoc.department}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-400">Doctor</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white text-[10px] font-bold">
                          {activeDoc.doctor.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">{activeDoc.doctor}</p>
                          <p className="text-xs text-gray-400">{activeDoc.doctorTitle}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Description */}
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Summary</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{activeDoc.description}</p>
                  </div>

                  {/* File Info */}
                  <div className="flex items-center gap-4 text-xs text-gray-400 bg-gray-50 rounded-lg p-3">
                    <span className="flex items-center gap-1">
                      <File className="w-3.5 h-3.5" />
                      {activeDoc.fileSize}
                    </span>
                    <span>{activeDoc.pages} page{activeDoc.pages > 1 ? "s" : ""}</span>
                    <span>{activeDoc.type}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-teal-600 to-teal-500 text-white"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1.5" />
                      View Document
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="sticky top-24">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                    <FileText className="w-7 h-7 text-gray-300" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Select a document</h3>
                  <p className="text-xs text-gray-400 max-w-[200px]">
                    Click on a document from the list to view its details
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
