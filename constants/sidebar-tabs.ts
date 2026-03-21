import { NavItemData } from "@/components/navigation";
import { NavigationIcons } from "@/components/navigation/navigation-icons";

export const dashboardItems: NavItemData[] = [
  {
    id: "default",
    label: "Default",
    icon: NavigationIcons.default,
    href: "/dashboard",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: NavigationIcons.analytics,
    href: "/analytics",
  },
  {
    id: "patients",
    label: "Patients",
    icon: NavigationIcons.patients,
    href: "/patients",
  },
] as NavItemData[];
