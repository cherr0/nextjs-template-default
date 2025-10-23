import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

import { badgeVariants, type BadgeVariants } from '@/lib/cva'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.ComponentProps<'span'>, BadgeVariants {
  asChild?: boolean
}

const Badge = ({
  className,
  variant,
  asChild = false,
  ...props
}: BadgeProps) => {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot='badge'
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  )
}

export default Badge
export type { BadgeProps }
