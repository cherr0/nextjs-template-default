import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '~/lib/utils'

const iconVariants = cva(
  'mb-4 flex h-12 w-12 items-center justify-center rounded-lg text-2xl',
  {
    variants: {
      color: {
        blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
        green:
          'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
        purple:
          'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'
      }
    },
    defaultVariants: {
      color: 'blue'
    }
  }
)

interface FeatureCardProps extends VariantProps<typeof iconVariants> {
  icon: string
  iconColor: 'blue' | 'green' | 'purple'
  title: string
  description: string
  content: string
}

const FeatureCard = ({
  icon,
  iconColor,
  title,
  description,
  content
}: FeatureCardProps) => {
  return (
    <div className='rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-gray-800'>
      <div className={cn(iconVariants({ color: iconColor }))}>
        <span>{icon}</span>
      </div>
      <h3 className='mb-2 text-lg font-semibold text-gray-900 dark:text-white'>
        {title}
      </h3>
      <p className='mb-3 text-sm text-gray-600 dark:text-gray-300'>
        {description}
      </p>
      <p className='text-sm leading-relaxed text-gray-700 dark:text-gray-400'>
        {content}
      </p>
    </div>
  )
}

export default FeatureCard
