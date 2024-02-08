import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommandActions } from "./data";
import Cookie from "js-cookie";

export const useHeaderHelpers = () => {
  const [open, setOpen] = useState(false);
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const navigate = useNavigate();

  const signout = () => {
    Cookie.remove("access-token");
    Cookie.remove("refresh-token");
    window.location.reload();
  };

  const commandAction = ({
    action,
    to,
  }: {
    action?: CommandActions;
    to?: string;
  }) => {
    switch (action) {
      case "logout":
        signout();
        break;

      default:
        break;
    }

    to && navigate(to);
    setOpen(false);
  };

  const headerActions = [
    {
      label: "Settings",
      action: () => {
        navigate("/settings");
        setPopoverOpen(false);
      },
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
    setOpen,
    commandAction,
    signout,
    headerActions,
    isPopoverOpen,
    setPopoverOpen,
  };
};
