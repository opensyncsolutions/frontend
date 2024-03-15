import { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const SideSheet = ({
  open,
  close,
  title,
  footer,
  children,
}: {
  open: boolean;
  close: () => void;
  title?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}) => {
  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent>
        <SheetHeader>{title && <SheetTitle>{title}</SheetTitle>}</SheetHeader>
        {children}
        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetContent>
    </Sheet>
  );
};

export default SideSheet;
