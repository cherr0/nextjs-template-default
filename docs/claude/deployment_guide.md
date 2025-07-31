# 배포 가이드라인

## 🎯 개요
이 Next.js 애플리케이션의 배포 프로세스, 환경, 모범 사례입니다.

## 🌍 환경

### 개발 환경
- 로컬 개발 환경
- 핫 리로딩 활성화
- 개발 도구 접근 가능
- 디버그 모드 활성

### 스테이징 환경
- 프로덕션과 유사한 환경
- 릴리즈 테스트 환경
- 성능 테스트
- 통합 테스트

### 프로덕션 환경
- 실제 서비스 환경
- 최적화된 빌드
- 모니터링 활성화
- 오류 추적 활성

## 🚀 배포 프로세스

### 배포 전 체크리스트
- [ ] 모든 테스트 통과
- [ ] 코드 리뷰 완료
- [ ] 성능 테스트 완료
- [ ] 보안 스캔 통과
- [ ] 문서 업데이트

### 빌드 프로세스
```bash
# 의존성 설치
yarn install --frozen-lockfile

# 테스트 실행
yarn test

# 타입 체킹
yarn type-check

# 린팅
yarn lint

# 애플리케이션 빌드
yarn build

# 프로덕션 서버 시작
yarn start
```

### 환경 변수
```bash
# 프로덕션에 필요한 변수들
NEXT_PUBLIC_API_URL=https://api.example.com
NEXTAUTH_URL=https://app.example.com
NEXTAUTH_SECRET=your-secret-key

# 선택사항
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

## 📦 빌드 최적화

### 번들 분석
```bash
# 번들 크기 분석
yarn analyze

# 중복 의존성 확인
yarn why package-name

# 의존성 감사
yarn audit
```

### 성능 최적화
- [ ] 이미지 최적화 활성화
- [ ] 코드 분할 구현
- [ ] 가능한 곳에 정적 생성 사용
- [ ] 자산용 CDN 구성
- [ ] 압축 활성화

## 🔧 인프라 요구사항

### 시스템 요구사항
- Node.js 18+
- 최소 2GB RAM
- SSD 스토리지 권장
- 다중 인스턴스용 로드 밸런서

### 의존성
- PostgreSQL/MySQL (데이터베이스 사용시)
- Redis (캐싱용)
- CDN 서비스
- SSL 인증서

## 📊 모니터링 & 관찰가능성

### 헬스 체크
```typescript
// pages/api/health.ts
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  })
}
```

### 모니터링할 지표
- [ ] 응답 시간
- [ ] 오류율
- [ ] 메모리 사용량
- [ ] CPU 사용률
- [ ] 데이터베이스 연결

### 로깅
- 구조화된 로깅 구현
- Sentry를 통한 오류 추적
- 성능 모니터링
- 사용자 분석
- 보안 이벤트 로깅

## 🚨 롤백 절차

### 자동 롤백
- 데이터베이스 마이그레이션 롤백 스크립트
- 기능 플래그 토글
- 블루-그린 배포 전환
- 로드 밸런서 구성

### 수동 롤백 단계
1. 문제가 있는 배포 식별
2. 이전 버전으로 전환
3. 시스템 안정성 확인
4. 근본 원인 조사
5. 수정 및 재배포 계획

## 🔒 보안 고려사항

### 배포 보안
- [ ] HTTPS 강제
- [ ] 보안 헤더 구성
- [ ] 시크릿 적절히 관리
- [ ] 접근 제어 설정
- [ ] 취약점 스캔

### 런타임 보안
- [ ] 입력 유효성 검사
- [ ] 출력 인코딩
- [ ] CSRF 보호
- [ ] 속도 제한
- [ ] 인증 확인

## 📋 배포 환경

### Docker 설정
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Kubernetes 배포
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nextjs-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nextjs-app
  template:
    metadata:
      labels:
        app: nextjs-app
    spec:
      containers:
      - name: nextjs-app
        image: your-registry/nextjs-app:latest
        ports:
        - containerPort: 3000
```

## 🔄 CI/CD 파이프라인

### GitHub Actions 워크플로우
```yaml
name: 프로덕션 배포

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: yarn install
      - run: yarn test
      - run: yarn build
      - run: yarn deploy
```

### 파이프라인 단계
1. **소스**: 코드 체크아웃
2. **빌드**: 컴파일 및 번들링
3. **테스트**: 테스트 스위트 실행
4. **보안**: 취약점 스캔
5. **배포**: 환경에 배포
6. **확인**: 헬스 체크

## 🚨 인시던트 대응

### 알림 임계값
- 오류율 > 5%
- 응답 시간 > 2초
- 메모리 사용량 > 90%
- CPU 사용량 > 80%
- 디스크 공간 > 85%

### 대응 절차
1. **탐지**: 자동 알림
2. **평가**: 심각도 평가
3. **대응**: 즉시 조치
4. **소통**: 이해관계자 업데이트
5. **해결**: 수정 구현
6. **포스트모템**: 근본 원인 분석

## 📝 문서 요구사항

### 배포 문서화
- [ ] 환경 설정 가이드
- [ ] 구성 관리
- [ ] 문제 해결 가이드
- [ ] 아키텍처 다이어그램
- [ ] 일반적인 문제에 대한 런북

### 변경 관리
- [ ] 배포 로그 유지
- [ ] 변경 승인 프로세스
- [ ] 위험 평가 문서화
- [ ] 롤백 절차 테스트
- [ ] 소통 계획 활성

## 🎯 배포 전략

### 블루-그린 배포
```bash
# 블루 환경에서 그린으로 전환
# 1. 그린 환경에 새 버전 배포
# 2. 헬스 체크 확인
# 3. 트래픽을 그린으로 전환
# 4. 블루 환경 모니터링
```

### 카나리 배포
```bash
# 점진적 트래픽 전환
# 1. 새 버전을 소수 인스턴스에 배포
# 2. 트래픽의 5% 전환
# 3. 메트릭 모니터링
# 4. 점진적으로 트래픽 증가
# 5. 완전 전환 또는 롤백
```

### 기능 플래그
```typescript
// 기능 플래그를 사용한 배포
const FeatureFlag = ({ feature, children }: { feature: string, children: ReactNode }) => {
  const isEnabled = useFeatureFlag(feature)
  return isEnabled ? children : null
}

// 사용 예
<FeatureFlag feature="new-dashboard">
  <NewDashboard />
</FeatureFlag>
```

## 📈 성능 모니터링

### 핵심 웹 바이탈
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)
- Time to Interactive (TTI)

### 모니터링 도구
```typescript
// 성능 모니터링 설정
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric) {
  // 분석 서비스로 메트릭 전송
  analytics.track('Web Vital', {
    name: metric.name,
    value: metric.value,
    id: metric.id
  })
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

---

*프로덕션에 적용하기 전에 항상 비프로덕션 환경에서 배포 절차를 테스트하세요.*