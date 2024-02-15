import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { XIcon } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./button";

interface BottomSheetProps {
  children: ReactNode;
  open: boolean;
  close: () => void;
  title?: ReactNode;
  footer?: ReactNode;
}

const BottomSheet = ({
  children,
  open,
  close,
  title,
  footer,
}: BottomSheetProps) => {
  return (
    <Drawer open={open} dismissible onClose={close}>
      <DrawerContent>
        <div className="w-full max-w-2xl m-auto">
          <DrawerHeader className="flex justify-between items-center">
            {title && <DrawerTitle>{title}</DrawerTitle>}
            <Button onClick={close} variant={"outline"}>
              <XIcon />
            </Button>
          </DrawerHeader>
          {children}
          {footer && <DrawerFooter>{footer}</DrawerFooter>}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BottomSheet;
