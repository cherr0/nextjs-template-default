import styles from './FeatureCard.module.scss'

interface FeatureCardProps {
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
    <div className={styles.card}>
      <div className={`${styles.icon} ${styles[iconColor]}`}>
        <span>{icon}</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <p className={styles.content}>{content}</p>
    </div>
  )
}

export default FeatureCard
