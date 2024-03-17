import { useGetMe } from "@/shared/services/auth";
import { getRoles } from "@/shared/utils/roles";
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
import { useGetMenu } from "./service";

export type SidebarRoutes = {
  label: string;
  icon?: ReactNode;
  to: string;
};

export const languages = [
  {
    label: "English",
    abbrev: "en",
  },
  {
    label: "Swahili",
    abbrev: "sw",
  },
];

export type CommandActions = "logout";

export type CommantActionsList = {
  name: string;
  possibleKeywords: string;
  description?: string;
  action?: CommandActions;
  path?: string;
  title?: string;
};

const pathToIcon: Record<string, ReactNode> = {
  dashboard: <LayoutDashboard size={18} />,
  enrollments: <UserPlus size={18} />,
  followup: <CalendarDays size={18} />,
  "blood-collections": <Layers size={18} />,
  "cash-disbursement": <Banknote size={18} />,
  "data-collections": <Layers3 size={18} />,
  users: <Users size={18} />,
};

export const useMenuConfig = () => {
  const { me } = useGetMe();

  const { menu } = useGetMenu();

  const {
    readEnrollmentsRole,
    readUsersRole,
    readFollowUpsRole,
    readDisbursementsRole,
    readBloodCollectionRole,
    readDataCollectionRole,
  } = getRoles(me?.roles || []);

  return {
    menuItems:
      menu?.menus
        ?.filter((menu) => {
          //  check roles as well
          let canAccess = false;
          if (menu.path === "dashboard") {
            canAccess = true;
          }
          if (readEnrollmentsRole && menu.path === "enrollments") {
            canAccess = true;
          }
          if (readUsersRole && menu.path === "users") {
            canAccess = true;
          }
          if (readFollowUpsRole && menu.path === "followup") {
            canAccess = true;
          }
          if (readDisbursementsRole && menu.path === "cash-disbursement") {
            canAccess = true;
          }
          if (readBloodCollectionRole && menu.path === "blood-collection") {
            canAccess = true;
          }
          if (readDataCollectionRole && menu.path === "data-collection") {
            canAccess = true;
          }
          return pathToIcon?.[menu?.path] && canAccess;
        })
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((menu) => {
          return {
            ...menu,
            label: menu?.displayName,
            path: menu?.path,
            icon: pathToIcon?.[menu?.path],
          };
        }) || [],
  };
};

export const useExtraSideMenu = () => {
  const { me } = useGetMe();

  const { menu } = useGetMenu();

  const {
    readAuthorityRole,
    readRolesRole,
    readMenuRole,
    readFieldsRole,
    readFormsRole,
    readObjectivesRole,
  } = getRoles(me?.roles || []);
  return [
    ...((readAuthorityRole || readRolesRole) &&
    menu?.menus?.find((menu) => menu?.path === "roles-and-priviledes")
      ? [
          {
            label: "Roles & Privileges",
            path: "roles-and-privileges",
            sort: 1,
            icon: <Users size={18} />,
          },
        ]
      : []),
    ...(readMenuRole || readFieldsRole || readFormsRole || readObjectivesRole
      ? [
          {
            label: "Configurations",
            path: "configurations",
            sort: 2,
            icon: <SlidersHorizontal size={18} />,
          },
        ]
      : []),
    {
      label: "Settings",
      path: "settings",
      sort: 1,
      icon: <Settings size={18} />,
    },
  ];
};

export const useQuickActions = () => {
  const { menu } = useGetMenu();
  const { me } = useGetMe();
  const {
    readEnrollmentsRole,
    readUsersRole,
    readFollowUpsRole,
    readDisbursementsRole,
    readBloodCollectionRole,
    readDataCollectionRole,

    readAuthorityRole,
    readRolesRole,
    readMenuRole,
    readFieldsRole,
    readFormsRole,
    readObjectivesRole,
  } = getRoles(me?.roles || []);
  const quickActions: CommantActionsList[] = [
    ...(menu?.menus
      ? menu?.menus
          ?.filter((menu) => {
            //  check roles as well
            let canAccess = false;
            if (menu.path === "dashboard") {
              canAccess = true;
            }
            if (readEnrollmentsRole && menu.path === "enrollments") {
              canAccess = true;
            }
            if (readUsersRole && menu.path === "users") {
              canAccess = true;
            }
            if (readFollowUpsRole && menu.path === "followup") {
              canAccess = true;
            }
            if (readDisbursementsRole && menu.path === "cash-disbursement") {
              canAccess = true;
            }
            if (readBloodCollectionRole && menu.path === "blood-collection") {
              canAccess = true;
            }
            if (readDataCollectionRole && menu.path === "data-collection") {
              canAccess = true;
            }
            if (
              (readAuthorityRole || readRolesRole) &&
              menu.path === "roles-and-privileges"
            ) {
              canAccess = true;
            }

            return pathToIcon?.[menu?.path] && canAccess;
          })
          ?.map((menu) => {
            return {
              path: menu?.path,
              name: menu?.name || "",
              title: menu?.displayName,
              possibleKeywords: `${menu?.path} ${menu?.name} ${menu?.displayName}`,
            };
          })
          ?.reverse()
      : []),
    ...(readFieldsRole || readFormsRole || readMenuRole || readObjectivesRole
      ? [
          {
            path: "configurations",
            name: "Configurations",
            title: "Configurations",
            possibleKeywords: `Configurations configurations`,
          },
        ]
      : []),
    {
      name: "Logout",
      possibleKeywords: "signout logout",
      action: "logout",
    },
  ];
  return quickActions;
};
