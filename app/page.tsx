import FeatureCard from './components/FeatureCard'
import styles from './page.module.scss'

import { Button } from '~/components/ui/button'

const HomePage = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>🚀 Next.js + shadcn/ui</div>
          <h1 className={styles.title}>현대적인 웹 개발</h1>
          <p className={styles.description}>
            Next.js와 shadcn/ui를 활용한 아름다운 사용자 인터페이스를
            만들어보세요. 빠르고 접근 가능한 컴포넌트로 멋진 웹 경험을
            제공합니다.
          </p>
          <div className={styles.buttonGroup}>
            <Button size='lg' className='bg-blue-600 hover:bg-blue-700'>
              시작하기
            </Button>
            <Button variant='outline' size='lg'>
              문서 보기
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresHeader}>
          <h2 className={styles.title}>주요 기능</h2>
          <p className={styles.description}>
            개발자 경험을 향상시키는 강력한 기능들
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <FeatureCard
            icon='⚡'
            iconColor='blue'
            title='빠른 개발'
            description='미리 설계된 컴포넌트로 빠르게 프로토타입을 만들고 개발하세요.'
            content='shadcn/ui의 재사용 가능한 컴포넌트로 일관된 디자인 시스템을 구축할 수 있습니다.'
          />

          <FeatureCard
            icon='🎨'
            iconColor='green'
            title='아름다운 디자인'
            description='현대적이고 접근 가능한 UI 컴포넌트로 사용자 경험을 향상시키세요.'
            content='Tailwind CSS와 Radix UI를 기반으로 한 아름다운 컴포넌트들로 완벽한 디자인을 구현합니다.'
          />

          <FeatureCard
            icon='🔧'
            iconColor='purple'
            title='커스터마이징'
            description='필요에 맞게 컴포넌트를 수정하고 확장할 수 있습니다.'
            content='모든 컴포넌트는 소스 코드로 제공되어 완전한 커스터마이징이 가능합니다.'
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaHeader}>
            <h2 className={styles.title}>지금 시작하세요</h2>
            <p className={styles.description}>
              Next.js와 shadcn/ui로 멋진 웹 애플리케이션을 만들어보세요
            </p>
          </div>
          <div className={styles.ctaContent}>
            <div className={styles.buttonGroup}>
              <Button variant='secondary' size='lg'>
                프로젝트 생성
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='border-white text-white hover:bg-white hover:text-blue-600'
              >
                더 알아보기
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
