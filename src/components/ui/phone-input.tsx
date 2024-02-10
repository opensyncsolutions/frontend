import * as React from 'react'

import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import PhoneInput2 from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const inputVariants = cva(
  'flex h-10 w-full rounded-md border bg-background px-3 w-full py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input focus-visible:ring-primary',
        error: 'border-destructive focus-visible:ring-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const PhoneInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }) => {
    return (
      // @ts-ignore
      <PhoneInput2
        {...props}
        inputClass={cn(inputVariants({ variant }), className)}
        inputStyle={props?.style}
        inputProps={{
          id: props?.id,
        }}
      />
    )
  }
)
PhoneInput.displayName = 'PhoneInput'

export { PhoneInput }
