import * as React from 'react'

import { cardVariants, type CardVariants } from '@/lib/cva'
import { cn } from '@/lib/utils'

interface CardProps extends React.ComponentProps<'div'>, CardVariants {}

const Card = ({ className, variant, ...props }: CardProps) => {
  return (
    <div
      data-slot='card'
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
}

const CardHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='card-header'
      className={cn(
        'grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-[30px] [container-name:card-header] [container-type:inline-size] has-[data-slot=card-action]:grid-cols-[1fr_auto] [.border-b_&]:pb-[30px]',
        className
      )}
      {...props}
    />
  )
}

const CardTitle = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='card-title'
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

const CardDescription = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='card-description'
      className={cn('text-muted-foreground text-base', className)}
      {...props}
    />
  )
}

const CardAction = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='card-action'
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className
      )}
      {...props}
    />
  )
}

const CardContent = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='card-content'
      className={cn('px-[30px]', className)}
      {...props}
    />
  )
}

const CardFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='card-footer'
      className={cn(
        'flex items-center px-[30px] [.border-t_&]:pt-[30px]',
        className
      )}
      {...props}
    />
  )
}

export type { CardProps }

export default Card

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
}
