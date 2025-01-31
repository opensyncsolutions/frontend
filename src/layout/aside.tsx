import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import { useWindowSize } from "@/shared/hooks/use-window-size";
import { useExtraSideMenu, useMenuConfig } from "./data";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import Loader from "@/components/ui/loader";
import Error from "@/pages/error";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { useMenus } from "@/shared/services/menus";

interface AsideProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

const Aside = ({ isSidebarOpen, closeSidebar }: AsideProps) => {
  const { width } = useWindowSize();
  const pathname = useLocation().pathname;

  const [isLoading, setLoading] = useState(false);

  const { menusError, menusLoading, menusRefetch, menus } = useMenus();

  const { menuItems } = useMenuConfig();

  const extraSideMenu = useExtraSideMenu();

  const loading = isLoading || menusLoading;

  return (
    <>
      {width <= 992 && (
        <div
          className={cn(
            "fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.5)] transition-all",
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={closeSidebar}
          style={{
            zIndex: 48,
          }}
        />
      )}
      <aside
        className={cn(
          "fixed h-[100dvh] overflow-hidden bg-primary left-0 top-0 transition-all",
          width > 992
            ? !isSidebarOpen
              ? "w-[70px]"
              : "w-[230px]"
            : "w-[320px] max-w-[80%]"
        )}
        style={{
          zIndex: 49,
          ...(width <= 992
            ? {
                ...(isSidebarOpen
                  ? {
                      transform: "translateX(0)",
                    }
                  : { transform: "translateX(-100%)" }),
              }
            : {}),
        }}
      >
        <div
          className={cn(
            "h-[65px] py-3 flex items-center justify-between w-full gap-4 min-w-[200px] px-5"
          )}
        >
          <div className={cn("flex items-center min-w-[200px]")}>
            <Logo icon={!isSidebarOpen && width > 992} />
          </div>
          {width <= 992 && (
            <Button variant={"outline"} onClick={closeSidebar}>
              <X />
            </Button>
          )}
        </div>
        {loading && (
          <div className="flex justify-center">
            <Loader size={100} />
          </div>
        )}
        {(!menus || menusError) && !loading ? (
          <Error
            message={
              menusError ? formatErrorMessage(menusError) : "Menu not found"
            }
            refetch={() => {
              setLoading(true);
              menusRefetch().finally(() => setLoading(false));
            }}
            type={menusError ? "destructive" : "default"}
          />
        ) : null}
        {menus && (
          <nav className="overflow-y-auto h-[calc(100%-65px)] max-h-[calc(100%-65px)] py-4 flex flex-col justify-between gap-7">
            <ul className="flex flex-col gap-4">
              {menuItems.map((route, i) => (
                <li
                  className={cn("flex items-center min-w-[200px] px-3")}
                  key={i}
                >
                  <Link
                    to={route?.path}
                    onClick={() => {
                      if (width <= 992) closeSidebar();
                    }}
                    className={cn(
                      "flex items-center px-2 py-[6px] text-[#B7D1D6]  w-full transition-all rounded-lg",
                      pathname.includes(route.path)
                        ? "bg-white/85 text-black/90"
                        : "hover:bg-white/10",
                      !isSidebarOpen && width > 992
                        ? "w-[45px] justify-center"
                        : ""
                    )}
                  >
                    {route?.icon}
                    <span
                      className={cn(
                        "transition-all break-keep whitespace-pre text-sm",
                        !isSidebarOpen && width > 992
                          ? "w-0 overflow-hidden ml-0"
                          : "animate-fade-in ml-4"
                      )}
                    >
                      {route?.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-4">
              {extraSideMenu.map((route, i) => (
                <li
                  className={cn("flex items-center min-w-[200px] px-3")}
                  key={i}
                >
                  <Link
                    to={route?.path || ""}
                    onClick={() => {
                      if (width <= 992) closeSidebar();
                    }}
                    className={cn(
                      "flex items-center px-2 py-[6px] text-[#B7D1D6] w-full transition-all rounded-lg",
                      pathname.includes(route?.path || "")
                        ? "bg-white/85 text-black/90"
                        : "hover:bg-white/10",
                      !isSidebarOpen && width > 992
                        ? "w-[45px] justify-center"
                        : ""
                    )}
                  >
                    {route?.icon}
                    <span
                      className={cn(
                        "transition-all break-keep whitespace-pre text-sm",
                        !isSidebarOpen && width > 992
                          ? "w-0 overflow-hidden ml-0"
                          : "animate-fade-in ml-4"
                      )}
                    >
                      {route?.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </aside>
    </>
  );
};

export default Aside;
