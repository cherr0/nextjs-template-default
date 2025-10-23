import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

import { buttonVariants, type ButtonVariants } from '@/lib/cva'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ComponentProps<'button'>, ButtonVariants {
  asChild?: boolean
}

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export default Button
export type { ButtonProps }
