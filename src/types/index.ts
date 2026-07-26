export type UserRole = "patient" | "doctor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  bloodType: string;
  phone: string;
  address: string;
  avatar?: string;
}

export interface VitalSign {
  id: string;
  patientId: string;
  type: "heart_rate" | "blood_pressure" | "temperature" | "oxygen" | "glucose" | "respiratory";
  value: number;
  unit: string;
  timestamp: string;
  status: "normal" | "warning" | "critical";
}

export interface HealthMetric {
  id: string;
  patientId: string;
  metric: string;
  value: number;
  unit: string;
  date: string;
  trend: "up" | "down" | "stable";
}

export interface Alert {
  id: string;
  patientId: string;
  type: "critical" | "warning" | "info";
  message: string;
  timestamp: string;
  read: boolean;
}

export interface NavigationItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}
