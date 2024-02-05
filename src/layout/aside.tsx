import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import { useWindowSize } from "@/shared/hooks/use-window-size";
import { sidebarRoutes } from "./data";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AsideProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
  onSelectTab: (tab: string) => void;
}

const Aside = ({ isSidebarOpen, closeSidebar, onSelectTab }: AsideProps) => {
  const { width } = useWindowSize();
  const pathname = useLocation().pathname;
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
          "fixed h-[100dvh] overflow-hidden border-r bg-white left-0 top-0 transition-all",
          width > 992 ? (!isSidebarOpen ? "w-[70px]" : "w-[230px]") : "w-[80%]"
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
            <Logo />
            <span
              className={cn(
                "transition-all",
                !isSidebarOpen && width > 992
                  ? "w-0 overflow-hidden ml-0"
                  : "animate-fade-in ml-4"
              )}
            >
              RKPK
            </span>
          </div>
          {width <= 992 && (
            <Button variant={"outline"} onClick={closeSidebar}>
              <X />
            </Button>
          )}
        </div>
        <nav className="overflow-y-auto max-h-[calc(100%-65px)] py-4">
          <ul className="flex flex-col gap-4">
            {sidebarRoutes.map((route) => (
              <li className={cn("flex items-center min-w-[200px] px-3")}>
                <Link
                  to={route?.to}
                  onClick={() => {
                    onSelectTab(route.label);
                    if (width <= 992) closeSidebar();
                  }}
                  className={cn(
                    "flex items-center px-2 py-[6px] text-[#030712] hover:bg-black/5 w-full transition-all rounded-lg",
                    pathname.includes(route.to) ? "bg-black/5" : "",
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
      </aside>
    </>
  );
};

export default Aside;
