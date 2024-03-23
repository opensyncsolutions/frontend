import { useLanguage } from "@/shared/contexts/languages";
import { useTranslations } from "@/shared/hooks/use-translations";
import { useGetMe } from "@/shared/services/auth";
import { useMenus } from "@/shared/services/menus";
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

export const paths = [
  "dashboard",
  "enrollments",
  "followup",
  "blood-collections",
  "cash-disbursement",
  "data-collections",
  "users",
  "roles-and-privileges",
  "configurations",
];

export const useMenuConfig = () => {
  const { me } = useGetMe();

  const { menus } = useMenus();

  const { language } = useLanguage();

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
      menus?.menus
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
          if (readBloodCollectionRole && menu.path === "blood-collections") {
            canAccess = true;
          }
          if (readDataCollectionRole && menu.path === "data-collections") {
            canAccess = true;
          }
          return pathToIcon?.[menu?.path] && canAccess;
        })
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((menu) => {
          return {
            ...menu,
            label: menu?.translations?.[language]?.name || menu?.name,
            path: menu?.path,
            icon: pathToIcon?.[menu?.path],
          };
        }) || [],
  };
};

const morePathToIcon: Record<string, ReactNode> = {
  "roles-and-privileges": <Users size={18} />,
  configurations: <SlidersHorizontal size={18} />,
};

export const useExtraSideMenu = () => {
  const { me } = useGetMe();

  const { menus } = useMenus();

  const { language } = useLanguage();

  const { translate } = useTranslations();

  const {
    readAuthorityRole,
    readRolesRole,
    readMenuRole,
    readFieldsRole,
    readFormsRole,
    readObjectivesRole,
  } = getRoles(me?.roles || []);

  return [
    ...(menus?.menus
      ?.filter((menu) => {
        let canAccess = false;
        if (
          (readAuthorityRole || readRolesRole) &&
          menu.path === "roles-and-privileges"
        ) {
          canAccess = true;
        }
        if (
          (readMenuRole ||
            readFieldsRole ||
            readFormsRole ||
            readObjectivesRole) &&
          menu.path === "configurations"
        ) {
          canAccess = true;
        }

        return morePathToIcon?.[menu?.path] && canAccess;
      })
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((menu) => {
        return {
          ...menu,
          label: menu?.translations?.[language]?.name || menu?.name,
          path: menu?.path,
          icon: morePathToIcon?.[menu?.path],
        };
      }) || []),
    ,
    {
      label: translate("Settings"),
      path: "settings",
      sort: 1,
      icon: <Settings size={18} />,
    },
  ];
};

export const useQuickActions = () => {
  const { menus } = useMenus();
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

  const { translate } = useTranslations();

  const { language } = useLanguage();

  const quickActions: CommantActionsList[] = [
    ...(menus?.menus
      ? menus?.menus
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
            if (
              (readFieldsRole ||
                readFormsRole ||
                readMenuRole ||
                readObjectivesRole) &&
              menu.path === "configurations"
            ) {
              canAccess = true;
            }
            return canAccess;
          })
          ?.map((menu) => {
            return {
              path: menu?.path,
              title: menu?.translations?.[language]?.name || menu?.name,
              name: menu?.translations?.[language]?.name || menu?.name,
              possibleKeywords: `${menu?.translations?.[language]?.name} ${menu?.path} ${menu?.name}`,
            };
          })
      : []),

    {
      name: translate("Logout"),
      possibleKeywords: "signout logout ondoka",
      action: "logout",
    },
  ];
  return quickActions;
};
