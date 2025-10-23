import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Button 컴포넌트 variants
 * 기존 Button.module.scss를 기반으로 Tailwind로 재구성
 */
export const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center gap-[5px] whitespace-nowrap rounded-[10px] text-base font-medium transition-all duration-200 outline-none flex-shrink-0 disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40',
        outline:
          'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-[45px] px-5 has-[>svg]:pl-[15px]',
        sm: 'h-10 rounded-lg gap-2 px-[15px] has-[>svg]:pl-3',
        lg: 'h-[50px] rounded-lg px-[30px] has-[>svg]:pl-5',
        icon: 'h-[45px] w-[45px]'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>

/**
 * Badge 컴포넌트 variants
 * 추후 Badge.module.scss 참고하여 구현 예정
 */
export const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground',
        outline: 'text-foreground'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export type BadgeVariants = VariantProps<typeof badgeVariants>

/**
 * Card 컴포넌트 variants
 * 추후 Card.module.scss 참고하여 구현 예정
 */
export const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground',
  {
    variants: {
      variant: {
        default: 'shadow-sm',
        elevated: 'shadow-md',
        outlined: 'border-2'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export type CardVariants = VariantProps<typeof cardVariants>
