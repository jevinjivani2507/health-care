import {
  HouseIcon,
  ChartBarIcon,
  UsersIcon,
} from "@phosphor-icons/react/dist/ssr";

export const APP_NAME = "HealthHub";

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: HouseIcon },
  { label: "Analytics", href: "/analytics", icon: ChartBarIcon },
  { label: "Patients", href: "/patients", icon: UsersIcon },
] as const;
