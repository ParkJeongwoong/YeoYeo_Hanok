# AGENTS.md

이 문서는 `YeoYeo_Hanok` 저장소를 수정할 때, **어디를 봐야 하는지/어떤 순서로 손봐야 하는지**를 빠르게 판단하기 위한 작업 가이드입니다.

## 1) 프로젝트 개요
- 스택: Next.js 13 (pages router) + React 18 + TypeScript + SCSS.
- 도메인: 소개/서비스/객실/예약(체크·상세·성공) 중심의 정적 페이지 기반 사이트.
- 핵심 흐름: `src/pages` 라우팅 → `src/components` UI 조합 → `src/styles` 페이지/공통 스타일 반영.

---

## 2) 패키지(디렉터리) 역할 정리

### `src/pages`
- 역할: URL 단위 진입점(페이지 라우트)과 SSR/SSG 렌더 기준점.
- 주요 파일
  - `index.tsx`: 메인 페이지
  - `service.tsx`, `room.tsx`: 서비스/객실 페이지
  - `reservation/*`: 예약 관련 플로우
  - `_app.tsx`: 전역 스타일/공통 래핑
  - `_document.tsx`: 문서 레벨 HTML 구조
- 수정 시 원칙
  - 페이지 로직은 **최소화**하고 UI/상태는 `components`/`state`/`hooks`로 이동.
  - 페이지 간 중복 로직이 보이면 공통 컴포넌트/유틸로 추출.

### `src/components`
- 역할: 화면 구성의 실질적 단위.
- 하위 역할
  - `layout/`: 헤더, 푸터, SNB 등 공통 레이아웃
  - `common/`: 폼 입력, 공용 모달 등 재사용 컴포넌트
  - `reservation/`: 예약 도메인 전용 컴포넌트(캘린더 포함)
  - `Intro/`, `v2/`: 페이지/버전 특화 UI
- 수정 시 원칙
  - **프레젠테이션과 비즈니스 로직 분리**: 렌더 중심 컴포넌트는 상태 계산을 최소화.
  - 신규 함수/컴포넌트 추가 전 동일 책임 컴포넌트 존재 여부 우선 확인.

### `src/styles`
- 역할: 전역/레이아웃/페이지별 SCSS 관리.
- 하위 역할
  - `_variables.scss`, `_mixins.scss`, `_reset.scss`: 토큰/믹스인/리셋
  - `layout/*`: 레이아웃 스타일
  - `pages/*`: 페이지별 스타일
  - `common.scss`: 공통 스타일 집합
- 수정 시 원칙
  - 새 스타일은 가능한 `variables/mixins`를 재사용.
  - 페이지 특화 스타일은 `pages/*`에 국한하고, 공통화 가능한 경우만 `common.scss`로 승격.

### `src/i18n`
- 역할: 다국어 리소스 및 i18n 초기화.
- 하위 역할
  - `locales/ko`, `locales/en`: 번역 JSON
  - `index.js`: i18n 설정 엔트리
- 수정 시 원칙
  - 사용자 노출 문자열 변경 시 ko/en 동시 반영.
  - 하드코딩 문자열보다 locale 키 기반 사용 유지.

### `src/hooks`
- 역할: 재사용 가능한 UI/상태 훅.
- 현재 `useMediaQuery.tsx` 중심.
- 수정 시 원칙
  - 컴포넌트 내부에서 반복되는 브라우저/반응형 로직은 훅으로 이동.

### `src/state`
- 역할: 전역/공유 상태(atoms) 관리.
- 현재 `modalStatus.ts` 등 UI 상태 관리 중심.
- 수정 시 원칙
  - 전역 상태는 “여러 페이지/컴포넌트에서 정말 공유되는가”를 먼저 검토.

### `src/lib`
- 역할: 외부 연동 래퍼/초기화 유틸.
- 현재 `gtag.tsx` 등 분석 스크립트 연계.
- 수정 시 원칙
  - 외부 키/식별자는 환경변수로만 관리 (`NEXT_PUBLIC_*`).

### `src/utils`
- 역할: 순수 유틸 함수(정규식, SEO 헬퍼 등).
- 수정 시 원칙
  - 부수효과 없는 함수 우선.
  - 도메인 특화 로직은 utils 남용보다 해당 도메인 폴더로 귀속 고려.

### `public`
- 역할: 정적 에셋(이미지/아이콘/SEO 파일).
- 수정 시 원칙
  - 파일명/경로 변경 시 참조 경로(컴포넌트/스타일) 동시 점검.

---

## 3) 변경 유형별 작업 가이드

### A. 페이지 UI 수정
1. 해당 라우트 파일(`src/pages/...`) 확인
2. 실질 렌더 컴포넌트(`src/components/...`) 추적
3. 연결된 SCSS(`src/styles/pages/...`, `layout/...`) 수정
4. 다국어 문구면 `src/i18n/locales/{ko,en}` 동시 수정
5. 빌드로 타입/번들 이상 유무 확인

### B. 예약 플로우 수정(날짜/인원/동의/사이드바)
1. `src/pages/reservation/*.tsx`에서 흐름 진입점 파악
2. `src/components/reservation/*`와 `date-picker/*`의 상태 전달 구조 확인
3. 필요한 경우 `src/state/modalStatus.ts` 등 공유 상태 영향 검토
4. 입력 검증/정규식 사용 시 `src/utils/regEx.ts` 재사용 우선
5. 성공/상세/체크 페이지 영향 범위 회귀 확인

### C. 공통 레이아웃/네비게이션 수정
1. `src/components/layout/{Header,Footer,SNB}.tsx` 변경
2. `src/styles/layout/*` 및 전역 `common.scss` 영향 확인
3. 모든 주요 페이지에서 레이아웃 깨짐 여부 확인

### D. 분석/SEO/메타 수정
1. GA 관련: `src/lib/gtag.tsx`, `next.config.js` 환경변수 사용 확인
2. SEO 관련: `src/utils/seo.tsx`, `public/sitemap*.xml`, `public/robots.txt` 점검
3. `_document.tsx`/`_app.tsx`에 걸린 전역 영향 검토

---

## 4) 수정 전 체크리스트 (필수)
- [ ] 변경 범위를 먼저 문서화(어떤 페이지/컴포넌트/스타일이 영향 받는지)
- [ ] 동일 기능을 수행하는 기존 함수/컴포넌트 존재 여부 확인
- [ ] 신규 문자열의 다국어 반영 필요 여부 확인
- [ ] 환경변수/외부 키 하드코딩 금지 확인

## 5) 수정 후 체크리스트 (필수)
- [ ] `yarn build`로 타입/번들 확인
- [ ] 경고가 발생하면 실제 릴리즈 리스크인지 분류(무시/후속조치)
- [ ] 변경 파일만 포함되었는지 `git diff`로 확인

---

## 6) 현재 구조에서 우선 개선 권장사항 (기술부채 관점)
- `styles` 경고(autoprefixer `start` 값 혼용) 정리 필요: 레이아웃 정렬 속성 표준화 권장.
- 예약 도메인 로직은 컴포넌트 단위로 분산되어 있어, 중장기적으로는 상태 전이(steps) 기준 모듈화가 유지보수에 유리.
- `utils`와 `components` 사이 책임 경계(도메인 로직 vs 범용 헬퍼)를 점검하면 중복 구현 위험을 줄일 수 있음.

