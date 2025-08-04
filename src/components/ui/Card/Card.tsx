import * as React from 'react'

import styles from './Card.module.scss'

interface CardProps extends React.ComponentProps<'div'> {}

const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      data-slot='card'
      className={`${styles.card} ${className || ''}`}
      {...props}
    />
  )
}

const CardHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='card-header'
      className={`${styles.cardHeader} ${className || ''}`}
      {...props}
    />
  )
}

const CardTitle = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='card-title'
      className={`${styles.cardTitle} ${className || ''}`}
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
      className={`${styles.cardDescription} ${className || ''}`}
      {...props}
    />
  )
}

const CardAction = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='card-action'
      className={`${styles.cardAction} ${className || ''}`}
      {...props}
    />
  )
}

const CardContent = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='card-content'
      className={`${styles.cardContent} ${className || ''}`}
      {...props}
    />
  )
}

const CardFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='card-footer'
      className={`${styles.cardFooter} ${className || ''}`}
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
