# 문서 중복 정리 및 단일 소스 정립 플랜 (2025-09-18)

## 개요 (Scope)
- docs/common 전반의 중복된 가이드(상태관리, Next.js 패턴, 디렉토리 구조, 스타일링, API 패턴)를 단일 소스로 정리합니다.
- 중복 섹션이 많은 문서는 “요약(3~5줄) + 원문 링크” 형태로 슬림화합니다.
- 참조만 있고 누락된 문서(템플릿/라우팅/유틸리티)를 생성하여 모든 링크가 유효하게 만듭니다.
- 교차 참조를 현재 구조와 일치하도록 업데이트합니다(구: migration-plan 제거).

## 목표 (Goals)
- 도메인별 단일 권위 문서(Single Source of Truth) 지정
- 중복 제거: 각 문서에 요약 + 링크만 유지
- 누락 문서 생성 및 모든 내부 링크 정상화
- 불필요해진 마이그레이션 플랜 문서 제거로 단일 플랜 유지

## 범위 제외 (Out of Scope)
- 런타임 코드/빌드 설정 변경
- 신규 기능 개발, 테스트 케이스 대량 추가
- 전체 문서 전면 재작성(핵심 중복 정리 위주로 최소 수정)

## 의존성과 참조 문서 (Dependencies & Docs)
- 단일 소스 지정
  - 상태관리: `docs/common/data-management-architecture.md`
  - Next.js 패턴: `docs/common/patterns.md`
  - 프로젝트 구조/네이밍: `docs/common/coding_style.md`
  - 스타일링/테마: `docs/common/customizations.md`
  - API 워크플로우: `docs/common/api-integration-workflow.md`
  - 리뷰 체크리스트: `docs/common/code_review.md`
  

## 리스크 (Risks)
- 요약 과정에서 원문의 뉘앙스/세부 예시 손실 가능성
- 링크 변환 중 일부 앵커/상대경로 불일치 발생 가능
- 제거된 문서에 대한 잔여 참조 발생 가능성

## 작업 스트림 (병렬화 가능 Workstreams)
- WS-A: 유틸 문서 정리(간소화 방침 반영)
  - A1. 별도 유틸 문서 제거 및 각 단일 소스 문서로 귀속
- WS-B: Single-Source 인덱스 정리(경량)
  - B1. 단일 소스 매핑 확정(본 문서 기준)
  - B2. 공용 인덱스 블록(짧은 안내) 작성 후 관련 문서에서 참조
- WS-C: 중복 섹션 슬리밍
  - C1. `feature-module-guide.md`: 상태관리/스타일/구조 요약화 + 링크
  - C2. `coding_style.md`: 스타일 상세를 `customizations.md`로 위임
  - C3. `patterns.md`: 스타일/테마는 링크, Next.js 패턴은 유지
  - C4. `doc_gate.md`: 5줄 요약 템플릿 + 링크 중심으로 축소
  - C5. `session-protocol.md` ↔ `development_workflow.md` 역할 분리 및 상호링크
  - C6. 기타 문서의 상태관리 반복 블록을 3~5줄 요약 + 링크로 교체
- WS-D: 교차 참조 정합화
  - D1. 누락 파일 참조 수정(WS-A 산출물 연결)
  - D2. `docs/migration-plan.md` 제거 및 관련 참조 삭제
  - D3. 상대경로/앵커 정규화 및 “See also” 블록 추가
- WS-E: 검증
  - E1. 내부 링크 스캔(rg)으로 존재 여부 확인
  - E2. 주요 헤딩/앵커 스팟체크
  - E3. 반복 블록 → 요약 치환 완료 여부 점검

## 작업 의존성 (Task Graph)
- 병렬 시작: WS-A, WS-B
- WS-A → WS-C, WS-D (생성 파일 링크 필요)
- WS-B → WS-C (요약 블록에서 인덱스 참조)
- WS-C, WS-D → WS-E (최종 검증)

## 단계별 계획 (Step-by-Step Plan)
- 0. 승인 확인 및 범위 고정 (완료)  
- 1. WS-A: 유틸 문서 생성  
- 2. WS-B: 단일 소스 인덱스 공지(경량)  
- 3. WS-C: 대상 문서 슬리밍(파일 단위 병렬)  
- 4. WS-D: 교차 참조 수정 및 불필요 문서 제거(완료)  
- 5. WS-E: 링크/앵커/요약치환 검증 및 잔여 보정  

## 검증 (Validation)
- ripgrep로 내부 링크(.md) 및 앵커 유효성 점검
- 헤딩/앵커 스팟체크: 참조하는 섹션 존재 여부 확인
- 중복 블록 치환 여부 확인: 상태관리/스타일/구조/패턴 관련 중복 스캔

## 롤백 (Rollback)
- 파일/문서별 변경을 작은 단위로 수행하여 개별 롤백 가능
- 문제 발생 문서는 요약화 이전 버전으로 단건 복구 후, 축소 범위를 더 보수적으로 재적용

## 결정 기록 (Decision Log)
- 단일 소스 문서 맵핑을 본 계획서대로 확정
- Doc Gate는 “5줄 요약 + 링크”로 간소화
- session-protocol은 “세션 시작/문서 로드”, development_workflow는 “Plan-First/승인/품질 검증/명령어” 역할 유지

---

### 체크리스트
- [x] WS-A 유틸 문서 제거 및 귀속
- [x] WS-B 인덱스 안내 배치
- [x] WS-C 대상 문서 슬리밍 완료
- [x] WS-D 교차참조 정리 및 `docs/migration-plan.md` 제거
- [ ] WS-E 링크/앵커/치환 검증 통과
