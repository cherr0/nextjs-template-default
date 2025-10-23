import Link from 'next/link'

import FeatureCard from './_components/FeatureCard'

import Button from '~/components/ui/Button'

const HomePage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900'>
      {/* Hero Section */}
      <section className='px-4 py-16'>
        <div className='mx-auto mb-16 max-w-7xl text-center'>
          <div className='mb-4 inline-block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-50'>
            🚀 Next.js + TanStack Query + SEO
          </div>
          <h1 className='mb-6 text-5xl font-bold leading-tight text-gray-900 dark:text-white md:text-6xl'>
            SEO 최적화된 현대적인 웹 개발
          </h1>
          <p className='mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-300'>
            Next.js와 TanStack Query를 활용한 SEO 최적화된 웹 애플리케이션을
            만들어보세요. 서버에서 미리 렌더링하고 클라이언트에서 동적으로
            관리하는 최적의 방식을 구현합니다.
          </p>
          <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
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
      <section className='mx-auto max-w-7xl px-4 py-16'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 text-3xl font-bold text-gray-900 dark:text-white'>
            주요 기능
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
            SEO 최적화와 사용자 경험을 동시에 향상시키는 강력한 기능들
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
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
      <section className='mx-auto max-w-7xl px-4 py-16'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 text-3xl font-bold text-gray-900 dark:text-white'>
            실제 구현 예시
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
            아래 링크를 통해 실제 구현된 기능들을 확인해보세요
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800'>
            <h3 className='mb-3 text-xl font-semibold text-gray-900 dark:text-white'>
              게시물 목록
            </h3>
            <p className='mb-4 leading-relaxed text-gray-600 dark:text-gray-300'>
              서버에서 미리 렌더링된 게시물 목록을 확인해보세요.
            </p>
            <Link href='/posts'>
              <Button size='sm'>목록 보기</Button>
            </Link>
          </div>

          <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800'>
            <h3 className='mb-3 text-xl font-semibold text-gray-900 dark:text-white'>
              게시물 상세
            </h3>
            <p className='mb-4 leading-relaxed text-gray-600 dark:text-gray-300'>
              개별 게시물의 SEO 최적화된 상세 페이지를 확인해보세요.
            </p>
            <Link href='/posts/1'>
              <Button size='sm'>상세 보기</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='mx-auto max-w-7xl px-4 py-16'>
        <div className='mx-auto max-w-4xl rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white'>
          <div className='mb-6 text-center'>
            <h2 className='mb-2 text-3xl font-bold'>지금 시작하세요</h2>
            <p className='text-lg text-blue-100'>
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
