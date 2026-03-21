export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

export interface Vitals {
  bloodPressure: string;
  heartRate: number;
  oxygenSaturation: number;
  temperature: number;
  respiratoryRate: number;
  weight: number;
  height: number;
}

export interface MedicalHistoryEntry {
  id: string;
  date: string;
  diagnosis: string;
  treatment: string;
  physician: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  type: string;
  physician: string;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
}

export type PatientStatus = "active" | "inactive" | "critical";

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  status: PatientStatus;
  diagnosis: string;
  admissionDate: string;
  insuranceProvider: string;
  vitals: Vitals;
  medicalHistory: MedicalHistoryEntry[];
  appointments: Appointment[];
  avatarUrl?: string;
}

export type NotificationType = "patient-alert" | "appointment" | "system" | "lab-result";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  patientId?: string;
}

export interface PatientFilters {
  status: PatientStatus | "all";
  searchQuery: string;
}

export type ViewMode = "grid" | "list";
