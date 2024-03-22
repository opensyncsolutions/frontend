import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommandActions } from "./data";
import { useLogout } from "@/shared/services/auth";
import { useTranslations } from "@/shared/hooks/use-translations";

export const useHeaderHelpers = () => {
  const [open, setOpen] = useState(false);
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const navigate = useNavigate();

  const { logout, logoutLoading } = useLogout();
  const { translate } = useTranslations();

  const commandAction = ({
    action,
    path,
  }: {
    action?: CommandActions;
    path?: string;
  }) => {
    switch (action) {
      case "logout":
        logout();
        break;

      default:
        break;
    }

    path && navigate(path);
    setOpen(false);
  };

  const headerActions = [
    {
      label: translate("Settings"),
      action: () => {
        navigate("/settings");
        setPopoverOpen(false);
      },
    },
    {
      label: translate("Logout"),
      action: () => logout(),
      disabled: logoutLoading,
    },
  ];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return {
    open,
    setOpen,
    commandAction,
    logout,
    logoutLoading,
    headerActions,
    isPopoverOpen,
    setPopoverOpen,
  };
};
