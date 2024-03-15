import { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";

const Modal = ({
  open,
  close,
  title,
  description,
  footer,
}: {
  open: boolean;
  close: () => void;
  title: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
}) => {
  return (
    <AlertDialog open={open} onOpenChange={close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {footer && <AlertDialogFooter>{footer}</AlertDialogFooter>}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
