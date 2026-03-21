import { House, ChartBar, Users } from "@phosphor-icons/react/dist/ssr";

export const APP_NAME = "HealthHub";

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: House },
  { label: "Analytics", href: "/analytics", icon: ChartBar },
  { label: "Patients", href: "/patients", icon: Users },
] as const;
