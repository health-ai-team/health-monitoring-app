import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  Eye,
  Globe,
  Shield,
  Trash2,
  Download,
  Camera,
  ChevronRight,
  Moon,
  Sun,
  Smartphone,
  Laptop,
  Settings,
  Fingerprint,
  Key,
  AlertTriangle,
  Save,
  Pencil,
  X,
  LogOut,
} from "lucide-react";

// ── Toggle Switch Component ────────────────────────────────

function Toggle({ enabled, onChange, label, description }: {
  enabled: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="pr-4">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0",
          enabled ? "bg-teal-500" : "bg-gray-200"
        )}
      >
        <span
          className={cn(
            "inline-block h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform",
            enabled ? "translate-x-[22px]" : "translate-x-[2px]"
          )}
        />
      </button>
    </div>
  );
}

// ── Section Component ──────────────────────────────────────

function SettingsSection({ title, description, children, className }: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-4 border-b border-gray-50">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-4">
        {children}
      </CardContent>
    </Card>
  );
}

// ── Sidebar Settings Link ──────────────────────────────────

const settingsTabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "preferences", label: "Preferences", icon: Eye },
  { id: "account", label: "Account", icon: Lock },
];

// ── Main Component ─────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: "", new: "", confirm: "" });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Notification toggles
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    weeklyReport: true,
    medicationReminders: true,
    appointmentReminders: true,
    marketingEmails: false,
  });

  // Preferences
  const [preferences, setPreferences] = useState({
    unitSystem: "metric" as "metric" | "imperial",
    theme: "light" as "light" | "dark" | "system",
    language: "en",
  });

  // Profile form
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1988-06-15",
    bloodType: "A+",
    gender: "male",
    address: "123 Health Street, Medical District, NY 10001",
    emergencyContact: "Jane Doe - +1 (555) 987-6543",
  });

  const handleProfileChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const tabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-4">
              <div className="relative group">
                <Avatar fallback="JD" size="xl" className="ring-4 ring-teal-50 shadow-lg" />
                <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-sm text-gray-500">{profile.email}</p>
                <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                  <Badge variant="success" size="sm">Active</Badge>
                  <Badge variant="secondary" size="sm">Patient</Badge>
                  <span className="text-xs text-gray-400">Member since Jan 2026</span>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="sm:ml-auto"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <><X className="w-3.5 h-3.5 mr-1" /> Cancel</>
                ) : (
                  <><Pencil className="w-3.5 h-3.5 mr-1" /> Edit Profile</>
                )}
              </Button>
            </div>

            <Separator />

            {/* Personal Information */}
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-gray-500">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    value={profile.name}
                    onChange={handleProfileChange("name")}
                    disabled={!isEditing}
                    className="pl-10 h-10"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-gray-500">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    value={profile.email}
                    onChange={handleProfileChange("email")}
                    disabled={!isEditing}
                    className="pl-10 h-10"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-gray-500">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    value={profile.phone}
                    onChange={handleProfileChange("phone")}
                    disabled={!isEditing}
                    className="pl-10 h-10"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-gray-500">Date of Birth</Label>
                <Input
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={handleProfileChange("dateOfBirth")}
                  disabled={!isEditing}
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-gray-500">Blood Type</Label>
                <select
                  value={profile.bloodType}
                  onChange={handleProfileChange("bloodType")}
                  disabled={!isEditing}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"].map((bt) => (
                    <option key={bt} value={bt}>{bt}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-gray-500">Gender</Label>
                <select
                  value={profile.gender}
                  onChange={handleProfileChange("gender")}
                  disabled={!isEditing}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not">Prefer not to say</option>
                </select>
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label className="text-xs text-gray-500">Address</Label>
                <Input
                  value={profile.address}
                  onChange={handleProfileChange("address")}
                  disabled={!isEditing}
                  className="h-10"
                />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label className="text-xs text-gray-500">Emergency Contact</Label>
                <Input
                  value={profile.emergencyContact}
                  onChange={handleProfileChange("emergencyContact")}
                  disabled={!isEditing}
                  className="h-10"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button size="sm" className="bg-gradient-to-r from-teal-600 to-teal-500 text-white" onClick={() => setIsEditing(false)}>
                  <Save className="w-3.5 h-3.5 mr-1" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Health Alerts</h3>
              <p className="text-xs text-gray-400 mb-3">Manage how you receive health alerts and notifications</p>
              <div className="space-y-1">
                <Toggle enabled={notifications.emailAlerts} onChange={() => toggleNotification("emailAlerts")}
                  label="Email Alerts" description="Receive critical health alerts via email" />
                <Separator className="my-1" />
                <Toggle enabled={notifications.smsAlerts} onChange={() => toggleNotification("smsAlerts")}
                  label="SMS Alerts" description="Get text messages for urgent notifications" />
                <Separator className="my-1" />
                <Toggle enabled={notifications.pushNotifications} onChange={() => toggleNotification("pushNotifications")}
                  label="Push Notifications" description="Receive notifications in your browser" />
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Reminders</h3>
              <p className="text-xs text-gray-400 mb-3">Stay on track with your health goals</p>
              <div className="space-y-1">
                <Toggle enabled={notifications.medicationReminders} onChange={() => toggleNotification("medicationReminders")}
                  label="Medication Reminders" description="Get reminded when it's time for your medication" />
                <Separator className="my-1" />
                <Toggle enabled={notifications.appointmentReminders} onChange={() => toggleNotification("appointmentReminders")}
                  label="Appointment Reminders" description="Receive reminders before upcoming appointments" />
                <Separator className="my-1" />
                <Toggle enabled={notifications.weeklyReport} onChange={() => toggleNotification("weeklyReport")}
                  label="Weekly Health Report" description="Get a weekly summary of your health metrics" />
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Other</h3>
              <Toggle enabled={notifications.marketingEmails} onChange={() => toggleNotification("marketingEmails")}
                label="Marketing & Updates" description="Product updates, tips, and health news" />
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            {/* Password */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Password</h3>
              <p className="text-xs text-gray-400 mb-3">Update your password to keep your account secure</p>

              {!showPasswordForm ? (
                <Button variant="outline" size="sm" onClick={() => setShowPasswordForm(true)}>
                  <Key className="w-3.5 h-3.5 mr-1" />
                  Change Password
                </Button>
              ) : (
                <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-500">Current Password</Label>
                    <Input type="password" placeholder="••••••••" className="h-9"
                      value={passwordForm.current}
                      onChange={(e) => setPasswordForm(p => ({ ...p, current: e.target.value }))} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-gray-500">New Password</Label>
                      <Input type="password" placeholder="••••••••" className="h-9"
                        value={passwordForm.new}
                        onChange={(e) => setPasswordForm(p => ({ ...p, new: e.target.value }))} />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-gray-500">Confirm New Password</Label>
                      <Input type="password" placeholder="••••••••" className="h-9"
                        value={passwordForm.confirm}
                        onChange={(e) => setPasswordForm(p => ({ ...p, confirm: e.target.value }))} />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <Button variant="ghost" size="sm" onClick={() => { setShowPasswordForm(false); setPasswordForm({ current: "", new: "", confirm: "" }); }}>Cancel</Button>
                    <Button size="sm" className="bg-gradient-to-r from-teal-600 to-teal-500 text-white">
                      <Save className="w-3.5 h-3.5 mr-1" />
                      Update Password
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Two-Factor Auth */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Two-Factor Authentication</h3>
              <p className="text-xs text-gray-400 mb-3">Add an extra layer of security to your account</p>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                    <Fingerprint className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Authenticator App</p>
                    <p className="text-xs text-gray-400">Use Google Authenticator or Authy</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs">Enable</Button>
              </div>
            </div>

            <Separator />

            {/* Active Sessions */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Active Sessions</h3>
              <p className="text-xs text-gray-400 mb-3">Devices currently logged into your account</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Laptop className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">MacBook Pro · Chrome</p>
                      <p className="text-xs text-gray-400">New York, US · Active now</p>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">Current</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">iPhone 16 · Safari</p>
                      <p className="text-xs text-gray-400">New York, US · 2 hours ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-500 text-xs">Revoke</Button>
                </div>
              </div>
            </div>
          </div>
        );

      case "preferences":
        return (
          <div className="space-y-6">
            {/* Units */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Measurement Units</h3>
              <p className="text-xs text-gray-400 mb-3">Choose how your health data is displayed</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPreferences(p => ({ ...p, unitSystem: "metric" }))}
                  className={cn(
                    "flex-1 p-3 rounded-xl border text-center transition-all",
                    preferences.unitSystem === "metric"
                      ? "border-teal-200 bg-teal-50 ring-1 ring-teal-100"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <p className="text-sm font-medium text-gray-900">Metric</p>
                  <p className="text-xs text-gray-400">kg, cm, °C, mmHg</p>
                </button>
                <button
                  onClick={() => setPreferences(p => ({ ...p, unitSystem: "imperial" }))}
                  className={cn(
                    "flex-1 p-3 rounded-xl border text-center transition-all",
                    preferences.unitSystem === "imperial"
                      ? "border-teal-200 bg-teal-50 ring-1 ring-teal-100"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <p className="text-sm font-medium text-gray-900">Imperial</p>
                  <p className="text-xs text-gray-400">lb, ft, °F, inHg</p>
                </button>
              </div>
            </div>

            <Separator />

            {/* Theme */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Theme</h3>
              <p className="text-xs text-gray-400 mb-3">Customize the appearance of your dashboard</p>
              <div className="flex gap-2">
                {[
                  { value: "light" as const, label: "Light", icon: Sun, desc: "Always light" },
                  { value: "dark" as const, label: "Dark", icon: Moon, desc: "Always dark" },
                  { value: "system" as const, label: "System", icon: Smartphone, desc: "Follow device" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setPreferences(p => ({ ...p, theme: opt.value }))}
                    className={cn(
                      "flex-1 p-3 rounded-xl border text-center transition-all",
                      preferences.theme === opt.value
                        ? "border-teal-200 bg-teal-50 ring-1 ring-teal-100"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <opt.icon className={cn("w-5 h-5 mx-auto mb-1", preferences.theme === opt.value ? "text-teal-600" : "text-gray-400")} />
                    <p className="text-sm font-medium text-gray-900">{opt.label}</p>
                    <p className="text-xs text-gray-400">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Language */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Language</h3>
              <p className="text-xs text-gray-400 mb-3">Select your preferred language</p>
              <select
                value={preferences.language}
                onChange={(e) => setPreferences(p => ({ ...p, language: e.target.value }))}
                className="flex h-10 w-full max-w-xs rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="ja">日本語</option>
              </select>
            </div>
          </div>
        );

      case "account":
        return (
          <div className="space-y-6">
            {/* Data & Privacy */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Data & Privacy</h3>
              <p className="text-xs text-gray-400 mb-3">Manage your health data and privacy settings</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                      <Download className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Export My Data</p>
                      <p className="text-xs text-gray-400">Download all your health records and data</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">Export</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Data Sharing Preferences</p>
                      <p className="text-xs text-gray-400">Control how your data is shared with providers</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Legal</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                  <p className="text-sm text-gray-700">Privacy Policy</p>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                  <p className="text-sm text-gray-700">Terms of Service</p>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                  <p className="text-sm text-gray-700">HIPAA Compliance</p>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Danger Zone */}
            <div className="rounded-xl border border-red-200 overflow-hidden">
              <div className="bg-red-50 px-5 py-3 border-b border-red-100">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <h3 className="text-sm font-semibold text-red-800">Danger Zone</h3>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Delete Account</p>
                    <p className="text-xs text-gray-400">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    Delete
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Sign Out</p>
                    <p className="text-xs text-gray-400">Sign out of all devices and sessions</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-gray-600">
                    <LogOut className="w-3.5 h-3.5 mr-1" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ═══ Header ═══ */}
      <div>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-slate-600 flex items-center justify-center shadow-sm">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>
        <p className="text-gray-500 mt-1">Manage your account, preferences, and security</p>
      </div>

      {/* ═══ Content ═══ */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-2 space-y-0.5">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left",
                      isActive
                        ? "bg-teal-50 text-teal-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", isActive ? "text-teal-600" : "text-gray-400")} />
                    {tab.label}
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <SettingsSection title={settingsTabs.find(t => t.id === activeTab)?.label ?? ""}>
            {tabContent()}
          </SettingsSection>
        </div>
      </div>

      {/* ═══ Footer ═══ */}
      <div className="text-center py-2">
        <p className="text-xs text-gray-400">
          App version 1.0.0 · HealthMonitor AI · &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
