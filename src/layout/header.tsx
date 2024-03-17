import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWindowSize } from "@/shared/hooks/use-window-size";
import { Check, Languages, Menu, Skull } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandItem as CommandItemPrimitive,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ButtonHTMLAttributes } from "react";
import { languages, useQuickActions } from "./data";
import { DialogClose } from "@/components/ui/dialog";
import { CommandGroup } from "@/components/ui/command";
import { useHeaderHelpers } from "./helpers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetMe } from "@/shared/services/auth";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/shared/contexts/languages";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header = ({ isSidebarOpen, toggleSidebar }: HeaderProps) => {
  const { language, updateLanguage } = useLanguage();

  const { width } = useWindowSize();
  const {
    open,
    headerActions,
    isPopoverOpen,
    commandAction,
    setOpen,
    setPopoverOpen,
  } = useHeaderHelpers();
  const quickActions = useQuickActions();

  const { me } = useGetMe();

  const selectedTab = useLocation().pathname?.split("/")?.[1];

  return (
    <header
      className={cn(
        "border-b flex justify-between items-center px-6 py-3 fixed bg-white transition-all z-20",
        width > 992
          ? !isSidebarOpen
            ? "w-[calc(100dvw-70px)] ml-[70px]"
            : "w-[calc(100dvw-230px)] ml-[230px]"
          : "w-full"
      )}
    >
      <div className="flex items-center gap-3">
        <Button
          variant={"ghost"}
          onClick={toggleSidebar}
          className="ml-[-1rem]"
        >
          <Menu />
        </Button>
        <span key={selectedTab} className="animate-fade-in capitalize">
          {selectedTab?.replace(new RegExp("-", "g"), " ")}
        </span>
      </div>
      <div className="flex gap-3 items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-8 w-8 !p-0">
              <Languages size={18} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit px-0 py-2">
            <div className="flex flex-col">
              {languages.map(({ label, abbrev }, index) => (
                <Button
                  onClick={() => {
                    updateLanguage({
                      type: "SET_LANGUAGE",
                      payload: abbrev,
                    });
                  }}
                  key={index}
                  variant={"ghost"}
                  className="!px-4 justify-start gap-2"
                >
                  {language === abbrev ? (
                    <Check size={18} className="animate-fade-in" />
                  ) : null}{" "}
                  {label}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          variant={"outline"}
          className="gap-3"
        >
          Quick Actions{" "}
          {width > 992 && (
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>/
            </kbd>
          )}
        </Button>
        {/* popover */}
        <Popover onOpenChange={setPopoverOpen} open={isPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="!rounded-[50%] h-8 w-8">
              <Avatar className="h-6 w-6">
                <AvatarImage src={me?.dp} />
                <AvatarFallback>
                  {me?.username?.substring(0, 2)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="min-w-60 mr-6">
            <div className="border-b flex gap-4 items-center  pb-4">
              <Avatar>
                <AvatarImage src={me?.dp} />
                <AvatarFallback>
                  {me?.username?.substring(0, 2)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold">{me?.username}</span>
                <span className="text-xs">{me?.name}</span>
              </div>
            </div>
            <div className="flex flex-col pt-3">
              {headerActions.map(({ label, action, disabled }, index) => (
                <Button
                  onClick={action}
                  key={index}
                  variant={"ghost"}
                  disabled={disabled}
                  className="w-[calc(100%+2rem)] !px-4 !ml-[-1rem] justify-start"
                >
                  {label}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages or actions" />
        <CommandList className="w-full">
          <CommandEmpty className="flex flex-col justify-center items-center p-6">
            <Skull />
            <p>That's not there yet</p>
          </CommandEmpty>
          <CommandGroup>
            {quickActions.map(
              ({ name, description, possibleKeywords, ...actions }, index) => (
                <CommandItem
                  key={index}
                  onClick={() => {
                    commandAction({ ...actions });
                  }}
                >
                  <span>{name}</span>
                  <small className="opacity-[50%]">{description}</small>
                  <span className="hidden">{possibleKeywords}</span>
                </CommandItem>
              )
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default Header;

interface CommandItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const CommandItem = ({ children, ...props }: CommandItemProps) => {
  return children ? (
    <DialogClose
      className={cn(
        "flex bg-transparent w-full no-underline outline-none ring-offset-1 ring-offset-transparent hover:bg-slate-300/10"
      )}
      {...props}
    >
      <CommandItemPrimitive className="w-full">{children}</CommandItemPrimitive>
    </DialogClose>
  ) : (
    <></>
  );
};
