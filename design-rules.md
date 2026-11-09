# KBDS-PC 디자인 규칙

## 1. 적용 범위와 기준

이 문서는 PC 관리 화면을 만들 때 참조하는 재현 가능한 규칙이다. 원본 Figma 화면이 삭제되어도 아래 치수, 구조, 스타일, 컴포넌트 키와 보존 이미지로 두 패턴을 다시 구성할 수 있도록 작성했다.

- 확인일: 2026-11-09 (Asia/Seoul).
- 원본 파일: PC 디자인라이브러리 v0.96, `ftIWLlgj5Ldgt1uyQu9Gb8`.
- 원본 페이지: `Templates (작성중)`.
- [패턴 A 원본 — Case_관리_1](https://www.figma.com/design/ftIWLlgj5Ldgt1uyQu9Gb8?node-id=18182-96246): 다른금융 출금계좌 관리, 1440 × 1482.
- [패턴 B 원본 — Case_관리_2](https://www.figma.com/design/ftIWLlgj5Ldgt1uyQu9Gb8?node-id=18182-96576): 자주쓰는 계좌관리, 1440 × 1669.
- 모든 치수는 Figma 논리 px이며, 좌표는 화면 프레임 좌상단을 (0, 0)으로 한다.
- 아래 수치는 두 화면에서 확인한 관리 화면 기준이다. 다른 해상도의 반응형 동작, 최소·최대 너비, 업무 로직, 미표시 상태는 아직 정의하지 않았다.
- 새로운 지시가 있으면 해당 규칙을 이 파일에서 갱신한다. 기존 KBDS 컴포넌트·토큰·스타일을 우선 재사용한다.

### 원본 해석 시 주의

두 프레임의 HEADER/FOOTER 레이어에는 각각 “기업용헤더 X”, “기업용푸터 X”라고 명시되어 있다. GNB 인스턴스 자체는 `channel=corporate`이지만, 이 셸 전체를 최종 기업용 헤더·푸터 규격으로 확정하지 않는다. 아래 셸 치수는 이 두 예시를 재현하는 값이다.

샘플의 “총 건수 23건”, 표시 행 10개, 페이지 숫자, 계좌번호, 메뉴·인증마크·수상 문구는 예시 데이터다. 화면별 실제 기획을 적용하며 샘플 값을 업무 규칙으로 고정하지 않는다.

## 2. 공통 화면 골격

```text
Screen — 1440, Vertical, gap 0
├─ HEADER — 1440 × 159
│  ├─ GNB / Channel — 1440 × 110
│  └─ Breadcrumbs Area — 1440 × 49, padding 16 40
├─ BODY — width 1440, Vertical, padding 48 40, section gap 48
│  └─ 각 콘텐츠 영역 — width 1360
└─ FOOTER — 1440 × 352, background #FAFAFA
```

| 항목 | 기준 |
| --- | --- |
| 화면 배경 | #FFFFFF |
| 콘텐츠 좌우 여백 | 각각 40 |
| 콘텐츠 너비 | 1440 − 40 × 2 = 1360 |
| 본문 상하 패딩 | 각각 48 |
| 주요 본문 섹션 사이 | 48 |
| 본문 시작 | y=159 |
| 페이지 제목 | x=40, y=207, 높이 36, 왼쪽 정렬 |
| Breadcrumbs | x=40, y=126, 높이 17; 예시 너비 258 |
| Breadcrumbs 내부 간격 | 4; 홈 아이콘 16 × 16 |
| 본문 높이 | 콘텐츠에 따라 증가: A 971 / B 1158 |
| 푸터 위치 | 본문 다음 흐름에 배치: A y=1130 / B y=1317 |

화면과 본문은 세로 Auto Layout으로 구성한다. 전체 높이를 1482 또는 1669로 고정하는 대신, 해당 높이는 샘플 콘텐츠를 넣었을 때의 검산값으로 사용한다. 표·도구 모음 등 폭을 공유하는 요소는 동일한 콘텐츠 컨테이너에 정렬한다.

## 3. 간격·모서리·선 토큰

아래는 실제 바인딩에서 확인한 KBDS 이름과 값이다. 같은 의미의 토큰은 이름과 키를 재사용하고, 화면 재현을 위해 필요한 실측값도 유지한다.

| 토큰 | 값 |
| --- | --- |
| `spacing/2xs` | 2px |
| `spacing/xs` | 4px |
| `spacing/md` | 8px |
| `spacing/lg` | 12px |
| `spacing/xl` | 16px |
| `spacing/2xl` | 20px |
| `spacing/3xl` | 24px |
| `spacing/5xl` | 32px |

| 용도 | 실측값 |
| --- | --- |
| 화면 좌우 패딩 | 40 |
| 본문 상하·주요 섹션 간격 | 48 |
| 제목 → 다음 섹션 | 48 |
| 건수/툴바 → 표 | 20 |
| 탭 → 표 툴바 | 20 |
| 표 → 페이지네이션 또는 하단 도구 모음 | 16 |
| 툴바 버튼 사이 | 8 |
| 하단 대형 버튼 사이 | 12 |
| 표 헤더/셀 패딩 | 상하 12, 좌우 16 |
| 안내 박스 패딩 | 상하 20, 좌우 24 |
| 버튼 모서리 | `radius/2xs` = 6 |
| 안내 박스 모서리 | `radius/md` = 12 |
| 표 모서리 | 0 |
| 일반 구분선 | `stroke/md` = 1 |
| 선택 탭 하단선 | `stroke/2xl` = 3 |
| 비선택 탭 하단선 | `stroke/xl` = 2 |

일부 원본에서 0값에 `radius/(삭제대기)none`, `spacing/(삭제대기)none`이 연결되어 있었다. 이는 원본 상태 기록이며 새 화면에서 삭제 예정 토큰을 새로 확산시키지 않는다. 현재 라이브러리에 공식 대체 토큰이 있으면 그것을 사용하고, 없으면 0값의 의도를 유지한다.

## 4. 색상

| 역할 | 값 | 확인된 토큰 |
| --- | --- | --- |
| 표 상단 기준선 | #444444 | `border/neutral/secondary` |
| 표 헤더 배경 | #F2F2F2 | `surface/neutral/secondary-muted` |
| 표 헤더 구분선 | #E5E5E5 | `border/neutral/secondary-muted` |
| 표 본문 배경 | #FFFFFF | `surface/neutral/quaternary-muted` |
| 표 본문 구분선 | #EDEDED | `border/neutral/tertiary-muted` |
| 안내 박스·푸터 배경 | #FAFAFA | `surface/neutral/tertiary-muted` |
| 보조 테두리 버튼 테두리 | #A5A5A5 | `border/neutral/quaternary` |
| 대형 tertiary 버튼 배경 | #EDEDED | `surface/neutral/primary-muted` |
| 대형 primary 버튼 배경 | #FFC517 | `surface/accent/brand` |
| 선택 탭 하단선 | #1C1C1C | `border/neutral/primary` |
| 기본 텍스트 | #1C1C1C | 실측값; 이 문서에서 토큰명은 미확정 |
| 표 헤더·건수 숫자 | #444444 | 실측값 |
| 부가 설명 | #6E6E6E | 실측값 |
| 총 건수 라벨·비선택 탭·보조 정보 | #8D8D8D | 실측값 |
| 등록 상태 | #1F6AFF | 실측값 |
| 미등록 상태 | #E53838 | 실측값 |

색상 역할이 다른 로고의 노란색과 primary 버튼의 노란색을 하나로 치환하지 않는다. 화면에서 보이는 회색 버튼은 선택된 컴포넌트의 상태를 확인한다. 예를 들어 B의 “삭제”는 `tertiary, disabled=false`이며 회색이라는 이유로 비활성화 상태로 해석하지 않는다.

## 5. 서체와 텍스트

- 한글·일반 UI는 **KBFG Text**, 숫자 전용 표현은 **Pretendard**를 사용한다.
- 확인된 모든 텍스트의 자간은 0px이다.
- 두 화면의 텍스트 노드에서 누락 폰트가 없음을 확인했다.
- 스타일 이름의 숫자보다 실제 노드의 fontSize·fontName·lineHeight를 우선해 재현한다. 특히 숫자 스타일 이름은 “16”이어도 실제 적용 크기는 17px이었다.

| 역할 | 폰트·굵기 | 크기/행간 | 색상 |
| --- | --- | --- | --- |
| 페이지 제목 | KBFG Text Bold | 26/36 | #1C1C1C |
| 선택 탭 | KBFG Text Bold | 20/28 | #1C1C1C |
| 비선택 탭 | KBFG Text Medium | 20/28 | #8D8D8D |
| GNB 1depth 메뉴 | KBFG Text Light | 16/24 | #6E6E6E |
| 표 헤더 | KBFG Text Medium | 14/20 | #444444 |
| 표 일반 셀·안내 문구 | KBFG Text Light | 14/20 | #1C1C1C |
| 표 숫자·계좌번호·전화번호 | Pretendard Light | 14/20 | #1C1C1C |
| 소형 버튼 | KBFG Text Bold | 14/20 | #1C1C1C |
| 총 건수 라벨 | KBFG Text Medium | 14/20 | #8D8D8D |
| 건수 숫자 | Pretendard SemiBold | 17/24 | #444444 |
| 건수 단위 “건” | KBFG Text Bold | 14/20 | #444444 |
| 페이지네이션 숫자 | Pretendard Regular | 17/24 | #1C1C1C |
| 하단 대형 버튼 | KBFG Text Bold | 18/25 | #1C1C1C |
| Breadcrumbs·푸터 메뉴 | KBFG Text Medium | 12/17 | 경로·위계에 따라 #8D8D8D / #1C1C1C |
| 푸터 회사 정보·저작권 | KBFG Text Light | 12/17 | #8D8D8D |
| 푸터 수상 예시 문구 | KBFG Text Light | 10/17 | #6E6E6E |

### 원본 텍스트 스타일 참조

아래 키는 스타일 이름 변경에 대비한 식별자다. 동일 서체 조합은 한 번만 표기했다.

| 스타일 이름 | 실제 폰트 | 실제 크기/행간 | 스타일 키 |
| --- | --- | --- | --- |
| Body/sm∙12∙Bold | KBFG Text Bold | 12/17 | `0732942051555a505388ecfd863af5b2470233ec` |
| Body/sm∙12∙Medium | KBFG Text Medium | 12/17 | `8ab464b691ced29baba9a313a25b651557b4ceb1` |
| Title/2xl∙20∙Bold | KBFG Text Bold | 20/28 | `6bc0e73b9a53e3e789e9a4cb084fdb79305628fc` |
| Title/lg∙16∙Light | KBFG Text Light | 16/24 | `fe23238368709f96a138720fda60bc6c369ae4db` |
| Display/5xl∙26∙Bold | KBFG Text Bold | 26/36 | `d15c6618112f25fafd120d9f66e7ccf3031da65d` |
| Body/md∙14∙Medium | KBFG Text Medium | 14/20 | `f5f81baf6718bb904b4793a0ecf70ff694044489` |
| Title/Numeric/2️⃣ lg∙16∙Bold | Pretendard SemiBold | 17/24 | `8b7acf18fb401cac008995792d7e76e36b2a9a5a` |
| Body/md∙14∙Bold | KBFG Text Bold | 14/20 | `fd29c6c3e60f91d214e519fc9a48bdb7bca2741a` |
| Body/Numeric/2️⃣ md∙14∙Light | Pretendard Light | 14/20 | `6222681f115880fd5a105b9ed09adb4d4e9a716b` |
| Body/md∙14∙Light | KBFG Text Light | 14/20 | `9425756dd9ccef22a21ae16afc4879e5258e1bf5` |
| Title/Numeric/2️⃣ lg∙16∙Medium | Pretendard Regular | 17/24 | `93a7b5aa0f729abc2301d0bef024187938380a71` |
| Body/sm∙12∙Light | KBFG Text Light | 12/17 | `638481398c8d9dd67579f830b9eb404dd92c6cf9` |
| 직접 지정 | KBFG Text Light | 10/17 | `없음` |
| Title/2xl∙20∙Medium | KBFG Text Medium | 20/28 | `fb7e580aeac1e188465d5d6bd2ce0e6ea675cc3b` |
| Title/xl∙18∙Bold | KBFG Text Bold | 18/25 | `dc7937a908f83807e5440ccdc445a257a5cc3c64` |

## 6. 표 공통 규칙

- `Table / Header`, `Table / Cell` 인스턴스를 사용한다. 마지막 열은 `variant=last`로 오른쪽 경계선을 제거한다.
- 숫자 전용 셀에는 `onlyNumber=true` 변형을 사용한다. 셀의 텍스트를 전부 Pretendard로 바꾸지 않는다.
- 표 상단은 #444444 1px 선이다. 헤더는 #F2F2F2 배경과 #E5E5E5 구분선, 본문은 #FFFFFF 배경과 #EDEDED 구분선을 사용한다.
- 원본의 헤더·셀 콘텐츠는 수평·수직 가운데 정렬이며 셀 패딩은 상하 12, 좌우 16이다.
- 표는 Figma Grid로 구성하며 열 사이 추가 gap은 0이다. 같은 열의 헤더와 본문 너비를 동일하게 유지한다.
- border가 없는 프레임에도 API의 기본 strokeWeight=1이 나올 수 있다. 실제 strokes가 비어 있는 프레임에 임의 테두리를 추가하지 않는다.

## 7. 패턴 A — 기본 목록·행별 조작형

### 배치

```text
BODY: padding 48 40, gap 48
├─ Title / Page: “다른금융 출금계좌 관리”, 1360 × 36
└─ ListSection: Vertical, gap 16
   ├─ Amount / Table: Vertical, gap 20
   │  ├─ Amount: 1360 × 24, 내부 gap 4
   │  └─ Table Grid: 1360 × 695
   └─ Pagination / Basic: 1360 × 36
```

| 요소 | x | y | 너비 | 높이 |
| --- | --- | --- | --- | --- |
| 페이지 제목 | 40 | 207 | 1360 | 36 |
| 총 건수 영역 | 40 | 291 | 1360 | 24 |
| 표 | 40 | 335 | 1360 | 695 |
| 페이지네이션 | 40 | 1046 | 1360 | 36 |
| 푸터 시작 | 0 | 1130 | 1440 | 352 |

### 열 구성

| 순서 | 헤더 | 너비 | 콘텐츠/정렬 |
| --- | --- | --- | --- |
| 1 | NO | 80 | 숫자, 가운데 |
| 2 | 기관명 | (1360 − 440) / 3 ≈ 306.667 | 일반 텍스트, 가운데 |
| 3 | 계좌번호 | ≈ 306.667 | 숫자 전용 셀, 가운데 |
| 4 | 계좌명(별명) | ≈ 306.667 | 일반 텍스트, 가운데 |
| 5 | 상태 | 180 | 등록/미등록 텍스트, 가운데 |
| 6 | 출금등록/해제 | 180 | 행별 BoxButton, 가운데 |

- 표 헤더의 실측 높이는 45px이다.
- 본문은 10행이다. 원본 첫 행은 64px, 이후 9행은 각각 65px로 측정되었다. 상단선 1 + 헤더 45 + 본문 649 = 전체 695px이다. 이 차이를 임의의 “모든 행은 65px” 규칙으로 숨기지 않는다.
- 행 안의 등록/해제 버튼은 `BoxButton secondary small`, 50 × 40, radius 6이다.
- “등록” 상태는 #1F6AFF, “미등록”은 #E53838이다. 상태 텍스트와 버튼 라벨을 함께 표시한다.
- 샘플에서 등록 상태의 버튼은 “해제”, 미등록 상태의 버튼은 “등록”이다. 실제 클릭 결과·확인 절차는 별도 업무 기획을 따른다.
- 총 건수는 “총 건수” 라벨과 숫자·단위를 구분한다. 바깥 수평 gap은 4px이다.
- 페이지네이션은 중앙 정렬, 높이 36이다. 앞/뒤 이동 그룹은 각각 56 × 24, 가운데 숫자 슬롯은 360 × 36, 그룹 사이 간격은 32이다. 샘플 숫자는 1~10이다.

## 8. 패턴 B — 안내·탭·다중 선택·하단 실행형

### 배치

```text
BODY: padding 48 40, gap 48
├─ Title / Page: “자주쓰는 계좌관리”, 1360 × 36
├─ Infobox / FullWidth: 1360 × 90
├─ ListSection: Vertical, gap 20
│  ├─ Tab: 1360 × 60
│  └─ Table / Button: Vertical, gap 20
│     ├─ Amount / Button Group: 1360 × 40
│     └─ TableSection: Vertical, gap 16
│        ├─ Table Grid: 1360 × 540
│        └─ 하단 도구 모음: 1360 × 40
└─ ButtonContainer: 1360 × 56, 가운데 정렬
   └─ ButtonGroup: 320 × 56, 실제 버튼 사이 gap 12
```

| 요소 | x | y | 너비 | 높이 |
| --- | --- | --- | --- | --- |
| 페이지 제목 | 40 | 207 | 1360 | 36 |
| 안내 박스 | 40 | 291 | 1360 | 90 |
| 탭 | 40 | 429 | 1360 | 60 |
| 총 건수·상단 버튼 모음 | 40 | 509 | 1360 | 40 |
| 표 | 40 | 569 | 1360 | 540 |
| 표 하단 도구 모음 | 40 | 1125 | 1360 | 40 |
| 하단 실행 버튼 | 560 | 1213 | 320 | 56 |
| 푸터 시작 | 0 | 1317 | 1440 | 352 |

### 안내 박스

- `Infobox / FullWidth`, 배경 #FAFAFA, radius 12, 실제 테두리 없음.
- 패딩 20 24, 내부 콘텐츠 너비 1312, 샘플 콘텐츠 높이 50.
- 컴포넌트 바깥 스택 itemSpacing=12, 내부 Contents 프레임 itemSpacing=8이다. 서로 다른 레벨의 간격을 혼동하지 않는다.
- 샘플은 불릿 문장 두 개다. 원본 문장은 마커 사용 설명용 예문이므로 실제 화면 안내 문구로 그대로 채택하지 않는다.
- 안내 텍스트는 KBFG Text Light 14/20이다.

### 탭과 상단 도구 모음

- `Tab variant=1depth, extendable=true`를 사용한다.
- 선택 탭: “자주쓰는 계좌 목록”, 181 × 60, Bold 20/28, #1C1C1C, 하단선 3px.
- 비선택 탭: “자주쓰는 계좌 등록”, 176 × 60, Medium 20/28, #8D8D8D, 하단선 #E5E5E5 2px.
- 탭 아이템은 상하 패딩 16이며 전체 탭 바는 콘텐츠 폭 1360을 사용한다. 아이템 너비는 두 라벨의 실측값이므로 다른 문구에 기계적으로 고정하지 않는다.
- 표 상단 40px 도구 모음에서 총 건수는 왼쪽 아래에 정렬한다. 샘플 건수 영역은 x=40, y=525, 높이 24이다.
- 오른쪽 버튼 모음은 388 × 40, 내부 간격 8이다: 계좌순서변경 120 × 40 → 계좌그룹관리 100 × 40 → 그룹 전체 선택필드 152 × 40.
- 건수 영역과 오른쪽 그룹 사이의 상위 gap은 20이다. 두 그룹을 고정 좌표로 분리하기보다 공통 가로 컨테이너에서 정렬한다.

### 열 구성과 선택 컨트롤

| 순서 | 원본 헤더/역할 | 너비 |
| --- | --- | --- |
| 1 | 전체/행 선택 체크박스 | 80 |
| 2 | 기관명 | 120 |
| 3 | 그룹명 | (1360 − 200) / 6 ≈ 193.333 |
| 4 | 금융기관명 | ≈ 193.333 |
| 5 | 계좌번호 | ≈ 193.333 |
| 6 | 출금등록/해제 | ≈ 193.333 |
| 7 | 휴대폰 번호 | ≈ 193.333 |
| 8 | 작성한 내용 노출 | ≈ 193.333 |

- 헤더와 본문 10행의 실측 높이는 모두 49이다. 상단선 1 + 49 × 11 = 전체 540이다.
- 선택 체크박스는 24 × 24이며 첫 열 가운데에 배치한다. 확인된 변형은 `size=large, fontWeight=bold, checked=false, disabled=false, indeterminate=false, invalid=false`이다.
- 체크박스가 회색으로 보이더라도 checked/disabled 상태는 변형 속성으로 판단한다.
- 원본 2열 헤더는 “기관명”이지만 셀에는 1~10이 들어간다. 원본 6열 헤더는 “출금등록/해제”지만 셀에는 계좌명 예문이 들어간다. 이는 템플릿의 의미 불일치로 기록한다. 새 화면에서는 업무 기획에 맞게 헤더와 데이터를 일치시키며 이 샘플 조합을 업무 규칙으로 복제하지 않는다.
- 계좌번호와 휴대폰 번호에는 숫자 전용 셀을 사용한다.

### 표 하단 도구 모음과 실행 버튼

- 표와 도구 모음 간격은 16이다. 도구 모음은 1360 × 40, 좌우 그룹을 `SPACE_BETWEEN`으로 정렬한다.
- 왼쪽: 필터·검색·편집 `TextButton primary small`, 각 43 × 20, 버튼 간격 16, 아이콘 16 × 16.
- 오른쪽: “다중선택 그룹변경” 라벨 103 × 20 → 선택필드 120 × 40 → 이동 버튼 50 × 40. 내부 간격은 8, 전체 너비는 289이다.
- 하단 실행 섹션은 위 도구 모음 이후 48px에 배치한다.
- 가운데 `ButtonGroup count=multi, size=large`: 전체 320 × 56, 각 버튼 154 × 56, 버튼 사이 12.
- “삭제”: `BoxButton tertiary large`, 배경 #EDEDED, disabled=false.
- “수정”: `BoxButton primary large`, 배경 #FFC517, disabled=false.
- 두 버튼 모두 radius 6, KBFG Text Bold 18/25, 텍스트 #1C1C1C이다.
- 바깥 ButtonGroup의 gap=0만 보고 버튼을 붙이지 않는다. 실제 간격은 내부 `Slot-Button`의 gap=12에 정의되어 있다.

## 9. 공통 푸터의 예시 구조

- 배경 #FAFAFA, 높이 352, 위아래 실측 여백 48.
- 실제 콘텐츠 x=40, 너비 1360; 내부 콘텐츠 총 높이 256.
- 회사 정책 링크·회사 정보 묶음 91 → 20 간격 → 선택필드/상담/SNS 행 40 → 20 간격 → 인증·수상 마크 행 48 → 20 간격 → 저작권 행 17.
- 링크 행의 내부 간격은 8, 마크 왼쪽 그룹은 28, 오른쪽 그룹은 8이다.
- 푸터 프레임 패딩과 내부 컨테이너 패딩을 합산해 좌우 80px을 만들지 않는다. 원본의 유효 콘텐츠 시작은 x=40이다.
- 실제 기업용 푸터 확정 전까지 이 구조는 샘플 셸로 취급한다. 샘플 이미지 플레이스홀더·수상 예문을 공식 정보로 간주하지 않는다.

## 10. 컴포넌트 재사용 식별자

원본 화면의 자식 노드 ID보다 **main component key**를 우선 사용한다. 화면 프레임이 삭제되어도 라이브러리 컴포넌트가 유지되면 아래 키로 가져올 수 있다. 키 조회가 실패하면 컴포넌트 자체가 삭제·미게시·접근 불가한 상태인지 확인하고, 임의로 같은 이름의 다른 버전으로 교체하지 않는다.

Figma Plugin API에서 가져올 때: `await figma.importComponentByKeyAsync(key)` 후 `createInstance()`. 화면의 업무 콘텐츠는 인스턴스의 텍스트·슬롯·속성으로 설정하며 기존 컴포넌트를 불필요하게 detach하지 않는다.

| 컴포넌트 | 확인한 변형 | main component key |
| --- | --- | --- |
| GNB / Channel | `channel=corporate` | `a1805a20b85dea4155db23d9ff5bd2ece9a61386` |
| Title / Page | `align=left` | `366007b354df25708d9dce4a7788c2b44e30dba3` |
| Infobox / FullWidth | `Infobox / FullWidth` | `5fb7ce75dbc07c0aeca6e8cd5bfb876c0d0f7892` |
| Tab | `variant=1depth, extendable=true` | `53915edb5ada4215a859be5fca8d36a7e113c881` |
| Item / Tab | `variant=1depth, selected=true` | `4f00a95817bd55bdfb610f0d15c078b24108bbfc` |
| Item / Tab | `variant=1depth, selected=false` | `67b8685071f7188072054a7983fa5d828838205f` |
| Table / Header | `variant=default, onlyNumber=false` | `ba105a8f29acb712e5c5aa6a3cb2015de330f392` |
| Table / Header | `variant=last, onlyNumber=false` | `7b9fe1d8909362be16cea30e295258ba7a099d55` |
| Table / Cell | `variant=default, onlyNumber=false` | `99ea32176b75cd8c61852334027aea5149d926a5` |
| Table / Cell | `variant=default, onlyNumber=true` | `344a92f1499d52f34343a05da003acb2ef07ac87` |
| Table / Cell | `variant=last, onlyNumber=false` | `1b5a0ae0fefd157325271672a78224db2575f047` |
| CheckBox | `size=large, fontWeight=bold, checked=false, disabled=false, indeterminate=false, invalid=false` | `50a2ddb9717f6061eaae8aecea2b2e6ea9f48201` |
| BoxButton | `variant=secondary, size=small, hover=false, disabled=false, pressed=false` | `b20b82eee273f930c668788109e73de668023c03` |
| InputField | `hover=false, focused=false, disabled=false, entered=false, error=false` | `6a180f941f7bc12168489ec44f9203d0f3a4e7cc` |
| TextButton | `variant=primary, size=small, hover=false, disabled=false, pressed=false` | `95687195c8b0873f0e13393cf059964ecfde2604` |
| Pagination / Basic | `variant=default` | `13fdebbc05101067ac4c6cad5d74f38fd6c3af7f` |
| ButtonGroup | `count=multi, size=large` | `f6fbbaad278bc5dc3e0568efdc16711894a01e47` |
| BoxButton | `variant=tertiary, size=large, hover=false, disabled=false, pressed=false` | `44749aad1a2b8b103e2068161e6058a3ee80a0a6` |
| BoxButton | `variant=primary, size=large, hover=false, disabled=false, pressed=false` | `d206f834d8d80e5bd6ab306b8033f3c0e5214bc5` |

위 표의 BoxButton은 본문에서 확인한 현재 인스턴스의 키다. 헤더 안에는 다른 레거시 BoxButton도 존재하므로 이름만으로 본문 버튼을 대체하지 않는다. `onlyNumber=true`는 실제 숫자 셀에 사용하며, 마지막 열의 경계 처리는 `variant=last`로 적용한다.

## 11. 보존 이미지와 재현 검수

두 이미지는 원본을 확인한 시점의 스냅샷이며, 링크 만료에 의존하지 않도록 저장소의 상대 경로로 보존한다. 이미지는 Figma MCP가 리사이즈한 PNG다. A는 995 × 1024, B는 884 × 1024이므로 이미지 픽셀을 다시 재어 위 논리 px 수치를 덮어쓰지 않는다.

### 패턴 A

![Case 관리 1 — 다른금융 출금계좌 관리](assets/design-rules/case-management-1.png)

### 패턴 B

![Case 관리 2 — 자주쓰는 계좌관리](assets/design-rules/case-management-2.png)

### 재현 시 확인할 항목

1. 1440 기준 콘텐츠 너비 1360, 좌우 40, 본문 상하 48, 주요 섹션 gap 48을 유지한다.
2. A는 제목·건수·6열 표·페이지네이션, B는 제목·안내·탭·툴바·8열 표·보조 조작·대형 버튼 순서를 유지한다.
3. 표 열 너비의 합이 1360이며 헤더와 본문의 열 경계가 일치하는지 확인한다. 306.667/193.333을 정수로 각각 반올림해 누적 오차를 만들지 않는다.
4. KBFG Text와 Pretendard의 용도, 실제 크기·행간·자간을 확인한다. 누락 폰트·텍스트 잘림·겹침을 검사한다.
5. 간격이 슬롯 내부에 정의된 경우까지 확인한다. 색상만으로 체크박스·버튼의 상태를 추측하지 않는다.
6. 구조·서체·화면 검수가 통과하면 같은 검수를 불필요하게 반복하지 않는다.

## 12. 레이어 명명 및 그룹핑 규칙

이 절은 사용자 정의 레이어·그룹·Auto Layout 래퍼를 정리할 때 적용한다. 2·7·8장의 트리는 실측 구조를 설명하기 위한 표기이며, 사용자 정의 레이어의 최종 이름은 본 절을 따른다. 디자인 시스템 컴포넌트의 원형 이름과 내부 고유 계층은 유지한다.

### 12.1. 기본 원칙

- 사용자 정의 레이어·그룹 이름은 역할을 알 수 있는 영문으로 작성한다.
- 디자인 시스템 컴포넌트의 원형 이름과 내부 고유 계층은 유지한다.
- 관련 항목은 실제 Auto Layout으로 묶는다. 이름만 Group으로 변경하지 않는다.

### 12.2. 화면의 기본 영역

일반 화면은 다음 영역으로 구분한다.

```text
화면
├─ ## HEADER
├─ ## BODY
└─ ## FOOTER
```

Popup 컴포넌트 내부 영역명은 `Header`, `Body`, `Footer`를 사용한다.

### 12.3. Container 명명

- 본문 Container가 하나이면 `Container`로 명명한다.
- 복수이면 위에서부터 `Container 1`, `Container 2`, `Container 3`으로 명명한다.
- 개별 Slot 안에서도 동일한 기준을 적용한다.
- 다른 화면이나 다른 Slot의 Container 개수는 합산하지 않는다.
- 기존 화면 정리 시 Container의 개수·부모·순서·역할 분할을 임의로 변경하지 않는다.

```text
## BODY
├─ Container 1
├─ Container 2
└─ Container 3
```

### 12.4. 동일 항목의 반복

같은 종류·역할의 항목이 복수로 반복되면 실제 Auto Layout으로 묶고 `[명칭] Group`으로 명명한다.

```text
InputField Group
├─ InputField
├─ InputField
└─ InputField
```

예:

- Text Group
- TextList Group
- InputField Group
- DataList Group
- Card Group
- Data Block Group
- Accordion Group
- Radio Group
- Checkbox Group

반복 자식은 원래 이름을 유지한다.
`InputField 1`, `InputField 2`처럼 순번을 붙이지 않는다.
페이지 Container의 순번 규칙은 예외다.

### 12.5. 단일 항목의 래퍼

단일 항목을 배치 목적으로 감싸는 경우 Group을 붙이지 않고 해당 명칭을 사용한다.

```text
InputField
└─ InputField
```

바깥은 Auto Layout 래퍼, 안쪽은 실제 컴포넌트다.

### 12.6. 서로 다른 두 요소의 결합

실제 구성 요소의 대표 명칭을 `/`로 연결한다.

| 자식 구성 | 부모 이름 |
| --- | --- |
| Title / Page + InputField | Title / InputField |
| Title / Section + InputField Group | Title / InputField Group |
| Title / Section + List Group | Title / List Group |
| Title / Element + Text | Title / Text |
| InputField Group + Button Area | InputField Group / Button Area |
| Card Group + Button Area | Card Group / Button Area |
| Text + TextList Group | Text / TextList Group |

- `Title / Page`, `Title / Section` 등의 세부 유형은 조합명에서 대표 명칭인 `Title`로 정리한다.
- `Group`, `Button Area`처럼 실제 역할을 나타내는 명칭은 보존한다.

### 12.7. 여러 종류의 콘텐츠 결합

서로 다른 세 덩이 이상을 묶으면 `[첫 요소의 대표 명칭] / Contents`로 명명한다.

```text
Title / Contents
├─ Title / Page
├─ InputField Group
└─ Accordion
```

제목과 복합 본문이 결합된 경우에도 `Title / Contents`를 사용한다.

```text
Title / Contents
├─ Title / Section
└─ Text / TextList Group
```

복수의 제목·콘텐츠 조합을 아우르는 상위 래퍼도 `Title / Contents`로 명명한다.

```text
Title / Contents
├─ Title / Accordion Group
└─ Title / Accordion Group
```

상위와 하위를 모두 `Title / Accordion Group`으로 중첩 명명하지 않는다.

### 12.8. Text와 TextList 구분

단일 일반 본문:

```text
Text
└─ Content
```

복수 일반 본문:

```text
Text Group
├─ Text
│  └─ Content
└─ Text
   └─ Content
```

복수 TextList:

```text
TextList Group
├─ TextList / Unordered
└─ TextList / Unordered
```

Text와 복수 TextList의 혼합:

```text
Title / Contents
├─ Title / Element
└─ Text / TextList Group
   ├─ Text
   │  └─ Content
   └─ TextList Group
      ├─ TextList / Unordered
      └─ TextList / Unordered
```

- 일반 Text만 반복되는 그룹을 TextList Group으로 명명하지 않는다.
- Text와 TextList가 섞인 본문 전체를 TextList Group으로 명명하지 않는다.
- 자식 구성이 혼합 본문으로 바뀌면 상위의 기존 `Title / TextList Group`도 `Title / Contents`로 변경한다.

### 12.9. 버튼 영역

본문의 독립 버튼 영역은 `Button Area`로 명명한다.

```text
InputField Group / Button Area
├─ InputField Group
│  ├─ InputField
│  └─ InputField
└─ Button Area
   └─ BoxButton
```

### 12.10. Tab·Segment·Chip

- Tab과 후속 콘텐츠를 반드시 하나의 그룹으로 묶는 의무는 없다.
- 기존 Tab 그룹은 필요에 따라 유지할 수 있다.
- Segment·Chip은 후속 콘텐츠와 실제 Auto Layout으로 묶고 구성에 맞게 명명한다.
- 이를 이유로 기존 Container를 임의로 병합하거나 분할하지 않는다.

### 12.11. 구조 변경 후 이름 재판정

- 자식 추가·삭제·교체·그룹핑 후 해당 래퍼와 영향을 받는 부모 이름을 다시 확인한다.
- 이름은 과거 구성이 아닌 현재의 실제 자식 구성을 반영해야 한다.
- 반복 그룹인지, 두 요소의 결합인지, 복합 Contents인지 순서대로 판정한다.
