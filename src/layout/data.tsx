import {
  Banknote,
  CalendarDays,
  Layers,
  Layers3,
  LayoutDashboard,
  UserPlus,
  Users,
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

export const sidebarRoutes: SidebarRoutes[] = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: "Enrollment",
    to: "/enrollment",
    icon: <UserPlus size={18} />,
  },
  {
    label: "Followup",
    to: "/followup",
    icon: <CalendarDays size={18} />,
  },
  {
    label: "Blood Collected",
    to: "/blood-collection",
    icon: <Layers size={18} />,
  },
  {
    label: "Cash Disbursement",
    to: "/cash-disbursement",
    icon: <Banknote size={18} />,
  },
  {
    label: "Data Collection",
    to: "/data-collection",
    icon: <Layers3 size={18} />,
  },
  {
    label: "Users",
    to: "/users",
    icon: <Users size={18} />,
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
