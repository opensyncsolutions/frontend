import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommandActions } from "./data";

export const useHeaderHelpers = (onSelectTab: (tab: string) => void) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const signout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  };

  const commandAction = ({
    action,
    to,
    title,
  }: {
    action?: CommandActions;
    to?: string;
    title?: string;
  }) => {
    switch (action) {
      case "logout":
        signout();
        break;

      default:
        break;
    }

    title && onSelectTab(title);
    to && navigate(to);
    setOpen(false);
  };

  const headerActions = [
    {
      label: "Settings",
      action: () => navigate("/settings"),
    },
    {
      label: "Logout",
      action: () => signout(),
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
    onSelectTab,
    setOpen,
    commandAction,
    signout,
    headerActions,
  };
};
