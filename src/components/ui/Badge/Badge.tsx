import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

import styles from './Badge.module.scss'

interface BadgeProps extends React.ComponentProps<'span'> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  asChild?: boolean
}

const Badge = ({
  className,
  variant = 'default',
  asChild = false,
  ...props
}: BadgeProps) => {
  const Comp = asChild ? Slot : 'span'

  const badgeClasses = [styles.badge, styles[variant], className]
    .filter(Boolean)
    .join(' ')

  return <Comp data-slot='badge' className={badgeClasses} {...props} />
}

export default Badge
export type { BadgeProps }
