import { useLayoutEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Aside from "./aside";
import { useWindowSize } from "@/shared/hooks/use-window-size";
import { cn } from "@/lib/utils";

const Layout = () => {
  const { width } = useWindowSize();
  const [isSidebarOpen, setSidebarOpen] = useState(width > 992);

  useLayoutEffect(() => {
    setSidebarOpen(width > 992);
  }, [width]);

  return (
    <>
      <Header
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
      />
      <Aside
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />
      <main
        className={cn(
          "min-h-[calc(100dvh-65px)] bg-white transition-all relative top-[65px]",
          width > 992
            ? !isSidebarOpen
              ? "w-[calc(100dvw-70px)] ml-[70px]"
              : "w-[calc(100dvw-230px)] ml-[230px]"
            : "w-full"
        )}
      >
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
