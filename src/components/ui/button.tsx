import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

import styles from './button.module.scss'

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

const Button = ({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button'

  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    className
  ]
    .filter(Boolean)
    .join(' ')

  return <Comp data-slot='button' className={buttonClasses} {...props} />
}

export { Button }
