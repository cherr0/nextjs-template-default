import Link from 'next/link'

import FeatureCard from './_components/FeatureCard'
import styles from './page.module.scss'

import { Button } from '~/components/ui/Button'

const HomePage = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>🚀 Next.js + TanStack Query + SEO</div>
          <h1 className={styles.title}>SEO 최적화된 현대적인 웹 개발</h1>
          <p className={styles.description}>
            Next.js와 TanStack Query를 활용한 SEO 최적화된 웹 애플리케이션을
            만들어보세요. 서버에서 미리 렌더링하고 클라이언트에서 동적으로
            관리하는 최적의 방식을 구현합니다.
          </p>
          <div className={styles.buttonGroup}>
            <Link href='/posts'>
              <Button size='lg' className='bg-blue-600 hover:bg-blue-700'>
                게시물 보기
              </Button>
            </Link>
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
            SEO 최적화와 사용자 경험을 동시에 향상시키는 강력한 기능들
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <FeatureCard
            icon='🔍'
            iconColor='blue'
            title='SEO 최적화'
            description='서버에서 미리 렌더링하여 검색 엔진 최적화를 구현합니다.'
            content='초기 데이터는 서버 컴포넌트에서 미리 렌더링되어 검색 엔진이 콘텐츠를 크롤링할 수 있도록 합니다.'
          />

          <FeatureCard
            icon='⚡'
            iconColor='green'
            title='TanStack Query'
            description='클라이언트에서 효율적인 데이터 캐싱과 상태 관리를 제공합니다.'
            content='서버에서 초기 데이터를 가져온 후, 클라이언트에서 TanStack Query로 추가 데이터와 상호작용을 관리합니다.'
          />

          <FeatureCard
            icon='🎯'
            iconColor='purple'
            title='하이브리드 렌더링'
            description='서버 렌더링과 클라이언트 렌더링의 장점을 모두 활용합니다.'
            content='SEO를 위한 서버 렌더링과 UX를 위한 클라이언트 렌더링을 조합하여 최적의 성능을 제공합니다.'
          />
        </div>
      </section>

      {/* Demo Section */}
      <section className={styles.demoSection}>
        <div className={styles.demoHeader}>
          <h2 className={styles.title}>실제 구현 예시</h2>
          <p className={styles.description}>
            아래 링크를 통해 실제 구현된 기능들을 확인해보세요
          </p>
        </div>

        <div className={styles.demoGrid}>
          <div className={styles.demoCard}>
            <h3>게시물 목록</h3>
            <p>서버에서 미리 렌더링된 게시물 목록을 확인해보세요.</p>
            <Link href='/posts'>
              <Button size='sm'>목록 보기</Button>
            </Link>
          </div>

          <div className={styles.demoCard}>
            <h3>게시물 상세</h3>
            <p>개별 게시물의 SEO 최적화된 상세 페이지를 확인해보세요.</p>
            <Link href='/posts/1'>
              <Button size='sm'>상세 보기</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaHeader}>
            <h2 className={styles.title}>지금 시작하세요</h2>
            <p className={styles.description}>
              Next.js와 TanStack Query로 SEO 최적화된 웹 애플리케이션을
              만들어보세요
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
