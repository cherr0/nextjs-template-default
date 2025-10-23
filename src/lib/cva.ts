import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Button 컴포넌트 variants
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
 * Tailwind CSS + CVA 패턴으로 구성
 */
export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-lg border border-transparent px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap flex-shrink-0 gap-1 overflow-hidden transition-[color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground [&[href]]:hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground [&[href]]:hover:bg-secondary/90',
        destructive:
          'bg-destructive text-white [&[href]]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40',
        outline:
          'text-foreground [&[href]]:hover:bg-accent [&[href]]:hover:text-accent-foreground'
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
 * Tailwind CSS + CVA 패턴으로 구성
 */
export const cardVariants = cva(
  'bg-card text-card-foreground flex flex-col gap-[30px] rounded-[15px] border-2 py-[30px] shadow-sm',
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
