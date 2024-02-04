import { cn } from "@/lib/utils";
import { useWindowSize } from "@/shared/hooks/use-window-size";

interface AsideProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
  onSelectTab: (tab: string) => void;
}

const Aside = ({ isSidebarOpen, closeSidebar }: AsideProps) => {
  const { width } = useWindowSize();
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
          "fixed h-[100dvh] border-r bg-white left-0 top-0 transition-all",
          width > 992 ? (!isSidebarOpen ? "w-[70px]" : "w-[200px]") : "w-[80%]"
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
        Hello
      </aside>
    </>
  );
};

export default Aside;
