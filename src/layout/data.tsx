import {
  Banknote,
  CalendarDays,
  Layers,
  Layers3,
  LayoutDashboard,
  Settings,
  SlidersHorizontal,
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

const pathToIcon: Record<string, ReactNode> = {
  dashboard: <LayoutDashboard size={18} />,
  enrollment: <UserPlus size={18} />,
  followup: <CalendarDays size={18} />,
  "blood-collection": <Layers size={18} />,
  "cash-disbursement": <Banknote size={18} />,
  "data-collection": <Layers3 size={18} />,
  users: <Users size={18} />,
};

export const useMenuConfig = () => {
  // this should come from backend

  const config = [
    {
      label: "Dashboard",
      to: "dashboard",
      sort: 1,
    },
    {
      label: "Enrollment",
      to: "enrollment",
      sort: 2,
    },
    {
      label: "Followup",
      to: "followup",
      sort: 3,
    },
    {
      label: "Blood Collected",
      to: "blood-collection",
      sort: 4,
    },
    {
      label: "Cash Disbursement",
      to: "cash-disbursement",
      sort: 5,
    },
    {
      label: "Data Collection",
      to: "data-collection",
      sort: 6,
    },
    {
      label: "Users",
      to: "users",
      sort: 7,
    },
  ];
  return {
    menuItems: config
      .sort((a, b) => a.sort - b.sort)
      .map((menu) => {
        return {
          ...menu,
          icon: pathToIcon?.[menu?.to],
        };
      }),
  };
};

export const extraSideMenu = [
  {
    label: "Roles & Privileges",
    to: "roles-and-privileges",
    sort: 1,
    icon: <Users size={18} />,
  },
  {
    label: "Configurations",
    to: "configurations",
    sort: 2,
    icon: <SlidersHorizontal size={18} />,
  },
  {
    label: "Settings",
    to: "settings",
    sort: 1,
    icon: <Settings size={18} />,
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
