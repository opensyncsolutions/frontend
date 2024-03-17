import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Label } from "./label";

const inputVariants = cva(
  "flex h-10 w-full rounded-md border bg-background px-3 w-full py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input focus-visible:ring-ring",
        error: "border-destructive focus-visible:ring-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: {
    text: string;
    className?: string;
    style?: React.CSSProperties;
  };
  error?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, label, error, ...props }) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <Label
            htmlFor={props?.id || props?.name}
            className={cn(label?.className, error ? "text-red-500" : "")}
            style={label?.style}
          >
            {label?.text}
          </Label>
        )}
        {/* @ts-ignore */}
        <PhoneInput2
          {...props}
          inputClass={cn(
            inputVariants({ variant }),
            "!w-full py-2 !h-10 !border-input ",
            className,
            error ? "border-red-500" : ""
          )}
          containerClass="w-full"
          inputStyle={props?.style}
          inputProps={{
            id: props?.id,
          }}
        />
        {error && <small className="text-red-500">{error}</small>}
      </div>
    );
  }
);
PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
