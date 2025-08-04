# Claude AI 개발 가이드라인

이 문서는 Next.js 프로젝트에서 AI 보조 개발을 위한 종합적인 가이드라인을 제공합니다.
이 파일들은 Claude가 프로젝트 구조, 코딩 표준, 개발 관례를 이해하는 데 도움이 됩니다.

## 📖 사용법

`**새로운 채팅 시작 시 아래 문구를 Claude에게 전달 후 사용하세요.**`
@CLAUDE.md 문서는 프로젝트의 코딩 표준, 아키텍처 패턴, 개발 워크플로우를 Claude가 이해하고 일관된 개발 지원을 제공하는 데 필요한 모든 정보를 담고 있어. 이후 채팅에서 내가 원하는 정보에 맞는 정보만 추가 md 파일을 확인해서 작업을 진행해줘.

## 📋 문서 구조

### 핵심 가이드라인

사용자가 원하는 관련된 정보만 읽어서 사용합니다.

- **[초기 설정](./docs/claude/initial_setup.md)** - 초기 설정과 환경 구성
- **[코딩 스타일](./docs/claude/coding_style.md)** - 코딩 스타일, 아키텍처 패턴, 모범 사례
- **[프론트엔드 디자인 가이드라인](./docs/claude/frontend_rules.md)** - 코딩 디자인 핵심 규칙, 작업 권장 패턴
- **[개발 워크플로우](./docs/claude/development_workflow.md)** - 개발 워크플로우와 일일 작업 규칙
- **[테스트 가이드](./docs/claude/testing_guide.md)** - 테스트 전략과 구현 방법
- **[코드 리뷰](./docs/claude/code_review.md)** - 코드 리뷰 기준과 체크리스트

## 🛠️ 기술 스택

### 핵심 기술

- **Next.js 15** with App Directory (서버 컴포넌트)
- **TypeScript** 타입 안정성
- **@tanstack/react-query v5** 데이터 페칭
- **Zustand** 상태 관리
- **CSS Modules with SCSS** 스타일링

### 개발 도구

- **ESLint** 코드 품질을 위한 커스텀 규칙
- **Prettier** 코드 포맷팅
- **Husky** Git 훅
- **Storybook** 컴포넌트 개발

## 🎯 핵심 원칙

frontend-rule.mdc 가이드라인을 기반으로 한 이 프로젝트의 강조사항:

1. **가독성** - 명확한 네이밍, 복잡성 추상화, 조건문 단순화
2. **예측 가능성** - 일관된 패턴, 단일 책임, 서술적 이름
3. **응집성** - 기능 기반 구성, 관련 코드 근접성
4. **낮은 결합도** - 최소한의 의존성, 집중된 상태 관리, 드릴링보다 컴포지션

## 📖 가이드라인 사용법

1. **개발 시작 전**: initial_setup.md와 development_workflow.md 읽기
2. **개발 중**: coding_style.md 패턴과 testing_guide.md 전략 따르기
3. **제출 전**: code_review.md 체크리스트 사용
4. **배포 시**: deployment_guide.md 절차 따르기
5. **유지보수 시**: maintenance.md 가이드라인 참조

## 🔄 지속적 개선

이 가이드라인들은 프로젝트가 발전함에 따라 업데이트되어야 하는 살아있는 문서입니다. 새로운 패턴이 나타나거나 요구사항이 변경될 때, 코드베이스 전반의 일관성을 유지하기 위해 관련 문서를 업데이트하세요.

---

_최종 업데이트: 2025년 8월_
_버전: 1.0.0_
