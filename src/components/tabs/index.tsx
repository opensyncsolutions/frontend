import { cn } from "@/lib/utils";
import {
  ComponentProps,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";

export type Tab = {
  name: string | ReactNode;
  value: string;
};

type TabsProps = ComponentProps<"div"> & {
  tabs: Tab[];
  tabKey?: string;
  onChange?: (value: string) => void;
  active?: string;
};

const Tabs = ({
  tabs,
  children,
  tabKey,
  onChange,
  active,
  ...rest
}: TabsProps) => {
  const [search] = useSearchParams();
  const activeItem = active ? active : tabKey ? search.get(tabKey) : "";
  const ref = useRef<HTMLLIElement>(null);

  const [width, setWidth] = useState(ref?.current?.clientWidth);
  const [left, setLeft] = useState(ref?.current?.offsetLeft);
  // get index
  let activeIndex = tabs?.findIndex((item) => item?.value === activeItem);

  if (activeIndex < 0 && tabKey) {
    activeIndex = 0;
  }

  useLayoutEffect(() => {
    if (ref?.current) {
      setWidth(ref?.current?.clientWidth);
      setLeft(ref?.current?.offsetLeft);
    }
  }, [ref?.current, activeIndex]);

  return (
    <div {...rest} className={cn(rest.className, "relative")}>
      {tabs?.length ? (
        <nav className="relative sticky top-0 z-10">
          <ul className="border-b w-full flex items-center relative">
            <div
              className={`z-1 rounded-t-[4px] bg-black/5`}
              style={{
                width: ref?.current?.clientWidth ?? "100px",
                height: "100%",
                position: "absolute",
                bottom: 0,
                transition: ".25s",
                transform: `translateX(${
                  activeIndex === 0 ? 0 : ref?.current?.offsetLeft || 32
                }px)`,
              }}
            />
            <div
              className={`bg-primary z-2 `}
              style={{
                width: width ?? "100px",
                height: "2px",
                position: "absolute",
                bottom: 0,
                transition: ".25s",
                transform: `translateX(${
                  activeIndex === 0 ? 0 : left || 32
                }px)`,
              }}
            />
            {tabs.map((tab, i) => {
              return (
                <li
                  ref={activeIndex === i ? ref : undefined}
                  className="w-[max-content] mr-2"
                  key={i + ""}
                >
                  <Tab
                    tab={tab}
                    onChange={onChange}
                    active={active}
                    tabKey={tabKey}
                    index={i}
                  />
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
      <div>{children}</div>
    </div>
  );
};

const Tab = ({
  tab,
  tabKey,
  onChange,
  // active,
  index,
}: {
  tab: Tab;
  tabKey?: string;
  onChange?: (value: string) => void;
  active?: string;
  index: number;
}) => {
  const [search, setSearch] = useSearchParams();
  const { name, value } = tab;

  return (
    <button
      onClick={() => {
        if (tabKey) {
          if (search?.get(tabKey)) search.delete(tabKey);
          if (index > 0) search.append(tabKey, value);
          setSearch(search);
        } else onChange?.(value);
      }}
      className="z-3 relative pt-2 pb-3 px-3 text-md"
    >
      {name}
    </button>
  );
};

export default Tabs;
