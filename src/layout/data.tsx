import {
  Banknote,
  CalendarDays,
  Layers,
  Layers3,
  LayoutDashboard,
  UserPlus,
} from "lucide-react";
import { ReactNode } from "react";

export type SidebarRoutes = {
  label: string;
  icon?: ReactNode;
  to: string;
};

export type CommandActions = "logout";

export type CommantActionsList = {
  name: string;
  possibleKeywords: string;
  description?: string;
  action?: CommandActions;
  to?: string;
  title?: string;
};

export const sidebar_routes: SidebarRoutes[] = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    label: "Enrollment",
    to: "/enrollment",
    icon: <UserPlus />,
  },
  {
    label: "Followup",
    to: "/followup",
    icon: <CalendarDays />,
  },
  {
    label: "Blood Collected",
    to: "/blood-collection",
    icon: <Layers />,
  },
  {
    label: "Cash Disbursement",
    to: "/cash-disbursement",
    icon: <Banknote />,
  },
  {
    label: "Data Collection",
    to: "/data-collection",
    icon: <Layers3 />,
  },
];

export const quickActions: CommantActionsList[] = [
  {
    name: "Dashboard",
    possibleKeywords: "home dashboard",
    to: "/dashboard",
    title: "Dashboard",
  },
  {
    name: "Enrollment",
    possibleKeywords: "enrollment",
    to: "/enrollment",
    title: "Enrollment",
  },
  {
    name: "Logout",
    possibleKeywords: "signout logout",
    action: "logout",
  },
];
