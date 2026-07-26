import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import {
  LayoutDashboard,
  Heart,
  Activity,
  Users,
  Calendar,
  Bell,
  Settings,
  FileText,
  ChevronLeft,
  Pill,
  Bot,
  BarChart3,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { NavigationItem } from "@/types";

const patientNavItems: NavigationItem[] = [
  { label: "Dashboard", path: "/patient/dashboard", icon: LayoutDashboard },
  { label: "Vitals", path: "/patient/vitals", icon: Activity },
  { label: "Health Graphs", path: "/patient/heart", icon: BarChart3 },
  { label: "AI Assistant", path: "/patient/ai-chat", icon: Bot },
  { label: "Medications", path: "/patient/medications", icon: Pill },
  { label: "Reports", path: "/patient/reports", icon: FileText },
  { label: "Appointments", path: "/patient/appointments", icon: Calendar },
  { label: "Alerts", path: "/patient/alerts", icon: Bell, badge: 3 },
];

const doctorNavItems: NavigationItem[] = [
  { label: "Dashboard", path: "/doctor/dashboard", icon: LayoutDashboard },
  { label: "Patients", path: "/doctor/patients", icon: Users },
  { label: "Monitoring", path: "/doctor/monitoring", icon: Activity },
  { label: "Alerts", path: "/doctor/alerts", icon: Bell, badge: 7 },
  { label: "Reports", path: "/doctor/reports", icon: FileText },
  { label: "Schedule", path: "/doctor/schedule", icon: Calendar },
];

const bottomItems: NavigationItem[] = [
  { label: "Settings", path: "/settings", icon: Settings },
];

interface SidebarProps {
  role?: "patient" | "doctor";
}

export default function Sidebar({ role = "patient" }: SidebarProps) {
  const { isOpen, toggle } = useSidebar();
  const navItems = role === "doctor" ? doctorNavItems : patientNavItems;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-full bg-white border-r border-gray-200",
        "flex flex-col transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {/* Logo Area */}
      <div className="flex items-center h-16 px-4 border-b border-gray-100">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shrink-0 shadow-sm">
            <Heart className="w-4 h-4 text-white" fill="white" />
          </div>
          <span
            className={cn(
              "font-bold text-gray-900 whitespace-nowrap transition-all duration-300",
              isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
            )}
          >
            HealthMonitor
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p
          className={cn(
            "text-xs font-medium text-gray-400 uppercase tracking-wider px-3 mb-2 transition-all duration-300",
            isOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
          )}
        >
          {role === "doctor" ? "Doctor Portal" : "Patient Portal"}
        </p>

        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                "hover:bg-teal-50 hover:text-teal-700 group relative",
                isActive
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-600"
              )
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span
              className={cn(
                "whitespace-nowrap transition-all duration-300",
                isOpen ? "opacity-100" : "opacity-0 absolute left-14"
              )}
            >
              {item.label}
            </span>
            {item.badge && (
              <span
                className={cn(
                  "ml-auto bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5",
                  !isOpen && "hidden"
                )}
              >
                {item.badge}
              </span>
            )}
            {/* Tooltip when collapsed */}
            {!isOpen && item.badge && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}

        <Separator className="my-4" />

        {/* Bottom Nav */}
        {bottomItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                "hover:bg-gray-100 hover:text-gray-900",
                isActive ? "bg-gray-100 text-gray-900" : "text-gray-600"
              )
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span
              className={cn(
                "whitespace-nowrap transition-all duration-300",
                isOpen ? "opacity-100" : "opacity-0"
              )}
            >
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-gray-100">
        <button
          onClick={toggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
        >
          <ChevronLeft
            className={cn(
              "w-4 h-4 transition-transform duration-300",
              !isOpen && "rotate-180"
            )}
          />
          <span
            className={cn(
              "transition-all duration-300",
              isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            )}
          >
            Collapse
          </span>
        </button>
      </div>
    </aside>
  );
}
