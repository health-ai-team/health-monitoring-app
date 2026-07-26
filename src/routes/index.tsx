import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import AuthPage from "@/pages/auth/AuthPage";
import LandingPage from "@/pages/landing/LandingPage";
import LandingLayout from "@/components/layout/LandingLayout";
import AppShell from "@/components/layout/AppShell";
import PatientDashboardPage from "@/pages/patient/DashboardPage";
import HealthLogsPage from "@/pages/patient/HealthLogsPage";
import MedicationTrackerPage from "@/pages/patient/MedicationTrackerPage";
import AiChatPage from "@/pages/patient/AiChatPage";
import MedicalDocumentsPage from "@/pages/patient/MedicalDocumentsPage";
import HealthGraphsPage from "@/pages/patient/HealthGraphsPage";
import SettingsPage from "@/pages/settings/SettingsPage";
import DoctorDashboardPage from "@/pages/doctor/DashboardPage";
import DoctorPatientsPage from "@/pages/doctor/PatientsPage";
import DoctorMonitoringPage from "@/pages/doctor/MonitoringPage";
import DoctorAlertsPage from "@/pages/doctor/AlertsPage";
import DoctorReportsPage from "@/pages/doctor/ReportsPage";
import DoctorSchedulePage from "@/pages/doctor/SchedulePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LandingLayout>
        <Outlet />
      </LandingLayout>
    ),
    children: [
      { index: true, element: <LandingPage /> },
      { path: "features", element: <div className="max-w-7xl mx-auto px-4 py-16"><h1 className="text-3xl font-bold">Features</h1><p className="text-gray-500 mt-2">Coming soon.</p></div> },
      { path: "about", element: <div className="max-w-7xl mx-auto px-4 py-16"><h1 className="text-3xl font-bold">About</h1><p className="text-gray-500 mt-2">Coming soon.</p></div> },
      { path: "contact", element: <div className="max-w-7xl mx-auto px-4 py-16"><h1 className="text-3xl font-bold">Contact</h1><p className="text-gray-500 mt-2">Coming soon.</p></div> },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/patient",
    element: (
      <AppShell role="patient">
        <Outlet />
      </AppShell>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <PatientDashboardPage /> },
      { path: "vitals", element: <HealthLogsPage /> },
      { path: "heart", element: <HealthGraphsPage /> },
      { path: "ai-chat", element: <AiChatPage /> },
      { path: "medications", element: <MedicationTrackerPage /> },
      { path: "reports", element: <MedicalDocumentsPage /> },
      { path: "appointments", element: <PlaceholderPage title="Appointments" /> },
      { path: "alerts", element: <PlaceholderPage title="Alerts" /> },
    ],
  },
  {
    path: "/doctor",
    element: (
      <AppShell role="doctor">
        <Outlet />
      </AppShell>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <DoctorDashboardPage /> },
      { path: "patients", element: <DoctorPatientsPage /> },
      { path: "monitoring", element: <DoctorMonitoringPage /> },
      { path: "alerts", element: <DoctorAlertsPage /> },
      { path: "reports", element: <DoctorReportsPage /> },
      { path: "schedule", element: <DoctorSchedulePage /> },
    ],
  },{ path: "/settings",
    element: (
      <AppShell role="patient">
        <SettingsPage />
      </AppShell>
    ),
  },
]);

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-500 mt-2">This page is under construction.</p>
    </div>
  );
}
