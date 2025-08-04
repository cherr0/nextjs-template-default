# 개발 워크플로우 & 규칙

## 🎯 개요

일일 개발 관례, 워크플로우 가이드라인, 일관된 개발 경험을 위한 규칙입니다.

## 🔄 개발 워크플로우

### 일일 워크플로우

1. **개발 시작**

   ```bash
   git pull origin main
   yarn install  # package.json이 변경된 경우
   yarn dev
   ```

2. **기능 개발**

   ```bash
   git checkout -b feature/기능-이름
   # 기능 개발
   git add .
   git commit -m "feat: 새 기능 추가"
   git push origin feature/기능-이름
   ```

3. **코드 품질 확인**
   ```bash
   yarn lint        # 코드 스타일 확인
   yarn type-check  # TypeScript 확인
   yarn test        # 테스트 실행
   ```

### 브랜치 네이밍 규칙

- `feature/기능-이름` - 새로운 기능
- `fix/문제-설명` - 버그 수정
- `refactor/컴포넌트-이름` - 코드 리팩토링
- `docs/readme-업데이트` - 문서 업데이트
- `chore/의존성-업데이트` - 유지보수 작업

### 커밋 메시지 형식

```
type(scope): 설명

타입:
- feat: 새로운 기능
- fix: 버그 수정
- docs: 문서
- style: 코드 스타일 변경
- refactor: 코드 리팩토링
- test: 테스트 추가
- chore: 유지보수
```

## 🔧 개발 도구

### ESLint 통합

```bash
# 린팅 문제 자동 수정
yarn lint:fix

# 특정 파일 확인
yarn lint src/components/ui/Button/index.tsx
```

### TypeScript 통합

```bash
# 전체 프로젝트 타입 체크
yarn type-check

# 워치 모드로 타입 체크
yarn type-check --watch
```

### VS Code 설정

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## 🐛 디버깅 가이드라인

### 브라우저 개발자 도구

- 컴포넌트 검사에 React DevTools 사용
- Zustand 스토어에 Redux DevTools 사용
- API 디버깅에 Network 탭 사용
- 오류 추적에 Console 사용

### 훅 디버깅

```typescript
// 커스텀 훅 디버그
const useDebugValue = (value: any, label?: string) => {
  React.useDebugValue(value, (val) => `${label}: ${JSON.stringify(val)}`)
}

const useUsers = () => {
  const query = useQuery(/* ... */)
  useDebugValue(query.data, 'Users Data')
  return query
}
```

## 📝 코드 문서화

### 문서화 방침

- 복잡한 컴포넌트에 JSDoc 주석 추가
- 프로젝트 가이드라인은 마크다운으로 관리
- API 문서는 필요시 생성

## 🚀 성능 최적화

### 성능 최적화 도구

- 컴포넌트 지연 로딩 (lazy loading)
- 비용이 큰 컴포넌트에 메모이제이션 적용
- 계산 비용이 큰 값에 useMemo 사용
- 긴 목록에 가상화 고려

## 🔄 핫 리로딩

### 개발 서버

```bash
# 핫 리로드로 시작
yarn dev

# 다른 포트에서 시작
yarn dev -p 3001

# 터보 모드로 시작
yarn dev --turbo
```

---

_일관된 코드 품질과 개발 효율성을 위해 이 가이드라인을 일관되게 따르세요._
