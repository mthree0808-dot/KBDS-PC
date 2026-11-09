# KBDS-PC 디자인 규칙

## 1. 적용 범위와 기준

이 문서는 PC 화면을 만들 때 참조하는 재현 가능한 규칙이다. 초기 관리형 A·B에 더해 입력·동의·집중형·완료·에러 패턴 C~G는 14~20장, 팝업 패턴 H~J는 21~24장, 한도계좌 해제 패턴 K·L은 25~27장, 1920 약관·목록 패턴 M~O는 28~31장, 파일 업로드 P·Q와 로그아웃 추가 참조는 32~35장, 가입 단계 안내 R·S는 36~39장, 비대면 가입 카드형 T는 40장에 기록한다. 원본 Figma 화면이 삭제되어도 아래 치수, 구조, 스타일, 컴포넌트 키와 보존 이미지로 두 패턴을 다시 구성할 수 있도록 작성했다.

- 확인일: 2026-11-09 (Asia/Seoul).
- 원본 파일: PC 디자인라이브러리 v0.96, `ftIWLlgj5Ldgt1uyQu9Gb8`.
- [디자인 시스템 기준 경로](https://www.figma.com/design/ftIWLlgj5Ldgt1uyQu9Gb8?node-id=0-1): PC 디자인라이브러리 v0.96. 화면 생성 시 이 파일의 컴포넌트·토큰·스타일을 우선 사용한다.
- [필수 Footer 컴포넌트](https://www.figma.com/design/ftIWLlgj5Ldgt1uyQu9Gb8?node-id=2920-38417): 새 화면에는 학습 화면의 푸터 구성 방식과 관계없이 이 컴포넌트의 인스턴스를 사용한다. 상세 기준은 13장을 따른다.
- 원본 페이지: `Templates (작성중)`.
- [패턴 A 원본 — Case_관리_1](https://www.figma.com/design/ftIWLlgj5Ldgt1uyQu9Gb8?node-id=18182-96246): 다른금융 출금계좌 관리, 1440 × 1482.
- [패턴 B 원본 — Case_관리_2](https://www.figma.com/design/ftIWLlgj5Ldgt1uyQu9Gb8?node-id=18182-96576): 자주쓰는 계좌관리, 1440 × 1669.
- 모든 치수는 Figma 논리 px이며, 좌표는 화면 프레임 좌상단을 (0, 0)으로 한다.
- 아래 수치는 두 화면에서 확인한 관리 화면 기준이다. 다른 해상도의 반응형 동작, 최소·최대 너비, 업무 로직, 미표시 상태는 아직 정의하지 않았다.
- 새로운 지시가 있으면 해당 규칙을 이 파일에서 갱신한다. 기존 KBDS 컴포넌트·토큰·스타일을 우선 재사용한다.

### 원본 해석 시 주의

두 프레임의 HEADER/FOOTER 레이어에는 각각 “기업용헤더 X”, “기업용푸터 X”라고 명시되어 있다. GNB 인스턴스 자체는 `channel=corporate`이지만, 이 셸 전체를 최종 기업용 헤더·푸터 규격으로 확정하지 않는다. 아래 셸 치수는 이 두 예시를 재현하는 값이다. 다만 새 화면 생성 시 Footer의 구현 방식은 13장의 지정 컴포넌트 사용 규칙을 우선 적용한다.

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
- A·B 목록형 표의 헤더·셀 콘텐츠는 수평·수직 가운데 정렬이며 셀 패딩은 상하 12, 좌우 16이다. C·E·F 정보/입력 표는 왼쪽·수직 가운데 정렬을 사용하며, 구체적인 기준은 14~18장을 따른다.
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

이 절은 학습 화면에서 측정한 배치 기록이다. 새 화면에서는 아래 구조를 일반 프레임·텍스트로 다시 조립하지 않고, 13장의 지정 Footer 컴포넌트 인스턴스를 사용한다.

- 배경 #FAFAFA, 높이 352, 위아래 실측 여백 48.
- 실제 콘텐츠 x=40, 너비 1360; 내부 콘텐츠 총 높이 256.
- 회사 정책 링크·회사 정보 묶음 91 → 20 간격 → 선택필드/상담/SNS 행 40 → 20 간격 → 인증·수상 마크 행 48 → 20 간격 → 저작권 행 17.
- 링크 행의 내부 간격은 8, 마크 왼쪽 그룹은 28, 오른쪽 그룹은 8이다.
- 푸터 프레임 패딩과 내부 컨테이너 패딩을 합산해 좌우 80px을 만들지 않는다. 원본의 유효 콘텐츠 시작은 x=40이다.
- 샘플 셸의 이미지 플레이스홀더·수상 예문을 공식 정보로 간주하지 않는다. 새 화면의 Footer는 학습 화면의 일반 레이어를 복사하지 않고 지정 컴포넌트로 배치한다.

## 10. 컴포넌트 재사용 식별자

원본 화면의 자식 노드 ID보다 **main component key**를 우선 사용한다. 화면 프레임이 삭제되어도 라이브러리 컴포넌트가 유지되면 아래 키로 가져올 수 있다. 키 조회가 실패하면 컴포넌트 자체가 삭제·미게시·접근 불가한 상태인지 확인하고, 임의로 같은 이름의 다른 버전으로 교체하지 않는다.

Figma Plugin API에서 가져올 때: `await figma.importComponentByKeyAsync(key)` 후 `createInstance()`. 화면의 업무 콘텐츠는 인스턴스의 텍스트·슬롯·속성으로 설정하며 기존 컴포넌트를 불필요하게 detach하지 않는다.

| 컴포넌트 | 확인한 변형 | main component key |
| --- | --- | --- |
| Footer | `variant=default` | `bb4b7042c4ccc5742c5d51c3f5460ffec409ab63` |
| Footer | `variant=compact` | `2a1bb8e301dd46cf51d5ea4deefca130b3d9dd8d` |
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

## 13. 디자인 시스템 기준 경로 및 Footer 필수 적용

### 13.1. 디자인 시스템 기준

- [PC 디자인라이브러리 v0.96](https://www.figma.com/design/ftIWLlgj5Ldgt1uyQu9Gb8?node-id=0-1)을 화면 생성에 사용할 디자인 시스템 기준으로 삼는다.
- 파일 키: `ftIWLlgj5Ldgt1uyQu9Gb8`, 기준 링크 노드: `0:1`.
- 컴포넌트·토큰·스타일은 이 디자인 시스템에서 재사용한다. 원형 이름과 내부 고유 계층은 유지한다.

### 13.2. Footer 식별자

[지정 Footer 원본](https://www.figma.com/design/ftIWLlgj5Ldgt1uyQu9Gb8?node-id=2920-38417)은 `Footer` 컴포넌트 세트다.

| 항목 | 확인값 |
| --- | --- |
| 파일 키 | `ftIWLlgj5Ldgt1uyQu9Gb8` |
| 페이지 | `C01. Navigation` |
| 컴포넌트 세트 이름 | `Footer` |
| 컴포넌트 세트 노드 | `2920:38417` |
| 컴포넌트 세트 키 | `014c29b758d4bd381c8273f972a4c347fffabc54` |

| 변형 | 원형 노드 | main component key | 원형 크기 |
| --- | --- | --- | --- |
| `variant=default` | `2920:37863` | `bb4b7042c4ccc5742c5d51c3f5460ffec409ab63` | 1920 × 352 |
| `variant=compact` | `2989:115415` | `2a1bb8e301dd46cf51d5ea4deefca130b3d9dd8d` | 1920 × 68 |

원본 상위 섹션 이름은 확인 시점에 `04 Footer(미확정)`이었다. 이는 라이브러리의 상태 표기이며, 화면 생성 시 이 Footer를 사용하라는 사용자 지정은 그대로 적용한다.

### 13.3. 화면 생성 시 적용 규칙

- **학습·참고 화면의 Footer가 컴포넌트가 아닌 일반 레이어로 구성되어 있어도, 새 화면에는 반드시 지정 Footer 컴포넌트의 인스턴스를 넣는다.**
- 학습 화면은 본문 패턴·간격 등 재현에 필요한 기준으로 사용한다. 학습 화면의 푸터를 일반 프레임·그룹·텍스트 묶음으로 복사하거나 다시 그리지 않는다.
- 별도의 compact 지정이 없으면 `variant=default`를 사용한다. compact 요청 시 같은 Footer 세트의 `variant=compact`를 사용한다.
- 화면의 `## FOOTER` 영역 안에 Footer 인스턴스를 배치한다. 바깥 영역은 Auto Layout으로 구성하고 내부 인스턴스의 원형 이름 `Footer`와 내부 계층을 유지한다.
- 본문 다음의 세로 흐름에 배치한다. 인스턴스 너비는 화면 너비에 맞추되, 원형 1920px 너비를 이유로 1440px 화면 밖으로 넘치게 두거나 전체를 비례 축소하지 않는다.
- Footer 내부의 패딩·Auto Layout·슬롯·토큰을 유지한다. 바깥 `## FOOTER`에 같은 패딩을 중복 적용해 여백을 늘리지 않는다.
- 컴포넌트를 detach하지 않는다. 필요한 콘텐츠 조정은 제공된 속성·슬롯·인스턴스 오버라이드를 사용한다.
- 키로 원형을 가져오거나 원본 컴포넌트에서 인스턴스를 생성한다. 실제 `mainComponent` 연결이 위 식별자와 맞는지 확인한다. 이름만 Footer인 일반 프레임으로 대체하지 않는다.
- 2·7·8·9장의 푸터 실측값과 과거 예시가 구현 방식을 달리 보여도 **본 절의 지정 컴포넌트 사용 규칙을 우선한다**. 푸터 높이가 다른 변형을 쓰면 전체 화면 높이는 본문과 푸터의 실제 흐름에 맞춰 계산한다.
- 생성 후 컴포넌트 연결, 선택한 변형, 화면 너비에 대한 배치, 중복 패딩, 텍스트 잘림·누락 폰트를 검수한다.

```text
Screen
├─ ## HEADER
├─ ## BODY
└─ ## FOOTER
   └─ Footer  [INSTANCE, variant=default]
```

위 트리의 대괄호는 노드 유형·변형을 설명하는 주석이며 실제 레이어 이름에 덧붙이지 않는다.

## 14. 추가 학습 자료와 적용 범위

2026-11-09에 추가 확인한 5개 패턴을 C~G로 기록한다. 처음 받은 브랜치 5개와 사고신고 파일의 3개, 총 8개 참조를 아래에 연결한다. 사고신고 파일의 집중형·완료·에러는 앞서 확인한 브랜치의 대응 화면과 배치가 같지만, 일부 로컬 컴포넌트 키는 다르다.

| 패턴 | 학습 원본 | 대응 브랜치 원본 |
| --- | --- | --- |
| C — 비밀번호 신규/변경 | [브랜치 18182:97027](https://www.figma.com/design/ftIWLlgj5Ldgt1uyQu9Gb8/branch/GDnwWiuiGzIZA734GOm3Yr?node-id=18182-97027) | 동일 |
| D — 등록·서비스 동의 | [브랜치 18182:97229](https://www.figma.com/design/ftIWLlgj5Ldgt1uyQu9Gb8/branch/GDnwWiuiGzIZA734GOm3Yr?node-id=18182-97229) | 동일 |
| E — 가입 집중형 | [사고신고 5067:3967](https://www.figma.com/design/yojs1BhPrWxLmDDrpg1ihD?node-id=5067-3967) | [18182:97358](https://www.figma.com/design/ftIWLlgj5Ldgt1uyQu9Gb8/branch/GDnwWiuiGzIZA734GOm3Yr?node-id=18182-97358) |
| F — 완료 | [사고신고 5067:4217](https://www.figma.com/design/yojs1BhPrWxLmDDrpg1ihD?node-id=5067-4217) | [18182:97578](https://www.figma.com/design/ftIWLlgj5Ldgt1uyQu9Gb8/branch/GDnwWiuiGzIZA734GOm3Yr?node-id=18182-97578) |
| G — 에러 | [사고신고 5067:4387](https://www.figma.com/design/yojs1BhPrWxLmDDrpg1ihD?node-id=5067-4387) | [18182:97728](https://www.figma.com/design/ftIWLlgj5Ldgt1uyQu9Gb8/branch/GDnwWiuiGzIZA734GOm3Yr?node-id=18182-97728) |

- C·D 출처: 원본 파일 키 `ftIWLlgj5Ldgt1uyQu9Gb8`, 브랜치 키 `GDnwWiuiGzIZA734GOm3Yr`, 페이지 `Templates (작성중)` (`15115:110263`).
- E·F·G 추가 출처: 파일 `05. 사고신고`, 파일 키 `yojs1BhPrWxLmDDrpg1ihD`, 페이지 `05.기타(기획 v0.6)` (`5007:20503`).
- 화면 좌표와 치수는 논리 px다. 이미지는 0.7배 PNG로 보존하므로 이미지 픽셀을 실측 좌표로 오해하지 않는다.
- 학습 원본은 배치 패턴의 근거다. 신규 화면의 디자인 시스템 기준 파일은 13장을 유지하고, Footer도 13장의 지정 인스턴스로 넣는다.
- 아래에 적은 원본의 `Title + Table`, `Frame ...`, `Text + List Group` 같은 이름은 관측 기록이다. 실제 생성·정리 시에는 12장의 영문 명명·실제 Auto Layout·Container 보존 규칙을 적용한다.
- 각 원본의 “타이틀입니다”, “버튼명”, 샘플 계좌·이름·일시·안내 문구는 기획에 따라 교체한다. 샘플 보안·서비스 안내를 모든 업무의 검증 정책으로 확대하지 않는다.

### 14.1. 공통 실측과 기존 관리형과의 차이

| 패턴 | 원본 화면명 | 전체 크기 | BODY 높이 | Footer 시작 y |
| --- | --- | --- | --- | --- |
| C | Case_비밀번호발급/변경 | 1440 × 1411 | 902 | 1059 |
| D | Case_등록 | 1440 × 1239 | 730 | 887 |
| E | Case_가입_집중형 | 1440 × 1337 | 828 | 985 |
| F | Case_완료 | 1440 × 1280 | 771 | 928 |
| G | Case_에러 | 1440 × 900 | 391 | 548 |

- C~G의 HEADER 실측은 157px이다. GNB 108 + Breadcrumbs Area 49이며, 초기 A·B의 159px (GNB 110)과 2px 차이가 있다.
- 2장의 159px을 모든 화면의 절대값으로 덮어쓰지 않는다. 선택한 실제 헤더 인스턴스 높이를 기준으로 BODY를 배치한다. C~G의 BODY 시작 y=157, 첫 콘텐츠 y=205다.
- 화면 너비 1440, 좌우 패딩 40, 기본 콘텐츠 너비 1360, 본문 상하 패딩 48은 동일하다.
- C·D·F·G는 세로 BODY와 주요 섹션 gap 48을 사용한다. **E의 BODY는 가로 3열 Auto Layout, 열 간 gap 32**인 예외다.
- C·E·F의 정보/입력 표는 **라벨·값 왼쪽 정렬, 수직 가운데 정렬**이다. A·B 목록형의 가운데 정렬을 정보 표에 일괄 적용하지 않는다.
- Grid의 `itemSpacing=10`이 남아 있어도 실제 `gridRowGap=0`, `gridColumnGap=0`이다. 행·열 사이에 10px 공백을 추가하지 않는다.
- 표 색상·셀 패딩은 기존 기준을 재사용한다: 라벨 #F2F2F2, 값 #FFFFFF, 상단선 #444444 1px, 셀 패딩 상하 12·좌우 16.

### 14.2. 추가로 확인한 서체 위계

| 역할 | 실제 폰트 | 크기/행간 |
| --- | --- | --- |
| 수평 단계 현재 번호 | Pretendard SemiBold | 16/24 |
| 수평 단계 미시작 번호 | Pretendard Light | 16/24 |
| 수평 단계 현재 라벨 | KBFG Text Bold | 14/20 |
| 세로 단계 주 라벨(완료·진행) | KBFG Text Bold | 16/24 |
| 세로 단계 미시작 라벨 | KBFG Text Medium | 16/24 |
| LNB 제목 | KBFG Text Bold | 22/31 |
| LNB 2depth | KBFG Text Medium 또는 선택 상태 Bold | 18/25 |
| LNB 하위 메뉴 | KBFG Text Light 또는 선택 상태 Medium | 14/20 |
| 동의 안내의 강조 본문 | KBFG Text Medium | 16/24 |
| 동의 안내의 보조 문장 | KBFG Text Medium | 14/20 |
| 동의 라벨 | KBFG Text Bold | 16/24 |
| 완료·에러 주 메시지 | KBFG Text Bold | 20/28 |

기본 자간은 모두 0px이다. 단계 번호의 16px은 건수·페이지네이션의 17px과 구분한다.

C·D·F·G의 추출 본문에서는 누락 폰트가 없었다. 사고신고 사본 E는 추출 본문에서 `hasMissingFont=true`인 텍스트 34개가 감지되었다. 전체 원본 프레임의 추가 점검에서는 KBFG Text Bold/Medium, Pretendard Light/SemiBold가 누락 표시에 포함됐다. 새 화면 작성 전 해당 폰트·스타일과 기준 라이브러리를 확인하며, 누락을 이유로 임의 대체 폰트를 쓰거나 글자 크기·너비를 바꾸지 않는다. 보존 이미지는 그 시점의 표시 결과다.

## 15. 패턴 C — 비밀번호 신규/변경·보안 입력형

### 15.1. 구조와 좌표

본문 Container는 원본의 4개 구분을 유지한다.

| 요소 | x | y | 너비 | 높이 |
| --- | --- | --- | --- | --- |
| Container 1 — 제목·수평 단계 | 40 | 205 | 1360 | 36 |
| 제목 | 40 | 205 | 254 | 36 |
| StepIndicator / Horizontal | 약 1126.8 | 207 | 273.2 | 32 |
| Container 2 — 안내 박스 | 40 | 289 | 1360 | 118 |
| Container 3 — 제목·비밀번호 표 | 40 | 455 | 1360 | 334 |
| 비밀번호 표 | 40 | 503 | 1360 | 286 |
| Container 4 — 제목·OTP·안내 | 40 | 837 | 1360 | 174 |
| OTP 표 | 40 | 885 | 1360 | 66 |
| OTP 안내 목록 | 40 | 967 | 1360 | 44 |

- 제목과 단계 표시는 같은 가로 Auto Layout에서 양끝 정렬하며 수직 가운데 정렬한다.
- 단계는 총 3단계: 완료 1단계, 현재 2단계 “비밀번호 및 보안정보 입력”, 미시작 3단계다. 단계 번호·라벨·상태는 컴포넌트 속성/슬롯으로 유지한다.
- 안내 박스는 radius 12, #FAFAFA, 패딩 20 24, 실제 테두리 없음이다. 샘플 안내는 3항목이다. 내부 높이 78을 포함한 원본 높이는 118이다.
- 섹션 제목은 20/28 Bold이며 표와 간격 20이다.

### 15.2. 정보·입력 표

| 행 | 구성 | 높이 |
| --- | --- | --- |
| 1 | 계좌번호 라벨 340 + 값 340 + 계좌명 라벨 340 + 값 340 | 45 |
| 2 | KB카드 라벨 340 + 값 1020 (3열 병합) | 45 |
| 3 | 현재 비밀번호 라벨 340 + 입력·확인 영역 1020 | 65 |
| 4 | 변경 후 비밀번호 라벨 340 + 입력 영역 1020 | 65 |
| 5 | 변경 후 비밀번호 확인 라벨 340 + 입력 영역 1020 | 65 |

상단선 1 + 45 + 45 + 65 × 3 = 286이다. Grid는 4열 5행이며 병합 셀의 너비를 보존한다.

- 입력필드는 400 × 40, 확인 버튼은 secondary small 50 × 40, 둘 사이 gap 8, 합계 너비 458이다.
- 현재 비밀번호 입력은 `disabled=false`, 변경 후 비밀번호와 확인 입력은 샘플에서 `disabled=true`다. 비활성 상태를 회색 도형으로 재현하지 않고 실제 변형으로 설정한다.
- 입력 활성화 조건·현재 비밀번호 확인 결과는 이 정적 화면만으로 확정하지 않는다.
- OTP는 라벨 340 + 값 1020의 1행 표, 높이 65 + 상단선 1 = 66이다. 값 영역에도 400 × 40 입력 + gap 8 + 50 × 40 확인 버튼을 쓴다.
- OTP 표 아래 목록은 gap 16 뒤에 놓는다. 목록 2개는 각 20 높이, 항목 간 gap 4, 전체 44이며 `TextList / Unordered depth=2`와 왼쪽 들여쓰기 24를 사용한다.
- OTP 자릿수·오류 횟수·입력 제한 문장은 해당 업무 기획의 내용으로 관리한다. 다른 화면에 일괄 적용하지 않는다.
- 이 원본에는 페이지 하단 대형 실행 버튼이 없다. 학습 과정에서 임의로 추가하지 않는다.

## 16. 패턴 D — 서비스 안내·동의·등록형

본문은 원본의 3개 상위 영역을 유지한다. 순서: 제목·단계 → 안내·동의 → 실행 버튼이다. 원본의 자동 생성 이름 `Frame 2147246237`은 생성 시 12장의 역할·Container 명명 규칙으로 정리한다.

| 요소 | x | y | 너비 | 높이 |
| --- | --- | --- | --- | --- |
| 제목·수평 단계 영역 | 40 | 205 | 1360 | 36 |
| StepIndicator / Horizontal | 약 1176.8 | 207 | 223.2 | 32 |
| 안내·동의 섹션 | 40 | 289 | 1360 | 446 |
| 안내 박스 | 40 | 289 | 1360 | 382 |
| Item / Consent | 40 | 687 | 1360 | 48 |
| 단일 실행 버튼 | 643 | 783 | 154 | 56 |

- 총 4단계이며 현재는 1단계 “서비스동의”, 이후 번호는 2·3·4이다.
- 안내 박스는 radius 12, 패딩 32, 테두리 #E5E5E5 1px, 원본 fill #FAFAFA다. 저장 속성과 보이는 인상을 구분하고 토큰·스타일을 유지한다.
- 테두리를 포함한 내부 콘텐츠 시작은 박스 기준 (33,33), 너비 1294다. 1360 − 2 × (32+1) = 1294로 검산한다.
- 일반 본문 묶음과 TextList Group 사이는 16, 일반 본문 두 문장은 12, TextList 9항목 사이는 8이다. 각 리스트가 20 높이이므로 목록 전체는 9 × 20 + 8 × 8 = 244다.
- 일반 본문과 리스트가 혼합된 구성이므로 12장에 따라 `Text / TextList Group` 등 실제 구성에 맞게 명명한다. 전체를 TextList Group으로 부르지 않는다.
- 안내 박스와 동의 컴포넌트 간격은 16이다. `Item / Consent variant=1d`, 상하 패딩 12, 체크 컨트롤 24 × 24, 라벨과의 gap 8이다.
- 실행 버튼은 중앙 정렬 primary large 154 × 56, radius 6, 18/25 Bold다. 원본 `ButtonGroup count=multi` 안에 버튼 하나만 들어 있으므로 외형만 보고 버튼 두 개를 추가하지 않는다.
- 원본 버튼명은 플레이스홀더다. 실제 라벨과 동의 전후 활성화·클릭 동작은 해당 기획을 따른다.

## 17. 패턴 E — LNB·집중 본문·세로 단계의 3열 가입형

### 17.1. 열과 본문

```text
## BODY — Horizontal, padding 48 40, gap 32
├─ LNB 영역 — 316
├─ 집중 본문 — 664, Vertical, section gap 48
└─ 세로 단계 카드 — 316
```

316 + 32 + 664 + 32 + 316 = 1360이다.

| 요소 | x | y | 너비 | 높이 |
| --- | --- | --- | --- | --- |
| LNB 영역·실제 LNB | 40 | 205 | 316 | 618 |
| 중앙 본문 | 388 | 205 | 664 | 732 |
| 중앙 페이지 제목 | 388 | 205 | 664 | 36 |
| 제목·표 섹션 1 | 388 | 289 | 664 | 139 |
| 제목·표 섹션 2 | 388 | 476 | 664 | 229 |
| 제목·표 섹션 3 | 388 | 753 | 664 | 184 |
| 세로 단계 카드 | 1084 | 205 | 316 | 402 |

- 본문 상위 Container의 관측 이름은 좌측 `Container 1`, 중앙 `Container 4`, 우측 `Container 3`이다. 기존 정리 시 3열의 부모·개수·순서를 보존하고, 명명은 12장에 따라 현재 실제 범위에서 판정한다. 번호를 맞추기 위해 영역을 합치거나 나누지 않는다.
- 중앙 제목과 세 표 섹션 사이, 각 표 섹션 사이는 48이다.
- 각 섹션 제목 28 + gap 20 + 표 높이 91/181/136으로 구성한다.
- 표는 180 라벨 + 484 값의 2열, 행 높이 45다. 각각 2·4·3행이고 상단선 1을 포함한다. 값과 라벨은 왼쪽 정렬한다.
- 중앙 본문 너비 664에 초기 목록형의 1360 너비 표를 그대로 넣지 않는다.

### 17.2. LNB 참고용 틀 제거 — 필수

**실제 화면을 생성할 때 `(LNB 영역만 참고)`라는 참고용 틀을 제거하고 실제 LNB 인스턴스만 정상 노출한다.**

- 사고신고 원본의 안내 틀: `5067:3976`. 대응 브랜치 노드: `18182:97367`.
- 이 틀은 LNB와 별개인 프레임이며 `layoutPositioning=ABSOLUTE`, 316 × 548, LNB 위 (40,205)에 겹쳐 있다. fill은 #D400FF, opacity 0.04다.
- 복사한 작업 화면에서 이 오버레이와 같은 목적의 안내용 표시를 제거한다. 보라색 채움이나 참고용 텍스트를 서비스 UI로 남기지 않는다.
- **실제 LNB 인스턴스는 삭제·숨김·detach하지 않는다.** 사고신고 원본의 실제 LNB는 `5067:3975`, 대응 브랜치는 `18182:97366`이다.
- LNB 너비 316, 본문과의 gap 32, 메뉴 계층·선택·펼침 상태·아이콘을 유지한다. 오버레이 제거를 이유로 LNB 영역이나 상위 Container까지 지우지 않는다.
- 오버레이의 548 높이를 LNB 높이로 오해하지 않는다. 실제 LNB 원본 높이는 618이며, 제목 45 + 메뉴 슬롯 493 + 하단 패딩 80의 구성이다.
- 관측된 LNB 2depth 항목 높이는 49, 3·4depth는 40이다. 메뉴명과 선택 경로는 화면 기획에 맞게 조정한다.
- 완료 검수에서 참고 틀이 남아 있지 않은지와 실제 LNB가 가려짐 없이 보이는지를 함께 확인한다.
- 보존 이미지는 학습 원본을 기록하므로 참고 틀이 포함되어 있다. 이 이미지의 보라색 면을 생성 결과에 재현하지 않는다. 현재 요청은 규칙 학습이며 원본 참조 화면 자체는 수정하지 않았다.

### 17.3. 세로 단계 카드

- 카드 316 × 402, 안쪽 패딩 20, radius 20, 흰 배경이다.
- 그림자 실측: x=0, y=4, blur=6, spread=0, rgba(12,17,29,0.10).
- 내부 단계 스택은 276 × 362, 단계 사이 gap 20이다.
- 완료 1·2단계 각 32, 현재 3단계 154, 미시작 4·5단계 각 32다. 32+32+154+32+32 + 20×4 = 362이다.
- 현재 단계는 “고객정보 확인”이며 depth=2 하위 단계 2개가 포함된다. 상위 번호·진행 라인·하위 라벨은 실제 StepIndicator 인스턴스의 내부 계층으로 유지한다.
- 현재 단계 확장 높이를 모든 단계에 적용하지 않는다. 고정/sticky·스크롤 추종 동작은 정적 화면에서 확인되지 않았다.

## 18. 패턴 F — 완료 Feedback·결과 요약형

본문 Container 4개를 유지한다: 완료 메시지 → 결과 표 1 → 결과 표 2 → 실행 버튼.

| 요소 | x | y | 너비 | 높이 |
| --- | --- | --- | --- | --- |
| 완료 메시지 래퍼 | 40 | 205 | 1360 | 152 |
| Feedback 인스턴스 | 40 | 225 | 1360 | 112 |
| 첫 제목·표 섹션 | 40 | 405 | 1360 | 139 |
| 첫 표 | 40 | 453 | 1360 | 91 |
| 두 번째 제목·표 섹션 | 40 | 592 | 1360 | 184 |
| 두 번째 표 | 40 | 640 | 1360 | 136 |
| 실행 버튼 모음 | 560 | 824 | 320 | 56 |

- Feedback 래퍼는 상하 20 패딩, 가운데 정렬이다.
- `Feedback varient=large`를 사용한다. `varient`는 실제 라이브러리 속성 표기이므로 임의로 `variant`로 바꾸지 않는다.
- 성공 아이콘은 `status-circleCheck` 64 × 64다. 아이콘 영역 64 → gap 20 → 주 메시지 20/28 Bold로 전체 112를 구성한다.
- 첫 표는 거래종류·거래일시 2행, 두 번째 표는 출금계좌번호·거래일시·받는분 3행이다.
- 표 너비는 라벨 240 + 값 1120, 행 높이 45, 왼쪽 정렬이다. 계좌번호·날짜는 숫자용 셀 스타일을 적용한다.
- 두 실행 버튼은 tertiary + primary large, 각 154 × 56, 내부 gap 12, 합계 320이다.
- 제목·버튼·값은 샘플 내용을 고정하지 않는다. 결과 메시지는 업무 성공 상태에 맞게 작성한다.

## 19. 패턴 G — 에러·이용 조건 안내형

| 요소 | x | y | 너비 | 높이 |
| --- | --- | --- | --- | --- |
| Feedback 래퍼 | 40 | 205 | 1360 | 295 |
| Feedback 인스턴스 | 40 | 225 | 1360 | 204 |
| Footer 시작 | 0 | 548 | 1440 | 352 |

- 목록·표·페이지 제목 없이 Feedback 중심으로 구성하는 패턴이다. 이전 화면에 제목·표가 있었다는 이유로 추가하지 않는다.
- 완료형과 같은 `Feedback varient=large`를 쓰되 아이콘 슬롯은 `status-alert` 64 × 64로 구분한다.
- 내부 구조는 아이콘 영역 64 → gap 20 → 주 메시지 2줄 56 → gap 20 → 버튼 슬롯 44다. 합계 204다.
- 주 메시지는 중앙 정렬 KBFG Text Bold 20/28, 버튼은 tertiary small 64 × 40, 14/20 Bold다.
- 바깥 래퍼 높이 295와 내부 콘텐츠+패딩 244의 차이 51은 원본의 추가 공간이다. 이를 모든 에러 화면의 공통 간격 토큰으로 만들지 않는다.
- 원본 “입출금계좌 개설 후 이용” 문장은 이 예시의 안내다. 다른 오류의 메시지·복구 행동·버튼 라벨은 해당 기획을 따른다.
- 전체 높이 900은 샘플 실측값이며, 에러 화면 전체에 고정 최소 높이나 뷰포트 정렬 규칙으로 확대하지 않는다.

## 20. 추가 컴포넌트 식별자와 삭제 대비 보존

### 20.1. 추가 확인 키

기존 10장의 Table·BoxButton·Title / Page 등은 재사용한다. 아래는 이번 학습에서 추가로 확인한 식별자다.

| 컴포넌트 | 확인 변형 | main component key |
| --- | --- | --- |
| StepIndicator / Horizontal | `StepIndicator / Horizontal` | `d621c953803a7eaa545720572e195d3758d84e99` |
| Title / Headline | `align=left` | `cd6a27c70df81353de0a000dd9666a8de67326cd` |
| InputField | `hover=false, focused=false, disabled=false, entered=false, error=false` | `6eb7815286692dc574ebe162983fcb9afe06fc05` |
| InputField | `hover=false, focused=false, disabled=true, entered=false, error=false` | `569b5095c477f6fa62c0c4fd09b6d8e9af1159c6` |
| TextList / Unordered | `variant=bullet, size=14, depth=1` | `5e484496e22e7e84c91c23bddfe11d1b4a13f35b` |
| TextList / Unordered | `variant=bullet, size=14, depth=2` | `5a5dbb8e2363c9870344034ad126740094189999` |
| Item / Consent | `variant=1d` | `e7be5a47121b2fd59a919f83033f882473b946af` |
| StepIndicator / Vertical | `StepIndicator / Vertical` | `6d64a53e165cf7f9d92e29637bba2a700ef84253` |
| Table / Cell | `variant=last, onlyNumber=true` | `494e274bfc773051437a999b5ad37c61b4321cf4` |
| status-circleCheck | `status-circleCheck` | `46a6b3505cfd401cbc4223402149f9391130515e` |
| status-alert | `status-alert` | `78f46e6680082282c14dbf37f37f2557a97d692b` |

입력필드의 `disabled=true` 키와 `disabled=false` 키는 구분한다. 수평 단계의 현재 번호는 #1F6AFF, 미시작 번호는 #8D8D8D다.

### 20.2. 같은 이름의 출처별 키 차이

| 컴포넌트 | 브랜치에서 관측한 키 | 사고신고 사본에서 관측한 키 |
| --- | --- | --- |
| LNB | `2aad82f0f97e6a0a69a2af71c272f10dc10c4e83` | `60c5aebdbb1ceb6a0d6f7ee18dd7abfc5bd91d2e` |
| Title / Headline | `cd6a27c70df81353de0a000dd9666a8de67326cd` | `bf50f457ca5583c356608499f2a479e58248073a` |
| Feedback — varient=large | `7d7b6abcae40263fa7d8f2b19a9bfdb8e84bcc42` | `d421043c19670294d67d1a724db0c2d35a5feb14` |
| 에러 내 tertiary small 버튼 | `0dd34d36c9b4e00c021f1e19738665f8f84a7e5b` | `adc24d1239ed006ee1f91cb4a8ad99fff9651f22` |

이 표는 이름이 같아도 로컬 원형이 다를 수 있음을 기록한다. 학습 파일의 로컬 키를 기준 디자인 시스템의 공식 키라고 단정하지 않는다. 생성 대상 파일에서 13장의 기준 라이브러리 원형과 변형을 확인해 사용한다. LNB·Feedback이 학습 파일과 함께 삭제될 경우에도 위 구조·치수·상태·이미지로 의도를 확인할 수 있다. Footer는 이 표와 관계없이 13장의 지정 원형을 사용한다.

### 20.3. 화면 이미지

이미지는 링크가 삭제되어도 남도록 저장소에 직접 보존했다. E~G는 사고신고 파일의 최신 전달본이며 대응 브랜치의 배치와 대조했다. 모든 이미지는 0.7배이며 너비 1008px다.

#### C — 비밀번호 신규/변경

![비밀번호 신규 변경 학습 원본](assets/design-rules/case-password-change.png)

#### D — 서비스 동의

![서비스 동의 등록 학습 원본](assets/design-rules/case-consent-registration.png)

#### E — LNB 집중형

![집중형 학습 원본 — 참고용 LNB 틀 포함, 실제 생성 시 제거](assets/design-rules/case-focused-registration.png)

#### F — 완료

![완료 결과 학습 원본](assets/design-rules/case-completion.png)

#### G — 에러

![에러 안내 학습 원본](assets/design-rules/case-error.png)

### 20.4. 이후 링크 학습·화면 생성 절차

1. 전달받은 링크는 삭제될 수 있으므로 URL만 남기지 않는다. 출처 파일·브랜치·노드, 화면 역할, 섹션 순서, 실제 Auto Layout, 치수·간격·정렬, 서체·상태·컴포넌트 식별자와 보존 이미지를 함께 기록한다.
2. 같은 패턴이 다른 파일에 복사된 경우 배치 중복은 합치고, 변경된 원형 키·폰트 상태·내용 차이는 구분한다.
3. 실제 화면 생성에서는 학습용 안내 틀·주석을 제거하고 LNB 등 실제 컴포넌트를 정상 노출한다.
4. 사용자 정의 명명·그룹핑은 12장, 디자인 시스템·Footer 원형은 13장을 적용한다. 기존 Container의 개수·부모·순서·역할을 임의로 재구성하지 않는다.
5. 컴포넌트 연결과 상태, 영역별 너비 합, 실제 행·열 gap, 서체·누락 폰트, 잘림·겹침, 참고 틀 제거를 검수한다. 통과한 항목은 반복 확인하지 않는다.

## 21. 추가 학습 — 레이어 팝업 공통 규격

2026-11-09에 `05. 사고신고` 파일의 팝업 3개를 확인했다. 파일 키는 `yojs1BhPrWxLmDDrpg1ihD`, 페이지는 `05.기타(기획 v0.6)` (`5007:20503`)이다.

| 패턴 | 원본 프레임 | 원본 링크 | 배경 프레임 | Popup 크기·위치 |
| --- | --- | --- | --- | --- |
| H — 계좌순서 변경, 데이터 있음 | Case_계좌그룹 관리 | [5067:7228](https://www.figma.com/design/yojs1BhPrWxLmDDrpg1ihD?node-id=5067-7228) | 1440 × 850 | 1200 × 551, (120,149.5) |
| I — 계좌순서 변경, 데이터 없음 | Case_계좌그룹 관리_nodata | [5067:7340](https://www.figma.com/design/yojs1BhPrWxLmDDrpg1ihD?node-id=5067-7340) | 1440 × 850 | 1200 × 557, (120,146.5) |
| J — 자동 로그아웃 안내 | 로그아웃 안내 | [5067:7408](https://www.figma.com/design/yojs1BhPrWxLmDDrpg1ihD?node-id=5067-7408) | 1440 × 900 | 400 × 320, (520,290) |

H·I는 프레임명에 “계좌그룹 관리”가 있지만 실제 팝업 제목은 “계좌순서 변경”이다. 패턴은 실제 표시 내용과 구성으로 판별한다. 실제 화면의 제목과 업무명은 해당 기획을 따른다.

### 21.1. Popup 원형과 배치

- 세 팝업 모두 `Popup` 인스턴스이며, 실제 변형은 `type=layer, vatiant=default`다. `vatiant`는 원형의 실제 속성 이름이다. 임의로 `variant`로 치환하지 않는다.
- 배경 프레임은 흰 바탕에 검정 #000000 opacity 0.20의 딤을 얹고 팝업을 가로·세로 가운데 배치한다. 단색 회색 배경을 서비스의 실제 바탕색으로 고정하지 않는다.
- Popup은 흰 배경, radius 24, 세로 Auto Layout, 자식 사이 gap 0, 바깥 패딩은 하단 24만 적용한다.
- 그림자는 x=0, y=4, blur=16, spread=0, rgba(12,17,29,0.10)이다.
- 원본 중앙 배치는 (배경 너비 − Popup 너비)/2, (배경 높이 − Popup 높이)/2로 검산한다. 데이터 상태가 달라 높이가 변하면 y도 중앙 기준으로 다시 계산한다.
- 배경 프레임 크기는 학습 시점의 표시 영역이다. 모든 실제 화면을 850px/900px 높이로 고정하는 규칙으로 확대하지 않는다.

### 21.2. 내부 영역과 패딩

```text
Popup [INSTANCE]
├─ Header 역할: Item / Header
├─ Body 역할: Slot
└─ Footer 역할: Item / Footer
```

- 12장에 따라 사용자 정의 팝업 영역 래퍼는 `Header`, `Body`, `Footer`로 명명한다. 위 트리의 “역할”은 설명이며 실제 이름에 붙이지 않는다.
- 원형의 `Item / Header`, `Slot`, `Item / Footer`와 내부 고유 계층은 컴포넌트 이름 보존 원칙에 따라 유지한다. 규칙에 맞추려 원형을 detach하거나 내부 이름을 강제로 바꾸지 않는다.
- Header 높이는 64, 패딩은 상하 16·좌우 24다. 제목은 KBFG Text Bold 16/24, #1C1C1C이며, 우측 닫기 IconButton은 24 × 24다.
- Body 역할 Slot의 패딩은 위 12·좌우 24·아래 24다. H·I는 세로 gap 32, J는 gap 0과 가운데 정렬을 사용한다.
- 팝업 Footer는 높이 48, 좌우 패딩 24, 가운데 정렬이다. 내부 버튼은 medium 높이 48이다.
- ButtonGroup 전체 너비 280 = 버튼 136 × 2 + 내부 Slot-Button gap 8이다. 바깥 ButtonGroup의 itemSpacing=0만 보고 버튼을 붙이지 않는다.
- Popup 전체 높이는 Header + Body + Footer + 바깥 하단 패딩 24의 합이다. H는 64+415+48+24=551, I는 64+421+48+24=557, J는 64+184+48+24=320이다.
- 팝업 내부 Footer는 일반 페이지의 KBDS Footer와 별개다. 팝업 내부에 13장의 은행 공통 Footer를 끼워 넣지 않는다. 팝업 뒤 일반 화면이 필요한 경우 해당 페이지의 Footer에는 13장 규칙을 적용한다.

### 21.3. 팝업 버튼의 색상·서체

| 역할 | 변형 | 크기 | 실측 배경 | 텍스트 |
| --- | --- | --- | --- | --- |
| Footer 왼쪽 보조 버튼 | tertiary medium | 136 × 48 | #EDEDED | #1C1C1C, KBFG Text Bold 16/24 |
| Footer 오른쪽 주요 버튼 | primary medium | 136 × 48 | #444444 | #FFFFFF, KBFG Text Bold 16/24 |
| 순서 이동 툴바 버튼 | secondary small | 높이 40, 내용별 너비 | #FFFFFF, 테두리 #A5A5A5 1 | #1C1C1C, KBFG Text Bold 14/20 |

- 팝업의 primary medium은 이 원본에서 짙은 회색으로 표시된다. 페이지의 primary large 노란색 규칙으로 일괄 덮어쓰지 않는다.
- 실제 컴포넌트 변형·토큰·오버라이드를 확인해 적용한다. 회색 배경만으로 disabled라고 판단하지 않는다. 관측된 버튼들은 `disabled=false`다.
- 세 화면 모두 추출 텍스트의 누락 폰트가 없었고, 자간은 0px이었다.

## 22. 패턴 H·I — 계좌순서 변경 팝업의 목록·빈 상태

### 22.1. 공통 본문

- 팝업 너비 1200, Body 콘텐츠 너비 1152 = 1200 − 24×2다. 일반 페이지의 1360px 본문 너비를 넣지 않는다.
- 구조는 안내 박스 → 32 간격 → 툴바·표 Container 순서다.
- 안내 박스는 1152 × 90, radius 12, #FAFAFA, 패딩 상하 20·좌우 24다. 두 불릿 문장은 기획 안내용 샘플이므로 실제 업무 문구로 교체한다.
- 툴바는 1152 × 40, 좌우 양끝 정렬이다. 왼쪽 InputField는 152 × 40, 오른쪽 버튼 그룹은 337 × 40이다.
- 오른쪽 순서 이동 버튼은 “맨위로” 78, “위로” 66, “아래로” 78, “맨아래로” 91 너비, 모두 높이 40이며 gap 8이다. 78+66+78+91 + 8×3 = 337이다.
- 툴바와 표 사이는 20이다. 안내 박스·툴바·표·버튼의 너비 정렬을 유지한다.

| 요소 | H — 데이터 있음 | I — 데이터 없음 |
| --- | --- | --- |
| 안내 박스 (x,y) | (144,225.5) | (144,222.5) |
| 툴바 (x,y) | (144,347.5) | (144,344.5) |
| 표 시작 (x,y) | (144,407.5) | (144,404.5) |
| 표 전체 높이 | 197 | 203 |
| Body Slot 높이 | 415 | 421 |
| Footer 시작 y | 628.5 | 631.5 |

H의 본문 Slot에는 안내 박스와 `Container`가 있다. I의 같은 Slot에는 `Container 1`(안내)과 `Container 2`(툴바·표)가 있다. 각 Slot 안에서 실제 Container 개수를 기준으로 12장의 명명을 적용한다. 데이터 상태가 다르다는 이유만으로 부모·역할·개수를 임의로 통일하지 않는다.

### 22.2. 표와 선택 컨트롤

| 열 | 역할/헤더 | 너비 |
| --- | --- | --- |
| 1 | Radio 선택 | 80 |
| 2 | 순위 | 80 |
| 3 | 금융기관명 | 248 |
| 4 | 계좌번호 | 248 |
| 5 | 계좌명 | 248 |
| 6 | 휴대폰 번호 | 248 |

- 80+80+248×4 = 1152다.
- 헤더와 데이터 행 높이는 모두 49, 라벨·값은 가운데 정렬, 셀 패딩은 상하 12·좌우 16이다.
- Grid 실제 행·열 gap은 0이다. 남아 있는 itemSpacing=10을 표 셀 사이 공백으로 해석하지 않는다.
- 상단선은 #444444 1px, 헤더 배경 #F2F2F2, 헤더 선 #E5E5E5, 데이터 선 #EDEDED를 사용한다. 마지막 열은 last 변형으로 오른쪽 선을 처리한다.
- 순위·계좌번호·휴대폰 번호는 숫자용 셀 스타일을 사용한다. 마스킹된 계좌·휴대폰 문자열도 원본의 숫자용 표현을 유지한다.
- 첫 열은 Checkbox가 아닌 **Radio 24 × 24**다. 실제 변형은 `size=large, fontWeight=bold, disabled=false, invalid=false`이며 checked 상태를 구분한다.
- H 원본에는 1·2행 Radio가 모두 checked=true로 표시되어 있다. 이를 근거로 Radio의 실제 다중 선택 동작을 정의하지 않는다. 선택 수·그룹·재정렬 동작은 실제 업무 기획에 맞게 설정한다.
- I에서도 헤더 선택 컨트롤과 순서 이동 버튼은 남아 있다. 비활성화 여부는 원본의 정적 외형만으로 추론하지 않는다.

### 22.3. H — 데이터 있음

- 6열 × 4행(헤더 1 + 데이터 3)의 Grid다.
- 상단선 1 + 49×4 = 표 높이 197이다.
- 툴바 40 + gap 20 + 표 197 = Container 높이 257이다.
- Body는 상단 패딩 12 + 안내 90 + gap 32 + Container 257 + 하단 패딩 24 = 415다.
- 그룹 선택값 “기본”, 계좌 3건과 마스킹 문자열은 샘플이다. 건수·정렬 결과·순위 저장 시점은 실제 기획에 맞춘다.
- Footer 버튼 두 개의 “버튼명”은 플레이스홀더다. 화면별 취소·확인 등의 업무 라벨을 적용한다.

### 22.4. I — 데이터 없음

- 열 헤더는 그대로 유지한다. 빈 상태는 일반 데이터 행의 텍스트를 바꾸는 방식이 아니라 **헤더 아래 별도 Feedback 영역**으로 구성한다.
- 헤더 Grid 50 = 상단선 1 + 헤더 49다.
- 빈 상태 래퍼는 1152 × 152, 상하 패딩 32다. 그 안의 `Feedback varient=small`은 1152 × 88, 중앙 정렬이다.
- Feedback은 `status-nodata` 아이콘 48 × 48 → gap 16 → 메시지 24 높이로 구성한다. 문구는 “등록된 계좌가 없습니다”다.
- 하단 `Divider / Horizontal` 1px를 유지한다. 표 전체는 50+152+1=203이다.
- 툴바 40 + gap 20 + 표 203 = Container 높이 263이다.
- 그룹 선택값 “거래처”는 원본 예시다. 실제 선택값과 메시지는 해당 상태에 맞게 설정한다.
- 빈 상태에 데이터 3행을 공간용으로 숨겨 남기거나 이전 선택 결과가 있는 것처럼 표현하지 않는다.

## 23. 패턴 J — 자동 로그아웃 안내 팝업

### 23.1. 구조와 배치

- Popup은 400 × 320이며 1440 × 900 배경의 중앙 (520,290)에 놓인다.
- Header 제목은 “자동 로그아웃 예정”, 높이 64이며 우측 닫기 버튼 24 × 24를 유지한다.
- Body Slot은 400 × 184, 패딩 위 12·좌우 24·아래 24, 가로·세로 가운데 정렬이다.
- 본문은 원본의 단일 `Container 1` 337 × 120과 같은 크기의 내부 래퍼로 구성되어 있다. 정리 시 단일 Container는 12장에 따라 `Container`로 명명하되 개수·부모·순서는 바꾸지 않는다.
- 본문 블록의 원본 절대 위치는 (551.5,380)이다. 중앙 정렬을 유지하며 세로로 설명 제목 28 → gap 12 → 카운트 28 → gap 12 → 안내 40을 배치한다. 합계 120이다.
- 제목·카운트·설명은 모두 중앙 정렬이다. 카운트 프레임은 원본 43 × 28이다. 시간 문자열 길이가 달라질 수 있으므로 그 너비를 모든 값에 고정하지 않는다.
- Footer는 y=538, 높이 48이며 Popup 바깥 하단 패딩 24 뒤 y=610에서 끝난다.

### 23.2. 서체·색상과 실행 버튼

| 요소 | 서체 | 크기/행간 | 색상 |
| --- | --- | --- | --- |
| 팝업 Header 제목 | KBFG Text Bold | 16/24 | #1C1C1C |
| “자동 로그아웃 남은시간” | KBFG Text Bold | 20/28 | #444444 |
| 남은 시간 “0:23” | Pretendard SemiBold | 20/28 | #1F6AFF |
| 서비스 안내 2줄 | KBFG Text Light | 14/20 | #6E6E6E |
| Footer 버튼 | KBFG Text Bold | 16/24 | 보조 #1C1C1C / 주요 #FFFFFF |

- 왼쪽은 “지금 로그아웃” tertiary medium, 오른쪽은 “로그인 연장” primary medium이다. 각 136 × 48, gap 8, 전체 280 너비다.
- 실제 팝업 버튼의 primary 배경은 #444444다. 일반 페이지의 노란색 primary large로 교체하지 않는다.
- “0:23”은 상태 예시다. 자동 로그아웃 총 제한시간·갱신 주기·0초 처리·로그인 연장 응답·닫기 버튼 동작은 이 정적 화면에서 확정하지 않는다.
- 실제 생성 시 타이머 값과 설명은 업무 기획에 맞게 적용한다. 시간 정책을 디자인 값에서 임의로 만들어 넣지 않는다.

## 24. 팝업 컴포넌트 식별자·보존 이미지

### 24.1. 확인한 원형

아래 Popup의 관측 main component 노드는 `5067:7206`이다. 학습 파일의 로컬 원형 키이므로 생성 시에는 기준 디자인 시스템과의 연결·동일 변형 여부도 확인한다. 구성·상태를 재현하기 위해 관련 키를 함께 보존한다.

| 컴포넌트 | 실제 변형 | main component key |
| --- | --- | --- |
| Popup | `type=layer, vatiant=default` | `58f575d37a8d4d83a30238c8f75b152d4e42db93` |
| Item / Header | `variant=default` | `2cbf7cb8b3527095493ddec2903fcfe47ac00798` |
| Item / Footer | `variant=buttonGroup` | `e20c54e3621cf093f53c6a565a37c5811b583839` |
| ButtonGroup | `count=multi, size=medium` | `8923faa9126db7ef087595a2d123151588618ff6` |
| BoxButton | `variant=tertiary, size=medium, hover=false, disabled=false, pressed=false` | `a03fad70eb160b79085f5496a27bc25f9685054b` |
| BoxButton | `variant=primary, size=medium, hover=false, disabled=false, pressed=false` | `c4ab4c1ce45fb8f3c1975cf3a624c6f05b561767` |
| Feedback | `varient=small` | `5043fce90aa14ec77b4a1ca9816dc0b3f746d0ea` |
| status-nodata | `status-nodata` | `9c863558712ee6cd973b806d707e4f2be93323d5` |
| Radio | `size=large, fontWeight=bold, checked=false, disabled=false, invalid=false` | `a0096d2601a8299ad2c5ebe3955721916b755d78` |
| Radio | `size=large, fontWeight=bold, checked=true, disabled=false, invalid=false` | `775a12d301fa09466bc5e9e52c6a683e9e7dcb63` |
| IconButton — 닫기 | `variant=primary, size=24, hover=false, disabled=false, pressed=false` | `d0596490379106ea5d1492de1100c24be4be398a` |

Popup의 실제 세트 속성은 `type`(layer/browser), `vatiant`(default/gate), `Slot#3416:35`다. 이번 학습은 layer/default만 확인했으므로 browser/gate의 치수·동작으로 확대하지 않는다.

### 24.2. 보존 이미지

원본 링크가 삭제되어도 남도록 저장소에 PNG를 직접 보존했다. 0.7배 이미지이며 모두 너비 1008px이다. 논리 치수는 21~23장의 표를 따른다.

#### H — 계좌순서 변경, 데이터 있음

![계좌순서 변경 팝업 — 데이터 있음](assets/design-rules/popup-account-order.png)

#### I — 계좌순서 변경, 데이터 없음

![계좌순서 변경 팝업 — 데이터 없음](assets/design-rules/popup-account-order-empty.png)

#### J — 자동 로그아웃 안내

![자동 로그아웃 안내 팝업](assets/design-rules/popup-auto-logout.png)

### 24.3. 재현 검수

1. Popup 원형 연결·type/vatiant·radius·딤·중앙 배치를 확인한다.
2. Header 64, Body 패딩, Footer 48, 바깥 하단 패딩 24를 구분해 합산한다.
3. 계좌 표는 열 너비 합 1152, 행 높이 49, 실제 Grid gap 0, Radio 종류·상태를 확인한다.
4. nodata는 헤더·Feedback·하단 Divider 구조를 확인한다. 데이터 있음과 빈 상태를 같은 높이로 강제하지 않는다.
5. Footer medium 버튼은 48 높이·gap 8을 적용한다. 페이지 large 버튼의 56 높이·gap 12·노란색을 가져오지 않는다.
6. 타이머·업무 라벨·안내 예문을 실제 기획과 대조하고, 서체·누락 폰트·텍스트 잘림·겹침을 확인한다.

## 25. 추가 학습 — 금융거래한도계좌 해제 안내·상태 분기

2026-11-09에 `05. 사고신고` 파일의 두 화면을 추가 확인했다. 파일 키 `yojs1BhPrWxLmDDrpg1ihD`, 페이지 `05.기타(기획 v0.6)` (`5007:20503`)이다.

| 패턴 | 원본 프레임 | 링크 | 전체 크기 | BODY 높이 | Footer 시작 y |
| --- | --- | --- | --- | --- | --- |
| K — 대상 없음 | Case_금융거래한도계좌 해제_대상없음 | [5067:8070](https://www.figma.com/design/yojs1BhPrWxLmDDrpg1ihD?node-id=5067-8070) | 1440 × 1480 | 971 | 1128 |
| L — 대상 있음 | Case_금융거래한도계좌 해제_대상있음 | [5067:8238](https://www.figma.com/design/yojs1BhPrWxLmDDrpg1ihD?node-id=5067-8238) | 1440 × 1381 | 872 | 1029 |

### 25.1. 공통 골격과 상태별 차이

- HEADER 높이 157, BODY 시작 y=157, 좌우 패딩 40, 본문 상하 패딩 48, 콘텐츠 너비 1360, 주요 섹션 gap 48이다.
- 두 상태 모두 상위 Container 4개를 유지한다: 페이지 제목 → 안내 카드 2개 → 대상 결과 → 실행 버튼.
- 페이지 제목은 “금융거래한도계좌 해제”, KBFG Text Bold 26/36, #1C1C1C이며 x=40, y=205, 높이 36이다.
- 원본 제목 인스턴스 너비는 K 1360, L 237로 다르지만 두 상태의 제목 영역 Container 너비는 동일한 1360이다. 텍스트 인스턴스의 너비를 콘텐츠 영역 전체 너비와 혼동하지 않는다.
- Footer는 원본에서 일반 프레임이지만 실제 생성에서는 13장의 지정 Footer 인스턴스를 사용한다. 위 전체 높이와 Footer 좌표는 학습 원본의 검산값이다.
- 계좌 유무에 따라 결과와 버튼의 실제 구성을 달리 적용한다. 빈 상태에 정보 표의 가짜 행을 남기거나, 대상 있음에 빈 상태 메시지를 중첩하지 않는다.
- 기존 Container 개수·부모·순서는 보존하고, 사용자 정의 이름·그룹핑은 12장을 따른다.

| 요소 | K — 대상 없음 | L — 대상 있음 |
| --- | --- | --- |
| 안내 카드 영역 | (40,289), 1360 × 402 | (40,289), 1360 × 398 |
| 카드 1 | (40,289), 1360 × 177 | (40,289), 1360 × 177 |
| 카드 사이 실측 간격 | 16 | 12 |
| 카드 2 | (40,482), 1360 × 209 | (40,478), 1360 × 209 |
| 결과 섹션 | (40,739), 1360 × 237 | (40,735), 1360 × 142 |
| 실행 버튼 영역 | (40,1024), 1360 × 56 | (40,925), 1360 × 56 |
| 실제 버튼 모음 | (560,1024), 320 × 56 | (643,925), 154 × 56 |

카드 간격의 차이 4px을 숨기고 두 상태를 같은 높이로 통일하지 않는다. 이 차이는 원본 실측 기록이며 “대상 유무에 따라 반드시 16/12를 써야 한다”는 일반 규칙으로 확대하지 않는다. 실제 작업에서는 기획·선택한 패턴에 맞게 적용한다.

### 25.2. 이미지·텍스트 안내 카드 2종

두 `Content Box`는 실제 가로 Auto Layout이다.

| 항목 | 기준 |
| --- | --- |
| 카드 너비 | 1360 |
| 배경·테두리 | #FFFFFF, #D4D4D4 1px, INSIDE |
| 모서리 | 12 |
| 패딩 | 상하좌우 32 |
| 이미지·본문 간격 | 24 |
| 이미지 | ImageContainer ratio=1:1, 96 × 96 |
| 텍스트 영역 | 1176 너비 |
| 수직 정렬 | 이미지와 텍스트 블록 가운데 정렬 |
| 카드 제목 | KBFG Text Bold 18/25, #1C1C1C |
| 일반 불릿 | KBFG Text Light 14/20, #1C1C1C |

- 너비 검산: 32 + 96 + 24 + 1176 + 32 = 1360이다.
- 카드 내부 이미지 x는 카드 기준 32, 텍스트 x는 152다. 원본 테두리는 INSIDE이며 실제 콘텐츠 패딩에 1px을 추가하지 않는다.
- 이미지의 y는 카드 1 기준 40.5, 카드 2 기준 56.5다. 이미지와 문단을 가운데 정렬해 생기는 값이며, 두 카드에 같은 y를 강제로 적용하지 않는다.
- 원본 ImageContainer는 플레이스홀더다. 회색 이미지 기호를 최종 안내 이미지로 간주하지 않고 실제 기획 이미지로 교체한다. 컴포넌트 프레임과 비율은 유지한다.
- 바깥 `Box Align`, `Content Box`, 내부 `vStack`, `list` 등의 이름은 원본 기록이다. 반복 카드 래퍼와 제목·복합 본문은 12장에 따라 실제 자식 구성을 판정해 정리하며, 디자인 시스템 컴포넌트의 원형 이름은 유지한다.

#### 카드 1 — 계좌 정의 안내

- 제목은 “금융거래한도계좌란?”이다.
- 텍스트는 제목 25 → gap 12 → 불릿 목록 76으로 높이 113이다.
- 목록 3개는 각 높이 20, 간격 8이므로 20×3 + 8×2 = 76이다.
- 패딩 32×2 + 텍스트 113 = 카드 높이 177이다.

#### 카드 2 — 해제 기준 안내

- 제목은 “비대면 한도제한 해제 기준 안내”이다.
- 제목 25 → gap 8 → 보조 설명 24로 윗부분 57을 구성한다.
- 보조 설명은 KBFG Text Medium 16/24, #444444다.
- 윗부분 57 → gap 12 → 불릿 목록 76으로 텍스트 높이 145, 패딩 64를 더해 카드 높이 209다.
- 원본 조건·등급·기간·안내 문구는 해당 화면의 기획 내용이다. 다른 업무의 해제 정책으로 일반화하지 않는다.
- 원본 마지막 불릿에는 동일한 법인 대출 문구가 연속 중복되어 있다. 실제 문구 적용 시 해당 기획을 확인하고 샘플 중복을 그대로 복제하지 않는다.

## 26. 패턴 K·L — 대상 결과와 실행 영역

### 26.1. K — 대상 없음

- 결과 섹션은 제목·설명 64 → gap 20 → 빈 상태 영역 153으로 높이 237이다.
- 제목·설명 인스턴스는 x=40, y=739, 1360 × 64이며 왼쪽 정렬이다.
- 원본 제목은 “타이틀입니다”, 설명은 “디스크립션 텍스트”인 플레이스홀더다. 제목은 Bold 20/28, 설명은 Light 16/24, 두 텍스트 사이 12로 총 64를 구성한다.
- 빈 상태 영역은 x=40, y=823, 너비 1360, 높이 153이다. 별도의 열 헤더는 없다. 팝업 I의 “헤더 유지형 nodata”와 구분한다.
- 상단은 #444444 1px 선이고, 실제 Line 노드의 레이아웃 높이는 0이다. 그 아래 Feedback 래퍼 152와 하단 Divider 1로 레이아웃 높이 153을 구성한다. 상단 stroke를 추가 행 높이처럼 합산하지 않는다.
- Feedback 래퍼의 상하 패딩은 32, 안쪽 `Feedback varient=small`은 1360 × 88이다.
- 아이콘은 `status-nodata` 48 × 48 → gap 16 → 메시지 24다. 메시지는 “금융거래한도제한 계좌가 없습니다”, KBFG Text Bold 16/24, #1C1C1C다.
- 실행 섹션은 위 결과 영역 뒤 gap 48에 배치한다. 원본은 `ButtonGroup count=multi, size=large`, 두 버튼 각 154 × 56, 내부 gap 12, 전체 320이다.
- 원본 버튼은 “삭제” tertiary와 “수정” primary이며 `disabled=false`다. **해제 대상이 없다는 화면 목적과 맞지 않는 템플릿 예시로 기록한다.** 이를 실제 업무의 삭제·수정 기능으로 확정하지 않는다. 생성 시 화면 기획에 맞는 라벨·개수·상태·행동을 적용한다.

### 26.2. L — 대상 있음

- 결과 섹션은 x=40, y=735, 1360 × 142다.
- 제목 “한도제한계좌 정보”는 실제 KBFG Text Medium 22/31, #1C1C1C다. 카드 제목의 18/25 또는 K 플레이스홀더의 20/28을 일괄 적용하지 않는다.
- 제목 높이 31 → gap 20 → 표 91로 총 142다.
- 표는 x=40, y=786, 1360 × 91, 2열·2행, 실제 Grid 행·열 gap 0이다.
- 라벨 열 240, 값 열 1120, 각 행 높이 45이며 상단선 1 + 45×2 = 91이다.
- 첫 행은 계좌번호, 둘째 행은 상품명이다. 라벨·값 모두 왼쪽 정렬, 수직 가운데 정렬, 패딩 상하 12·좌우 16을 사용한다.
- 계좌번호는 `Table / Cell variant=last, onlyNumber=true`, 상품명은 `variant=last, onlyNumber=false`다. 마지막 열의 오른쪽 테두리를 제거하는 변형과 숫자 스타일을 구분한다.
- 원본 계좌번호에 포함된 끝의 개행·상품명의 끝 공백은 샘플 데이터 흔적이다. 실제 표시 데이터에서 불필요한 개행·공백을 그대로 재현하지 않는다.
- 실행 섹션은 결과 표 뒤 gap 48에 배치한다. 중앙 primary large 버튼 154 × 56 하나이며 원본 라벨은 “버튼명”이다.
- 바깥 ButtonGroup은 `count=multi`이지만 슬롯에 실제 버튼은 1개다. 속성 이름만 보고 버튼을 추가하지 않는다.
- 원본에 별도 동의·보안 입력·진행 단계가 없으므로 다른 학습 패턴의 요소를 임의로 추가하지 않는다.

### 26.3. 공통 검수

- 전체 높이 검산: K는 HEADER 157 + BODY 971 + Footer 352 = 1480, L은 157+872+352=1381이다.
- 카드 너비 합, 카드 간격의 실제 차이, 제목의 실제 서체·높이, 빈 상태와 정보 표의 구분을 확인한다.
- 누락 폰트는 두 화면의 추출 본문에서 모두 0이었고 자간은 0px이었다.
- 기존 컴포넌트·스타일·토큰을 재사용한다. Footer는 13장의 지정 원형, 명명·그룹핑은 12장 기준을 따른다.

## 27. 한도계좌 해제 패턴의 식별자·보존 이미지

### 27.1. 이번 학습에서 사용한 식별자

기존 10·20·24장의 컴포넌트 표와 함께 사용한다. 같은 컴포넌트라도 슬롯과 실제 적용 서체를 확인한다.

| 컴포넌트 | 변형/용도 | main component key |
| --- | --- | --- |
| ImageContainer | `ratio=1:1`, 안내 이미지 96 × 96 | `2517340b251701779e5b8e8f9abb1a33080a650a` |
| Title / Section | `align=left`, 슬롯으로 카드 제목·결과 제목 구성 | `3f4d2d1fdde69c122f754927d46b0b2aacb2948e` |
| Item / Label | `variant=section` | `aa47c7184504e3f335ceb35219e8165762ea682c` |
| Item / Label | `variant=description-16` | `c93bdeedab40b0fdb123608f9c8d1e2d68aeaed4` |
| TextList / Unordered | `variant=bullet, size=14, depth=1` | `5e484496e22e7e84c91c23bddfe11d1b4a13f35b` |
| Feedback | `varient=small` | `5043fce90aa14ec77b4a1ca9816dc0b3f746d0ea` |
| status-nodata | 대상 없음 아이콘 | `9c863558712ee6cd973b806d707e4f2be93323d5` |
| Table / Cell | `variant=last, onlyNumber=true` | `494e274bfc773051437a999b5ad37c61b4321cf4` |
| Table / Cell | `variant=last, onlyNumber=false` | `1b5a0ae0fefd157325271672a78224db2575f047` |
| ButtonGroup | `count=multi, size=large` | `f6fbbaad278bc5dc3e0568efdc16711894a01e47` |

### 27.2. 삭제 대비 보존 이미지

두 이미지는 저장소에 직접 보존한 0.7배 PNG이며 너비 1008px이다. 원본 링크가 삭제되어도 위 구조·치수·상태 기록과 함께 참조한다. 실제 생성에 원본의 플레이스홀더·기획 오류를 그대로 복제하지 않는다.

#### K — 대상 없음

![금융거래한도계좌 해제 — 대상 없음 학습 원본](assets/design-rules/limit-account-none.png)

#### L — 대상 있음

![금융거래한도계좌 해제 — 대상 있음 학습 원본](assets/design-rules/limit-account-eligible.png)

## 28. 추가 학습 — 1920 화면의 중앙 본문과 약관·목록 패턴

2026-11-09에 `05. 사고신고` 파일의 1920px 화면 3개를 추가 확인했다. 파일 키 `yojs1BhPrWxLmDDrpg1ihD`, 페이지 `05.기타(기획 v0.6)` (`5007:20503`)이다.

| 패턴 | 원본 이름 | 원본 링크 | 전체 크기 | BODY 높이 | Footer 시작 y |
| --- | --- | --- | --- | --- | --- |
| M — 집중형 약관동의 | 약관동의_집중형 | [5067:15618](https://www.figma.com/design/yojs1BhPrWxLmDDrpg1ihD?node-id=5067-15618) | 1920 × 2549 | 2040 | 2197 |
| N — 페이지네이션 목록 | 계좌개설 안내 | [5067:15805](https://www.figma.com/design/yojs1BhPrWxLmDDrpg1ihD?node-id=5067-15805) | 1920 × 1651 | 1142 | 1299 |
| O — 더보기 목록 | 계좌개설 안내 | [5067:16262](https://www.figma.com/design/yojs1BhPrWxLmDDrpg1ihD?node-id=5067-16262) | 1920 × 1607 | 1098 | 1255 |

N·O의 프레임 이름은 “계좌개설 안내”이지만 실제 내용은 자주쓰는 계좌 목록·등록 탭과 관리 표다. 패턴은 표시된 실제 구성으로 분류하며, 원본 이름을 업무 내용의 근거로 삼지 않는다.

### 28.1. 1920 화면의 공통 폭·좌표

- 화면은 1920px이지만 **BODY는 1440px 너비로 중앙 배치**되어 x=240이다. 유효 콘텐츠는 BODY 안 좌우 패딩 40을 제외한 1360px, 시작 x=280이다.
- 검산: (1920−1440)/2=240, 240+40=280, 1440−80=1360.
- HEADER와 Footer는 화면 폭 1920을 사용한다. HEADER 높이는 157, BODY 시작 y=157, 첫 콘텐츠 y=205다.
- 본문 상하 패딩 48, 주요 섹션 사이 gap 48을 유지한다.
- 1920 화면이라는 이유로 BODY를 1920, 콘텐츠를 1840으로 늘리거나 1440용 UI 전체를 비례 확대하지 않는다.
- 이 값은 확인한 1920 패턴의 구조다. 아직 보지 않은 화면 폭에서의 최소·최대 너비나 반응형 분기까지 확정한 것은 아니다.
- 원본 Footer는 일반 프레임이지만 실제 생성 시 13장의 지정 Footer 인스턴스를 화면 폭에 맞춰 사용한다.

### 28.2. 서체·원본 상태 검수

- M·O의 추출 본문은 누락 폰트 0이었다. N은 추출 본문에서 `hasMissingFont=true`가 57개 감지됐다. 실제 생성 전 해당 폰트·스타일을 확인하고 임의로 대체 폰트나 다른 크기를 적용하지 않는다.
- 세 화면의 추출 텍스트 자간은 모두 0px이다.
- M의 세로 단계 숫자는 **실제 Pretendard 17/24**다. 기존 E의 16/24와 구분하며 같은 컴포넌트 이름만 보고 크기를 통일하지 않는다.
- N의 안내 불릿은 KBFG Text Light 14/20, O는 Light 16/24다. 이 차이로 안내 박스 높이와 이후 섹션 위치가 달라진다.
- 플레이스홀더 제목·라벨·표 데이터와 업무 내용 불일치는 기존 8장의 주의사항처럼 실제 기획에 맞게 교체한다.

## 29. 패턴 M — 집중형 약관·다단계 동의

### 29.1. 본문 2열과 하단 실행

```text
## BODY — 1440, padding 48 40, Vertical, gap 48
├─ 본문 Container — 1360, Horizontal, gap 32
│  ├─ Main — 1012, Vertical, gap 48
│  │  ├─ 페이지 제목
│  │  └─ 안내·약관·최종 동의
│  └─ Right — 316, 세로 단계 카드
└─ 실행 Container — 1360, 가운데 “다음”
```

- 본문 너비 검산: 1012+32+316=1360이다. E의 LNB 포함 316/664/316 3열 패턴과 구분한다. **이 화면에는 LNB가 없다.**
- 왼쪽 Main은 (280,205), 1012 × 1840이고, 오른쪽 카드는 (1324,205), 316 × 280이다.
- 제목은 “약관을 확인해 주세요”, 26/36 Bold, 높이 36이다. 다음 안내·약관 스택은 y=289에서 시작한다.
- 원본 BODY의 상위 Container는 2개이며 이름은 `Container 1`, `Container 5`다. 번호 때문에 Container를 다섯 개로 늘리거나 역할을 나누지 않는다. 정리 시 실제 개수·순서·부모를 보존하고 12장의 번호 규칙으로 이름을 판정한다.
- 하단 버튼 섹션은 (280,2093), 1360 × 56이다. “다음” primary large 154 × 56은 x=883, 화면/1360 콘텐츠 영역의 중앙에 놓인다.
- 버튼을 왼쪽 Main 1012의 중앙으로 이동하지 않는다. 버튼 섹션의 정렬 기준은 양쪽 열을 포함한 상위 1360 영역이다.

### 29.2. 안내·약관 그룹의 순서와 간격

왼쪽 내용 스택은 1012 × 1756, 세로 gap 20이다.

| 요소 | y | 너비 | 높이 |
| --- | --- | --- | --- |
| Infobox / Solid | 289 | 1012 | 44 |
| 전체 약관 모두 동의 그룹 | 353 | 1012 | 353 |
| 고객정보 동의서 모두 동의 그룹 | 726 | 1012 | 309 |
| 상품설명서 모두 동의 그룹 | 1055 | 1012 | 233 |
| 상품서비스 안내 등 모두 동의 그룹 | 1308 | 1012 | 613 |
| 최종 동의·주의 문구 묶음 | 1941 | 1012 | 104 |

높이 검산: 44+353+309+233+613+104 + 20×5 = 1756이다.

- `Infobox / Solid size=medium, status=info`는 상하 12·좌우 16 패딩, gap 16, radius 12, #FAFAFA다. 본문은 Medium 14/20이며 “신규 가입을 위한 약관 동의를 해주세요.”가 표시된다.
- 약관 그룹은 `ConsentGroup` 인스턴스 4개다. 각 그룹 내부 컨테이너는 radius 12, 테두리 #E5E5E5, 상하 패딩 20·좌우 32다. 안쪽 너비는 948이다.
- 바깥 ConsentGroup의 패딩 0과 내부 컨테이너 패딩을 구분하고, 외부 래퍼에 32px을 또 추가하지 않는다.
- 체크 상태·필수/선택 구분·약관 상세 열기·전체 동의 연동은 실제 인스턴스 상태와 업무 기획을 따른다. 원본에 보이는 체크 표시만으로 모든 약관이 필수이거나 동의가 완료됐다고 확정하지 않는다.
- 약관명과 안내 문구는 이 화면의 기획 내용이다. 다른 상품의 동의 범위나 법적 문구로 그대로 적용하지 않는다.

### 29.3. 동의 계층

| 구성 | 실제 변형 | 높이·패딩 | 서체 |
| --- | --- | --- | --- |
| 그룹 최상위 모두 동의 | Item / Consent 1d | 높이 48, 상하 12 | Bold 16/24, #1C1C1C |
| 개별 약관 | Item / Consent 2d | 높이 40, 상하 8 | Medium 16/24, #444444 |
| 펼쳐진 하위 동의 묶음 | Item / Consent 3d-group | 샘플 116, 좌측 32·아래 12 | “동의 항목” Light 16/24 |
| 하위 체크 항목 | Item / Consent 3d | 높이 32, 내부 너비 916 | Light 14/20, #444444 |

- 최상위 동의와 세부 약관 사이 Divider 래퍼 높이는 21이다: 위 8 + 선 1 + 아래 12.
- 첫 그룹은 최상위 48 + Divider 21 + 개별 항목 6×40 + 슬롯 하단 4 + 컨테이너 상하 40 = 353이다.
- 고객정보 그룹은 최상위 48 + Divider 21 + 개별 40 + 하위 동의 묶음 116 + 개별 40 + 슬롯 하단 4 + 상하 40 = 309다.
- 상품설명서 그룹은 개별 약관 3개, 마지막 안내 그룹은 개별·중첩 동의가 혼합되어 높이 613이다. 모든 그룹을 같은 높이나 같은 항목 개수로 맞추지 않는다.
- 1d/2d/3d/3d-group의 실제 계층·들여쓰기·펼침 아이콘을 유지한다. 평평한 Checkbox 목록으로 풀어 만들거나 컴포넌트를 detach하지 않는다.

### 29.4. 최종 동의·주의 문구와 단계 카드

- `ConsentFinal variant=muted`는 1012 × 56이다. 내부 배경 #FAFAFA, radius 12, 컨테이너 패딩 상하 4·좌우 28 안에 48 높이 동의 항목이 들어간다.
- 최종 동의 뒤 gap 12, 별표 주의 문구 래퍼는 1012 × 36이다. 패딩 8, radius 12, 원본 fill #FFFAF5이며 안쪽 `TextList / Unordered variant=star, size=14, depth=1`은 996 × 20이다.
- 별표 문구의 일반 본문은 Light 14/20이다. 확인 의미·동의 문장을 임의로 요약하거나 다른 체크 항목과 합치지 않는다.
- 오른쪽 단계 카드는 패딩 20, radius 20, 내부 너비 276이다. 단계 5개는 각각 32 높이, gap 20이므로 32×5+20×4=240, 카드 전체는 280 높이다.
- 현재는 2단계 “가입범위 선택”, 1단계는 완료, 3~5단계는 미시작이다. 현재 라벨은 Bold 16/24 #1F6AFF, 미시작 라벨은 Medium 16/24 #6E6E6E다.
- 스크롤 시 카드 고정/sticky·약관 상세 열기·동의 전후 다음 버튼 활성화 동작은 정적 화면만으로 확정하지 않는다.

## 30. 패턴 N·O — 페이지네이션형·더보기형 관리 목록

두 화면은 기존 B의 안내·탭·8열 계좌 목록 패턴을 1920 중앙 BODY 안에서 재사용한다. 주요 차이는 안내 불릿 크기, 표 하단 기능과 목록 탐색 방식이다.

### 30.1. 공통 표와 툴바

- BODY 상위 Container는 제목·안내·목록의 3개다. 원본에는 별도 페이지 하단 대형 실행 버튼이 없다.
- 제목 y=205, 안내 y=289, 본문 폭 1360이다.
- Tab 높이 60, 선택 “자주쓰는 계좌 목록” Bold 20/28 #1C1C1C, 비선택 “자주쓰는 계좌 등록” Medium 20/28 #8D8D8D다.
- 탭과 40px 툴바 사이 gap 20, 툴바와 표 사이 gap 20이다.
- 툴바 오른쪽은 388 × 40: 계좌순서변경 120 → gap 8 → 계좌그룹관리 100 → gap 8 → 그룹 전체 InputField 152다.
- 왼쪽 건수는 “레이블명 1/10건” 샘플이다. 라벨은 Medium 14/20 #8D8D8D, 첫 숫자는 Pretendard SemiBold 17/24 #1F6AFF, 분모 숫자는 같은 폰트 #444444, 단위 “건”은 Bold 14/20 #444444다.
- “1/10”의 의미를 선택 건수·현재 페이지 등으로 단정하지 않는다. 실제 기획에 맞는 의미·라벨·데이터를 적용한다.
- 표는 1360 × 540, 8열, 헤더+데이터 10행이다. 행 높이 49, 상단선 1, 실제 Grid 행·열 gap 0이다.
- 열 너비는 선택 80 + 두 번째 열 120 + 나머지 6열 각 (1360−200)/6 ≈ 193.333이다. 헤더·내용의 가운데 정렬과 패딩 12 16을 유지한다.
- 첫 열은 24 × 24 CheckBox다. Radio로 바꾸지 않는다. 실제 업무의 전체 선택·행 선택·indeterminate 상태를 구분한다.
- 원본의 “기관명” 열에 순번이 표시되고, “출금등록/해제” 열에 계좌명 예문이 들어간다. 8장에서 기록한 템플릿 의미 불일치와 동일하게 취급하며 실제 데이터와 헤더를 일치시킨다.
- 표 아래 도구 행은 왼쪽 필터·검색·편집, 오른쪽 txt. 저장·엑셀 저장·인쇄다. 왼쪽 그룹 161 × 20, 오른쪽 216 × 20, 각 그룹 내부 gap 16, 양끝 정렬이다.
- 왼쪽 TextButton은 각각 43 × 20, 오른쪽은 69·72·43 너비이며 모두 높이 20이다. 표와 도구 행 사이 gap은 16이다.

### 30.2. N — 페이지네이션과 다중선택 그룹 변경

| 요소 | x | y | 너비 | 높이 |
| --- | --- | --- | --- | --- |
| 안내 | 280 | 289 | 1360 | 90 |
| 탭 | 280 | 427 | 1360 | 60 |
| 건수·상단 툴바 | 280 | 507 | 1360 | 40 |
| 표 | 280 | 567 | 1360 | 540 |
| 표 아래 도구 행 | 280 | 1123 | 1360 | 20 |
| 일괄 그룹 변경 행 | 280 | 1159 | 1360 | 40 |
| 페이지네이션 | 280 | 1215 | 1360 | 36 |

- 안내는 Light 14/20 불릿 2개, 박스 패딩 20 24, radius 12, 높이 90이다.
- 표 이후 섹션은 표 540 → gap 16 → 도구 행 20 → gap 16 → 일괄 그룹 변경 행 40 → gap 16 → 페이지네이션 36으로 684 높이다.
- 그룹 변경은 오른쪽 289 × 40 영역에 “다중선택 그룹변경” 라벨 103 + gap 8 + InputField 120 + gap 8 + 이동 버튼 50을 둔다.
- 페이지네이션은 `Pagination / Basic`, 높이 36이며 콘텐츠 가운데 정렬이다.
- 원본 1번 항목은 active, 2번은 hover, 나머지는 enabled 예시다. 두 개의 활성 페이지로 해석하지 않는다.
- 전체 목록 섹션은 Tab 60 + gap 20 + 툴바 40 + gap 20 + 하단 포함 표 영역 684 = 824다.

### 30.3. O — 더보기

| 요소 | x | y | 너비 | 높이 |
| --- | --- | --- | --- | --- |
| 안내 | 280 | 289 | 1360 | 98 |
| 탭 | 280 | 435 | 1360 | 60 |
| 건수·상단 툴바 | 280 | 515 | 1360 | 40 |
| 표 | 280 | 575 | 1360 | 540 |
| 표 아래 도구 행 | 280 | 1131 | 1360 | 20 |
| 더보기 행 | 280 | 1167 | 1360 | 40 |
| 실제 더보기 버튼 | 900 | 1167 | 120 | 40 |

- 안내 불릿은 `TextList / Unordered size=16`, Light 16/24다. N보다 안내 박스가 8px 높아 탭·툴바·표 위치도 8px 아래다.
- 표 이후는 표 540 → gap 16 → 도구 행 20 → gap 16 → 더보기 행 40으로 전체 632 높이다.
- 더보기는 secondary small 버튼 120 × 40, radius 6, 흰 배경·#A5A5A5 테두리다. 플러스 아이콘과 “더보기” 라벨을 유지한다.
- N의 다중선택 그룹변경 행과 페이지네이션을 O에 추가하지 않는다. 실제 기획이 더보기형이면 그 탐색 방식을 유지한다.
- 전체 목록 섹션은 Tab 60 + gap 20 + 툴바 40 + gap 20 + 하단 포함 표 영역 632 = 772다.
- 더보기 클릭 시 추가 행 수·종료 상태·로딩·실패 동작은 정적 화면에서 확인되지 않았다.

## 31. 추가 식별자·삭제 대비 보존 이미지

### 31.1. 약관·동의와 16px 안내 컴포넌트

| 컴포넌트 | 확인 변형 | main component key |
| --- | --- | --- |
| Infobox / Solid | `size=medium, status=info` | `18356a16cb958afdf54f8fe4da07401b6412640d` |
| ConsentGroup | `ConsentGroup` | `57c6f66085338e360c0c8cff4da4c8881842ad49` |
| Item / Consent | `variant=1d` | `ebac2930b3bb7662d3b37ef88d01213c7785aa81` |
| Item / Consent | `variant=2d` | `8295a350882644017a887db15ec7c69aef378086` |
| Item / Consent | `variant=3d-group` | `8109cc712d77c5ed727737b7f6f55fcc73d986c2` |
| Item / Consent | `variant=3d` | `5b52e206cba5f7c61b58dd02c98de74f41013ce6` |
| ConsentFinal | `variant=muted` | `d711b66277395b32eb043de1549c940dfa195b0d` |
| TextList / Unordered | `variant=star, size=14, depth=1` | `46dcbc74d52e84d05f8f79c5f152bb5d988efd45` |
| TextList / Unordered | `variant=bullet, size=16, depth=1` | `aed12ecd6e049579810ce5b245bb0f100cc4b8e1` |

기존 표·탭·페이지네이션·StepIndicator·BoxButton 키는 앞선 식별자 표를 재사용한다. 같은 이름이어도 실제 슬롯 구성·폰트 크기·상태를 확인한다.

### 31.2. 보존 이미지

3개 이미지를 저장소에 직접 보존했다. 원본 1920px 화면의 0.5배 PNG이며 이미지 너비는 960px이다. 위에 기록한 논리 px를 기준으로 재현하고, 이미지 픽셀을 역으로 실측 규칙으로 사용하지 않는다.

#### M — 집중형 약관동의

![집중형 약관 동의 — 1920 원본](assets/design-rules/consent-focused-1920.png)

#### N — 페이지네이션형 목록

![계좌 목록 — 페이지네이션과 일괄 그룹 변경](assets/design-rules/account-list-pagination-1920.png)

#### O — 더보기형 목록

![계좌 목록 — 더보기](assets/design-rules/account-list-load-more-1920.png)

### 31.3. 생성·재현 검수

1. 1920 화면 안 BODY 1440 중앙 배치와 콘텐츠 x=280·너비 1360을 확인한다.
2. M은 LNB 없는 1012/316 두 열, 그룹 4개와 최종 동의·별표 안내, 상위 콘텐츠 전체 기준의 다음 버튼 정렬을 유지한다.
3. 동의의 깊이·들여쓰기·실제 체크/펼침 상태, 원형 연결, 내부 패딩을 확인한다. 약관 내용과 동의 연동은 기획과 대조한다.
4. N·O는 14px/16px 안내의 높이 차이, 8열 너비 합·행 높이, 실제 Grid gap을 확인한다.
5. N의 그룹 변경+페이지네이션과 O의 더보기를 구분한다. 플레이스홀더·열 의미 불일치·active/hover 예시를 업무 동작으로 확정하지 않는다.
6. M 157+2040+352=2549, N 157+1142+352=1651, O 157+1098+352=1607로 원본 전체 높이를 검산한다.
7. 이름·Container는 12장, Footer는 13장 기준을 적용하고 서체·누락 폰트·잘림·겹침을 검수한다. 통과한 검수는 반복하지 않는다.

## 32. 추가 학습 — 파일 업로드 전후와 로그아웃 안내 참조 갱신

2026-11-09에 브랜치/직접 파일 링크 3개와 사고신고 사본 링크 3개를 대조했다. 원본 링크가 삭제되어도 재현할 수 있도록 아래 실측·상태·원형 식별자와 이미지 3장을 보존한다.

| 구분 | 사고신고 사본 원본 | 브랜치/직접 파일의 대응 원본 |
| --- | --- | --- |
| P — 파일 선택 전 | [5084:21930](https://www.figma.com/design/yojs1BhPrWxLmDDrpg1ihD?node-id=5084-21930) | [18182:107459](https://www.figma.com/design/ftIWLlgj5Ldgt1uyQu9Gb8/branch/GDnwWiuiGzIZA734GOm3Yr?node-id=18182-107459) |
| Q — 파일 선택 후 | [5084:21945](https://www.figma.com/design/yojs1BhPrWxLmDDrpg1ihD?node-id=5084-21945) | [18182:107474](https://www.figma.com/design/ftIWLlgj5Ldgt1uyQu9Gb8/branch/GDnwWiuiGzIZA734GOm3Yr?node-id=18182-107474) |
| J 추가 참조 — 로그아웃 안내 | [5084:21960](https://www.figma.com/design/yojs1BhPrWxLmDDrpg1ihD?node-id=5084-21960) | [16082:62748 — v0.97 PC 링크](https://www.figma.com/design/GDnwWiuiGzIZA734GOm3Yr?node-id=16082-62748) |

- 사고신고 사본 파일 키는 `yojs1BhPrWxLmDDrpg1ihD`, 페이지 `05.기타(기획 v0.6)` (`5007:20503`)이다.
- 브랜치 링크의 원본 파일 키는 `ftIWLlgj5Ldgt1uyQu9Gb8`, 브랜치 키는 `GDnwWiuiGzIZA734GOm3Yr`다. 직접 v0.97 PC 링크의 파일 키도 `GDnwWiuiGzIZA734GOm3Yr`이며 지정 노드들은 `Templates (작성중)` (`15115:110263`)에서 확인했다.
- 이 출처 기록만으로 13장의 기준 디자인 시스템을 다른 사본으로 일괄 전환하지 않는다. 생성 시 기준 원형과 학습 출처의 변형·슬롯을 확인한다.
- 브랜치와 사본의 표시 구성·치수는 대응하지만 원형 키는 다르다. 같은 이름의 Popup·InputField라도 키를 혼용하지 않는다.
- Popup의 type=layer, vatiant=default, Header 64, Footer 48, radius 24, 검정 20% 딤, 그림자 (0,4,16,0, rgba(12,17,29,0.10))는 21장의 공통 규격을 재사용한다.
- 본문 Slot의 아래 패딩은 P·Q에서 **32**다. 21장의 앞선 예시에 있는 아래 패딩 24를 모든 Popup에 강제로 적용하지 않는다.
- 사용자 정의 래퍼는 영문 역할명·실제 Auto Layout으로 정리하고 Slot별 Container 개수를 판단한다. 컴포넌트 원형의 Item / Header·Slot·Item / Footer 계층은 유지한다.

## 33. 패턴 P·Q — 파일 업로드 팝업의 입력 상태 전환

### 33.1. 공통 구조·치수

두 원본은 1440 × 850 배경의 중앙에 같은 640 × 370 Popup을 배치한다. Popup 좌표는 (400,240)이며 파일 선택 전후에 팝업 크기·위치·전체 높이를 바꾸지 않는다.

| 요소 | x | y | 너비 | 높이 |
| --- | --- | --- | --- | --- |
| Popup | 400 | 240 | 640 | 370 |
| Header | 400 | 240 | 640 | 64 |
| Body Slot | 400 | 304 | 640 | 234 |
| 안내 박스 | 424 | 316 | 592 | 118 |
| 파일 선택 행 | 424 | 466 | 592 | 40 |
| InputField | 424 | 466 | 493 | 40 |
| 파일첨부 버튼 | 925 | 466 | 91 | 40 |
| Footer | 400 | 538 | 640 | 48 |

- Body Slot은 세로 Auto Layout, 패딩 위 12·좌우 24·아래 32, 자식 사이 gap 32다.
- 콘텐츠 너비는 640−24×2=592다. 파일 선택 행은 493+8+91=592다.
- Body 높이 검산: 위 12 + 안내 118 + gap 32 + 파일 행 40 + 아래 32 = 234.
- Popup 높이 검산: Header 64 + Body 234 + Footer 48 + 바깥 하단 패딩 24 = 370.
- Header 제목은 “파일 업로드”, Bold 16/24 #1C1C1C다. 원형의 우측 닫기 컨트롤을 유지한다.
- 안내 박스는 `Infobox / FullWidth`, radius 12, #FAFAFA, 패딩 상하 20·좌우 24, 불릿 3개다. 본문은 KBFG Text Light 14/20 #1C1C1C다.
- 안내에는 엑셀 형식, 1회 최대 500건, 재첨부 시 기존 파일 교체가 적혀 있다. 이는 이 화면의 예시 안내다. 다른 업로드 화면의 허용 확장자·파일 크기·건수·서버 검증 정책까지 일반화하지 않는다.
- Footer는 medium 버튼 2개, 각 136 × 48, gap 8, 전체 280이다. tertiary 배경 #EDEDED, primary 배경 #444444의 팝업 스타일을 재사용하며 라벨 “버튼명”은 실제 기획으로 교체한다.
- 팝업 내부 Footer는 은행 공통 페이지 Footer와 별개이며, 13장의 페이지 Footer 컴포넌트를 팝업 안에 추가하지 않는다.

### 33.2. P — 파일 선택 전

- 실제 원본 프레임명은 “파일업로드전”이다.
- InputField는 `entered=false, disabled=false, error=false` 상태다.
- 표시 문구는 “파일을 선택해주세요”, KBFG Text Bold 14/20, #8D8D8D다.
- 파일명·내부 삭제 버튼은 표시하지 않는다.
- 우측 “파일첨부”는 secondary small 91 × 40, radius 6, 흰 배경·#A5A5A5 테두리, Bold 14/20 #1C1C1C다.
- 원본 Slot 안에는 안내 Container 1과 파일 행을 담은 Container 2가 있다. Container 2 내부의 “업로드 전”은 상태 설명용 한글 이름이므로 사용자 정의 레이어 정리 시 12장의 영문 역할 명명을 적용한다.

### 33.3. Q — 파일 선택 후

- 실제 원본 프레임명은 “파일업로드후”다. 정적 원본에서 확정할 수 있는 상태는 **파일명이 들어간 입력 상태**다. 서버 업로드·검증 성공 완료를 나타내는 화면으로 단정하지 않는다.
- InputField는 `entered=true, disabled=false, error=false`이며, 원형 내부 Item / Input의 관측 변형은 `variant=giro`다. 파일명과 버튼을 가진 슬롯 구성을 유지하되 giro 이름을 실제 업무 종류의 근거로 삼지 않는다.
- 예시 “파일명.xlsx”는 KBFG Text Bold 14/20, #1C1C1C다. 실제 파일명에 맞춰 표시한다.
- 입력필드 내부에 “삭제” tertiary xsmall 버튼 38 × 28을 표시한다. 삭제 라벨은 Bold 12/17이다.
- 바깥 파일첨부 버튼은 P와 같은 (925,466), 91 × 40이다. 내부 삭제 버튼이 생겼다고 바깥 첨부 버튼을 이동하거나 행 높이를 늘리지 않는다.
- 원본 Slot 안의 두 번째 자식은 직접 파일 행이며 별도 Container 2 래퍼가 없다. P와 구조를 통일하기 위해 Container를 임의 추가하지 않는다. Slot별 실제 개수와 기존 역할을 보존한다.
- 파일명을 넣기 위해 InputField를 일반 텍스트 프레임으로 바꾸거나, 삭제 버튼을 필드 밖에 임의 배치하지 않는다.
- 재첨부·삭제 후 상태 전환, 업로드 중·오류·긴 파일명 처리, Footer 버튼 활성화 조건은 정적 화면만으로 확정되지 않았다. 실제 기획을 적용한다.

### 33.4. 서체와 누락 폰트 검수

- 두 출처 모두 표시된 서체 구성은 위 표기를 따른다. 자간은 0px이다.
- 사고신고 사본 P의 추출 텍스트에서는 누락 폰트 표시 5개가 감지되었다. 사본 Q·로그아웃 추가 참조와 브랜치 3개에서는 누락 표시가 0이었다.
- 학습 이미지가 보인다는 이유로 폰트가 모두 정상이라고 단정하지 않는다. 실제 생성 전 해당 폰트·스타일을 확인하고 임의 대체 폰트·크기로 변경하지 않는다.

## 34. 패턴 J 추가 참조 — 22px 타이머 로그아웃 안내

이번 `5084:21960`과 v0.97 PC 직접 링크 `16082:62748`은 서로 같은 표시값으로 확인됐다. 23장의 이전 `5067:7408` 참조와 기본 구조는 같지만 아래 실제 적용값은 다르다.

| 항목 | 23장 이전 참조 | 이번 참조 |
| --- | --- | --- |
| Popup | 400 × 320, (520,290) | 동일 |
| 남은 시간 서체 | Pretendard SemiBold 20/28 | **Pretendard SemiBold 22/28** |
| “0:23” 프레임 너비 | 43 | 48 |
| 서비스 안내 색상 | #6E6E6E | **#8D8D8D** |
| 타이머 색상 | #1F6AFF | 동일 |

- 기존 23장 원본의 값을 삭제하지 않고 출처별 차이로 보존한다. 이번 참조를 기반으로 생성하는 경우 22/28과 #8D8D8D를 적용하며, 모든 과거 타이머를 자동 변경하는 규칙으로 확대하지 않는다.
- 배경 1440 × 900, Popup 중앙 (520,290), Header 64, Body 184, Footer 48, 바깥 하단 패딩 24, 전체 320 높이는 동일하다.
- 본문 337 × 120은 중앙 정렬이다. 설명 제목 28 → gap 12 → 타이머 28 → gap 12 → 설명 두 줄 40을 유지한다.
- “자동 로그아웃 남은시간”은 KBFG Text Bold 20/28 #444444, 안내 문구는 Light 14/20이다.
- 타이머 크기가 커져도 높이 28을 유지한다. 예시 “0:23”의 48px 너비를 모든 시간 문자열에 고정하지 않는다.
- 왼쪽 “지금 로그아웃” tertiary medium과 오른쪽 “로그인 연장” primary medium의 실제 라벨·순서를 유지한다. 각 버튼 136 × 48, gap 8이다.
- 남은 시간·세션 연장·0초·닫기 동작은 별도 업무 기획을 따른다. 타이머 정적 값으로 보안 시간 정책을 새로 정의하지 않는다.

## 35. 업로드·로그아웃 참조의 원형 키와 보존 이미지

### 35.1. 출처별 main component key

아래는 이번 브랜치와 사고신고 사본에서 각각 확인한 원형이다. 동일한 이름·치수라도 출처에 따라 키가 달라, 가져오기 전에 기준 라이브러리와 변형·슬롯을 확인한다.

| 컴포넌트 | 브랜치/v0.97 PC에서 관측 | 사고신고 사본에서 관측 |
| --- | --- | --- |
| Popup | `98e1f7f1a08091bbcb6f8e25627d8951d2338ba8` | `58f575d37a8d4d83a30238c8f75b152d4e42db93` |
| Item / Header | `af619ecf80947e7f1b4f07de08db38f574703a17` | `2cbf7cb8b3527095493ddec2903fcfe47ac00798` |
| Item / Footer | `b0077aa8bd9b55679fb236067f60c29c65701251` | `e20c54e3621cf093f53c6a565a37c5811b583839` |
| ButtonGroup — medium | `ae3a99567323826ef6ff58b408e369486be89629` | `8923faa9126db7ef087595a2d123151588618ff6` |
| InputField — entered=false | `6eb7815286692dc574ebe162983fcb9afe06fc05` | `6a180f941f7bc12168489ec44f9203d0f3a4e7cc` |
| InputField — entered=true | `a093b7a53adbf43b22d53daf0b76f7c424513330` | `f689ed1a91c3666eab721996119a0b3540668190` |
| BoxButton — 삭제 xsmall | `0c05fe90086b423965f7e0ccf53c33c2c207d2f3` | `7c76cd19c1f5948110684820f9fdecaf97eab59c` |
| BoxButton — primary medium | `c30adfbd61e4b30ca6feae03a56f77b10678909f` | `c4ab4c1ce45fb8f3c1975cf3a624c6f05b561767` |

- 업로드 안내의 Infobox / FullWidth는 브랜치 `14346e87099b727159e6e8cd5bfb876c0d0f7892`, 사고신고 사본 `5fb7ce75dbc07c0aeca6e8cd5bfb876c0d0f7892`다.
- 바깥 “파일첨부” secondary small은 두 출처 모두 `b20b82eee273f930c668788109e73de668023c03`다.
- 원형의 `vatiant` 표기를 유지하고, 원형 연결을 detach하지 않는다. 사용자 정의 래퍼 명명은 12장, 디자인 시스템 및 일반 페이지 Footer는 13장을 따른다.

### 35.2. 삭제 대비 이미지

이미지는 사고신고 사본의 전달 시점 화면을 0.7배 PNG(너비 1008px)로 저장소에 직접 보존한 것이다. 기존 23장의 로그아웃 이미지도 이전 값의 근거로 유지한다.

#### P — 파일 선택 전

![파일 업로드 팝업 — 파일 선택 전](assets/design-rules/file-upload-before.png)

#### Q — 파일 선택 후

![파일 업로드 팝업 — 파일명과 내부 삭제 버튼](assets/design-rules/file-upload-after.png)

#### J 추가 참조 — 22px 타이머

![자동 로그아웃 안내 — 22px 타이머 참조](assets/design-rules/auto-logout-22px.png)

### 35.3. 재현 검수

1. 파일 선택 전후 Popup 640 × 370, (400,240), Body 아래 패딩 32와 바깥 하단 패딩 24를 구분한다.
2. 592px 파일 행 안 493px 필드 + gap 8 + 91px 첨부 버튼, 높이 40을 확인한다.
3. P/Q의 entered 상태, placeholder/파일명 색상, 내부 삭제 버튼 유무·38 × 28 크기, 실제 원형 연결을 확인한다.
4. 새 로그아웃 참조의 타이머 22/28과 안내 #8D8D8D를 이전 20/28·#6E6E6E와 구분한다.
5. 실제 업무 안내·버튼 라벨·동작을 기획과 대조하고 누락 폰트·텍스트 잘림·겹침·중복 패딩을 확인한다. 통과한 검수는 반복하지 않는다.

## 36. 패턴 R·S — 가입 단계 안내

### 36.1. 출처와 적용 범위

- 파일: 사고신고 `yojs1BhPrWxLmDDrpg1ihD`, 페이지 `05.기타(기획 v0.6)`.
- [R — 가입단계 안내 / 스타일 오버라이드](https://www.figma.com/design/yojs1BhPrWxLmDDrpg1ihD?node-id=5090-25135): 1920 × 1721.
- [S — 가입단계 안내](https://www.figma.com/design/yojs1BhPrWxLmDDrpg1ihD?node-id=5090-25320): 1920 × 1709.
- 둘 다 가입 절차를 미리 설명하는 5단계 안내 화면이다. 서로 다른 진행 상태를 나타내는 전후 화면으로 해석하지 않는다.
- R의 오버라이드를 모든 ProgressStep의 기본값으로 확대하지 않는다. 실제 기획에서 선택한 기본형·오버라이드형을 명확히 적용한다.
- 단계명, 준비물 내용, 상품 목록, 주의사항 및 “버튼명”은 원본 예시다. 실제 화면의 업무 내용·버튼 목적·이동 경로는 기획을 따른다.

### 36.2. 공통 셸과 실제 배치

원본은 흰색 Vertical 화면이며 HEADER → BODY → FOOTER의 gap은 0이다. 이번 두 화면의 Header는 **Breadcrumbs → GNB** 순서다. 기존 다른 참조의 GNB → Breadcrumbs 순서를 덮어쓰는 공통 규칙으로 확정하지 않는다. Header에도 “기업용헤더 X”가 표시되어 있으므로 실제 화면의 승인된 기업용 셸을 확인한다.

- HEADER: 1920 × 159. Breadcrumbs Area는 y=0, 높이 49, 배경 #FAFAFA다. 내부 Breadcrumbs는 x=240, 너비 1440, padding 16 40이다.
- GNB / Channel: (240,49), 1440 × 110.
- BODY: x=240, y=159, 너비 1440, padding 48 40, Vertical gap 48. 유효 콘텐츠는 x=280, 너비 1360이다.
- 페이지 제목 “가입 단계 안내”: (280,207), 1360 × 36, KBFG Text Bold 26/36, #1C1C1C.
- FOOTER: 너비 1920, 높이 352. 신규 생성에서는 13장의 지정 Footer 인스턴스를 사용한다.

| 영역 | R: y / 높이 | S: y / 높이 |
| --- | --- | --- |
| BODY | 159 / 1210 | 159 / 1198 |
| Container 1 — 페이지 제목 | 207 / 36 | 207 / 36 |
| Container 2 — 단계·준비물 안내 | 291 / 422 | 291 / 410 |
| Container 3 — 상품 안내 Accordion | 761 / 280 | 749 / 280 |
| Container 4 — 주의사항 Accordion | 1089 / 128 | 1077 / 128 |
| Container 5 — 하단 Button Area | 1265 / 56 | 1253 / 56 |
| FOOTER | 1369 / 352 | 1357 / 352 |

실제 본문 Container는 5개다. 이를 임의로 합치거나 분할하지 않는다. 사용자 정의 래퍼는 12장의 명명 기준으로 정리하고, 디자인 시스템 인스턴스의 고유 내부 이름은 유지한다.

```text
Screen
├─ ## HEADER
│  ├─ Breadcrumbs Area
│  └─ GNB / Channel
├─ ## BODY
│  ├─ Container 1
│  │  └─ Title / Page
│  ├─ Container 2
│  │  └─ ProgressStep / Infobox
│  │     ├─ ProgressStep
│  │     └─ Infobox
│  ├─ Container 3
│  │  └─ Accordion — 상품 안내
│  ├─ Container 4
│  │  └─ Accordion — 주의사항
│  └─ Container 5
│     └─ Button Area
│        └─ ButtonGroup
└─ ## FOOTER — 지정 컴포넌트 인스턴스
```

이 트리는 역할을 정리한 제작 명명 예다. `ProgressStep / Infobox`와 `Button Area`는 사용자 정의 래퍼이며, 원본의 일반 프레임을 라이브러리 컴포넌트로 오인하지 않는다.

## 37. ProgressStep·준비물의 치수와 스타일 차이

### 37.1. Container 2와 단계 영역

Container 2는 너비 1360, Vertical gap 32, 위·아래 padding 12, 좌우 0, radius 24다. 프레임 속성의 fill은 #FAFAFA이며, 실제 표시에는 내부 자식의 배경도 반영된다.

| 항목 | R — 스타일 오버라이드 | S — 기본형 |
| --- | --- | --- |
| 단계 바깥 래퍼 | (280,303), 1360 × 190 | (280,303), 1360 × 178 |
| 래퍼 padding: 위/오른쪽/아래/왼쪽 | 32 / 32 / 32 / 32 | **32 / 0 / 32 / 32** |
| 실제 ProgressStep 인스턴스 | (312,335), 1296 × 126 | (312,335), 1328 × 114 |
| 5개 항목 각각의 너비 | 259.2 | 265.6 |
| 원형 variant 이름 | align=center | align=left |
| 실제 내부 Item 정렬 | **5개 모두 align=left** | 5개 모두 align=left |
| 번호 서체 | Pretendard SemiBold 15/20, #FFFFFF | Pretendard Regular 15/20, #1C1C1C |
| 번호 원형 표시 | 파란색 원형 | 옅은 회색 원형 |
| 단계 제목 | KBFG Text Bold **18/25**, #444444 | KBFG Text Bold **14/20**, #444444 |
| 단계 설명 | KBFG Text Medium **14/20**, #6E6E6E | KBFG Text Light **12/17**, #6E6E6E |
| 보조 링크 “버튼명” | KBFG Text Medium 12/17, #444444 | 동일 |

- ProgressStep은 가로 5등분, 항목 사이 gap 0이다. 각 Item은 Vertical gap 16이며 번호 원형은 32 × 32다. 첫 4개는 position=start, 마지막은 position=end다.
- R 원형의 `align=center`라는 이름만 보고 내부 텍스트를 모두 중앙 정렬하지 않는다. 내부의 실제 `Item / Infomation`은 왼쪽 정렬이다. 라이브러리 원형의 `Infomation` 표기는 임의 수정하지 않는다.
- R의 단계명은 “사업자 정보 확인 → 정보입력 → 본인인증 → 상품가입 → 가입완료”다. S의 “스텝명 입력”, 설명 “프로세스 내용 필요 시 사용”, 링크 “버튼명”은 자리표시자다.
- R의 번호가 모두 파란색이라는 정적 표현만으로 모든 단계가 완료되었거나 활성화되었다고 정의하지 않는다. 절차 개요 ProgressStep과 현재 단계 표시·검증 동작은 실제 기획에 따라 구분한다.
- R과 S의 단계 영역 높이 차이 12가 Container 2, 이후 Container 및 Footer y좌표에 그대로 반영된다. 동일한 y좌표를 강제로 적용하지 않는다.

### 37.2. 준비물 안내

- 준비물 박스: R은 (280,525), S는 (280,513), 모두 1360 × 176. padding 32, radius 12, fill #FAFAFA다.
- 내부 `Text / List`: 1296 × 112, 제목과 목록 gap 12. Title / Group “준비물”은 KBFG Text Bold 16/24, #1C1C1C다.
- 목록은 3행, 각 높이 20, 행간 gap 8로 총 76이다. 아이콘은 `status-circleCheck` 16 × 16, 행 위에서 2px 위치, 아이콘과 본문 간격 4다. 본문은 행 왼쪽에서 20px 뒤에 시작한다.
- 원본의 각 `TextList / Unordered` 행은 **이 이름을 가진 FRAME**이며 컴포넌트 인스턴스가 아니다. 생성 시 이름만으로 인스턴스 여부를 판단하지 않는다. 적절한 KBDS 컴포넌트를 재사용할 때도 실제 원형 연결과 아이콘·문장 배치를 확인한다.
- 원본의 준비물 목록은 “종합통장자동대출의 만기도래 및 이자내역 안내”, “CD/ATM 및 금융 VAN사 자동화기기를 통한 거래”, “제휴기관(증권사등) 자동화기기를 통한거래”다. 준비물 제목과 업무상 맞지 않는 예시이므로 실제 필요 서류·준비물로 확정하지 않는다.
- 높이 검산: 준비물은 padding 64 + 제목 24 + gap 12 + 목록 76 = 176. Container 2는 R: 24 + 190 + 32 + 176 = 422, S: 24 + 178 + 32 + 176 = 410이다.

## 38. 펼쳐진 상품·주의사항과 하단 버튼

### 38.1. 상품 안내 Accordion

- 두 화면 모두 `variant=standard, type=basic, size=large, expanded=true`, 1360 × 280이다.
- Title Area: 높이 68, 위·아래 padding 20, 가로 gap 12. “상품 안내”는 KBFG Text Bold 16/24, #444444다. 펼침 아이콘은 오른쪽 28 × 28이다.
- Expand Area: 내부 y=68, 높이 212, 위 padding 8, 아래 padding 20. 실제 Slot-contents는 내부 y=76, 높이 184, gap 8이다.
- 표는 라벨 열 180 + 값 열 1180 = 1360이다. 라벨은 “가입 대상 / 서비스 이용 시간 / 가입 가능한 상품”, KBFG Text Medium 14/20 #444444다. 일반 값은 Light 14/20 #1C1C1C이며, 상품 목록은 14px TextList를 사용한다.
- 예시 값 “개인사업자(공동사업자 제외)”, “24시간 365일 언제나 가능”과 상품 3개는 화면 샘플이다. 가입 자격·이용 시간·상품 정책으로 일반화하지 않는다.
- 펼침 상태와 슬롯 내용을 보존하며, 접힘 동작·초기 상태의 선택 정책은 실제 기획을 따른다.

### 38.2. 주의사항 Accordion

- 두 화면 모두 `variant=standard, type=basic, size=medium, expanded=true`, 1360 × 128이다.
- Header: 높이 56, 위·아래 padding 16, 가로 gap 8. 왼쪽 info 아이콘 24 × 24, 오른쪽 펼침 아이콘 24 × 24다.
- 제목 “주의사항”은 **R: KBFG Text Bold 14/20**, **S: Bold 16/24**로 다르며 색상은 모두 #444444다. 같은 원형·높이라도 실제 적용된 서체 오버라이드를 확인한다.
- Expand Area는 내부 y=56, 높이 72, 위 padding 8, 아래 padding 16이다. Slot-contents는 내부 y=64, 높이 48이며 20px 불릿 2행 + gap 8로 구성된다.
- 원본의 동일 주의문 2행을 실제 기획의 필수 중복 문장으로 확정하지 않는다.

### 38.3. Button Area와 Footer

- Container 5는 1360 × 56이며, large primary 버튼 하나를 가로 중앙에 배치한다. 버튼은 154 × 56, x=883, R y=1265 / S y=1253이다.
- 실제 ButtonGroup 원형은 `count=multi`지만 보이는 자식은 1개다. variant 이름만 보고 두 번째 버튼을 추가하지 않는다.
- “버튼명”은 자리표시자이며 실제 액션 라벨·활성화 조건·다음 화면은 업무 기획을 적용한다.
- BODY 높이는 padding 96 + 제목 36 + 안내 R 422/S 410 + 상품 280 + 주의 128 + 버튼 56 + 영역 간격 48 × 4 = R 1210 / S 1198이다.
- Footer는 BODY 다음에 gap 0으로 이어진다. 기존 학습 화면의 Footer가 일반 프레임이어도 새 화면에서는 13장의 지정 컴포넌트를 인스턴스로 넣는다.

## 39. 가입 단계 안내의 원형 키·이미지·검수

### 39.1. 관측한 main component key

사고신고 파일에서 확인한 키다. 지정 디자인 시스템에서 재사용할 때는 같은 이름뿐 아니라 실제 원형·변형·슬롯·토큰을 대조하고 연결을 유지한다.

| 컴포넌트 / 변형 | main component key |
| --- | --- |
| Title / Page | `366007b354df25708d9dce4a7788c2b44e30dba3` |
| ProgressStep — R, align=center | `5bc9c95cc0b4906f44ebdf25875a18daff8930c3` |
| ProgressStep — S, align=left | `56b1705e117b8613a4403f34bbf9fd0be5683476` |
| Item / Infomation — start / left / number | `5f02d9a1f43d6ef479cc5c6f36b3414e1b5f9a20` |
| Item / Infomation — end / left / number | `c62727408533955d60d88e88526f3ec8f752161c` |
| Item / ProgressStep — number | `72a7e48dd96459e737a0f31ba87bb3fa4e69d49e` |
| Title / Group — left | `99d19cfa876f2805be637934f717ffd2763720ca` |
| Accordion — standard/basic/large/expanded | `189002d3c4cd6147e4912221bc87a9af60a61a22` |
| Accordion — standard/basic/medium/expanded | `d14342b496bd3aa5d2e707cf26a183daf5d401ce` |
| TextList — 불릿 14px | `5e484496e22e7e84c91c23bddfe11d1b4a13f35b` |
| ButtonGroup — large, count=multi | `f6fbbaad278bc5dc3e0568efdc16711894a01e47` |
| BoxButton — primary large | `d206f834d8d80e5bd6ab306b8033f3c0e5214bc5` |

### 39.2. 원본 삭제 대비 이미지

전달 시점의 두 화면을 0.5배 PNG(너비 960px)로 저장소에 보존했다. 수치 재현은 위 논리 px를 사용하고, 이미지는 전체 배치·색·서체 차이를 확인하는 근거로 사용한다.

#### R — 스타일 오버라이드

![가입 단계 안내 — 스타일 오버라이드](assets/design-rules/joining-steps-style-override.png)

#### S — 기본형

![가입 단계 안내 — 기본형](assets/design-rules/joining-steps-standard.png)

### 39.3. 재현 검수

1. 1920px 셸, 이번 출처의 Breadcrumbs → GNB 순서, BODY 1440/유효 너비 1360 및 Container 5개를 확인한다.
2. 5단계의 동일 분할, 번호 32 × 32, 실제 자식의 왼쪽 정렬 및 R/S의 제목·설명·번호 서체를 확인한다.
3. R/S의 단계 래퍼 좌우 padding 차이, 12px 높이 차이와 이후 영역·Footer 위치를 확인한다.
4. 준비물 176, 상품 Accordion 280, 주의 Accordion 128, 중앙 버튼 154 × 56 및 지정 Footer 인스턴스 연결을 확인한다.
5. 이번 원본 두 화면의 누락 폰트 표시는 0이며 확인한 텍스트 자간은 0px이다. 생성 화면에서도 필수 서체, 잘림·겹침, 실제 업무 문구와 인스턴스 연결을 한 번 검수한다.

## 40. 패턴 T — 비대면 가입 안내 카드형·스타일 오버라이드

### 40.1. 출처와 화면 골격

- [원본 화면](https://www.figma.com/design/yojs1BhPrWxLmDDrpg1ihD?node-id=5090-28760): `비대면 계좌개설 안내 / 카드형 구성_스타일오버라이드`, 1920 × 1470.
- 파일 `yojs1BhPrWxLmDDrpg1ihD`, 페이지 `05.기타(기획 v0.6)`. 전달된 두 링크는 같은 노드이므로 하나의 패턴으로 기록한다.
- 실제 표시 내용은 기업뱅킹의 법인사업자·개인사업자 가입 진입 카드다. 프레임 이름만으로 계좌개설 업무로 확정하지 않는다.
- 전체 Vertical, gap 0, 배경 #FFFFFF. HEADER는 높이 **157**이며 **GNB → Breadcrumbs** 순서다. 이전 R·S의 159px 및 반대 순서를 적용하지 않는다.
- GNB / Channel: (0,0), 1920 × 108, channel=biz. 내부 GNB는 login=false, expand=false, container=1440이며 중앙 1440 컨테이너의 좌우 padding은 40이다.
- Breadcrumbs Area: (0,108), 1920 × 49, #FAFAFA. 내부는 (240,108), 1440 × 49, padding 16 40이다.
- 원본 Header에는 “기업용헤더 X”가 붙어 있다. 이번 치수를 모든 기업용 Header의 기본 규격으로 확대하지 않는다.

| 영역 | 좌표 (x,y) | 크기 |
| --- | --- | --- |
| BODY | (240,157) | 1440 × 961 |
| Container 1 — 페이지 제목 | (280,205) | 1360 × 72 |
| Container 2 — 카드 2열 Grid | (280,325) | 1360 × 391 |
| Container 3 — 모바일 안내 배너 | (280,764) | 1360 × 102 |
| 유의사항 Accordion — BODY 직접 자식 | (280,914) | 1360 × 156 |
| FOOTER | (0,1118) | 1920 × 352 |

- BODY는 Vertical gap 48, padding 48 40이다. 높이는 96 + 72 + 391 + 102 + 156 + 48 × 3 = 961이다.
- 실제 본문 Container는 3개이며 Accordion은 BODY의 직접 자식이다. 정리 목적으로 Container 4를 추가하거나 기존 Container를 병합·분할하지 않는다.
- 페이지 제목은 “기업뱅킹 회원 가입을” / “비대면으로 편리하게 신청해보세요”의 명시적 두 줄, KBFG Text Bold 26/36, #1C1C1C다. Title / Page 인스턴스는 1360 × 72, 실제 텍스트는 367 × 72다.
- LNB와 별도의 하단 Button Area는 없는 참조다. 카드 내 가입 TextButton이 실제 표시된 진입 액션이다.
- Footer는 신규 생성 시 반드시 13장의 지정 컴포넌트 인스턴스로 넣는다. 원본 Footer의 일반 프레임·이중 컨테이너 패딩을 그대로 복제하지 않는다.

### 40.2. 두 카드의 Grid와 외곽

- Container 2는 실제 Auto Layout **GRID, 1행 × 2열**, 행·열 gap 24다. 668 + 24 + 668 = 1360으로 두 카드가 같은 너비다.
- 왼쪽은 (280,325), 오른쪽은 (972,325), 각각 668 × 391이다.
- 원본 카드 `Box`는 FRAME이며 라이브러리 Card 인스턴스가 아니다. 이름만으로 원형 연결을 가정하지 않는다.
- 각 카드는 #FFFFFF, radius 12, 안쪽 1px stroke #E5E5E5, padding 32다. 내부 `inner`는 실제 (313,358)/(1005,358), 602 × 325다. 테두리를 포함한 실제 인셋은 33이므로 단순히 668 − 64 = 604로 재현하지 않는다.
- 내부는 Vertical gap 32다. 위 아이콘·가입 버튼 블록 99 + gap 32 + 아래 준비물 블록 194 = 325이며, 카드 전체는 32 × 2 + 테두리 2 + 325 = 391이다.
- 원본 Grid와 카드 부모·순서를 보존한다. 사용자 정의 이름은 12장에 따라 `Card Group`, 반복 자식 `Card`처럼 역할을 표현할 수 있으나 실제 Grid를 이름만 Group으로 바꾸거나 평면 그룹으로 대체하지 않는다.

### 40.3. 카드 상단 아이콘과 가입 TextButton

- 상단 블록은 602 × 99, Vertical gap 12다. 아이콘 프레임은 56 × 56, 가입 버튼은 211 × 31이다.
- 아이콘 프레임: 왼쪽 (313,358), 오른쪽 (1005,358). 원본은 `iconDummy` 일반 FRAME과 벡터 그룹이며 각각 모니터·봉투 모양이다. 실제 그래픽은 40 × 36 / 44 × 32이고, 빨간 `dummy` 글자가 겹쳐 있다.
- 생성 화면에서는 승인된 KBDS 아이콘·일러스트를 우선 사용하고 임시 `dummy` 표시를 제거한다. 임시 벡터 그룹을 검증된 라이브러리 컴포넌트로 기록하지 않는다.
- TextButton: 왼쪽 (313,426) “법인사업자 가입하기”, 오른쪽 (1005,426) “개인사업자 가입하기”. 원형은 primary/large이며 실제 라벨은 **KBFG Text Bold 22/31**, #1C1C1C로 오버라이드되어 있다.
- 라벨 185 + gap 2 + 오른쪽 chevron 24 = 211이다. 아이콘은 버튼 높이 31 안에서 세로 중앙에 배치된다.
- 스크린샷만으로 카드 전체가 클릭 가능한지, 라우팅·hover·focus 상태가 무엇인지 확정하지 않는다. 실제 TextButton 인스턴스와 기획의 액션 범위를 따른다.

### 40.4. 카드 하단 준비물·가입대상

두 카드의 하단 구조·문구는 원본에서 동일하다.

- 하단 블록: (313,489)/(1005,489), 602 × 194, Vertical gap 12, padding **32 0 8 0**, radius 12, fill 없음.
- “준비물” Title / Group: y=521, 높이 24, KBFG Text Bold 16/24 #1C1C1C.
- 다음 본문 블록: y=557, 602 × 118, Vertical gap 12.
- 체크 목록 3행: y=557/585/613, 각 602 × 20, gap 8, 총 높이 76. 아이콘은 `status-circleCheck` 16 × 16, 텍스트와 gap 4, 본문 너비 582다. 본문은 KBFG Text Light 14/20 #1C1C1C.
- 이 체크 행은 이름이 `TextList / Unordered`인 일반 FRAME이며 아이콘만 인스턴스다. 실제 인스턴스 여부를 확인하고 적절한 KBDS 구성을 재사용한다.
- 수평 Divider: y=645, 602 × 1, secondary/1px. 목록 끝과 gap 12다.
- 별표 가입대상 안내: y=658, 602 × 17, TextList / Unordered의 star/12/depth=1 인스턴스다. KBFG Text Light 12/17 #6E6E6E이며 마커 영역 8 + gap 4 + 본문 590이다.
- 높이 검산: 본문 76 + 12 + 1 + 12 + 17 = 118, 하단 블록 32 + 24 + 12 + 118 + 8 = 194.
- 제목과 본문이 혼합된 래퍼는 12장의 `Title / Contents` 규칙으로 재판정한다. 체크 목록과 가입대상 안내·Divider 전체를 단일 반복 TextList Group으로 뭉뚱그리지 않는다.
- 원본 준비물은 37.2장의 대출·자동화기기 안내 샘플과 같다. 별표 안내도 두 카드 모두 주식회사·단독 대표이사 조건을 담고 있어 개인사업자 카드의 실제 가입 요건으로 사용할 수 없다. “공동재표”라는 원본 오타도 업무 문구로 확정하지 않는다. 실제 준비물·가입 자격은 승인된 기획으로 교체한다.

### 40.5. 모바일 가입 배너의 실제 크기와 임시 자산

- Banner / Card 인스턴스는 minimalBanner, 1360 × 102, fill #FAFAFA, radius 16이다.
- 내부 Slot은 Horizontal, gap 12, padding 12 20이다. ImageContainer는 **(300,767), 96 × 96**, TextArea는 **(408,791), 1212 × 48**이다.
- 실제 102px 높이 안에서 이미지 위·아래 여백은 각각 **3px**이다. 선언된 세로 padding 12만 계산해 배너를 120px로 임의 확대하지 않는다. 출처의 고정 높이·자식 배치를 구분해 기록한 값이다.
- ImageContainer 내부에는 (308,775), 80 × 80의 “임시 visual”과 빨간 `dummy` 문구가 있다. **실제 QR 코드는 없다.**
- 제목 “모바일로 가입을 진행하려면”: KBFG Text Bold 16/24 #1C1C1C.
- 설명 “스마트폰 기본카메라를 켜고 QR코드를 스캔하세요.”: KBFG Text Light 14/20 #8D8D8D. 제목과 gap 4로 총 높이 48이다.
- 실제 생성 시 임시 visual·dummy를 승인된 자산으로 교체한다. QR 안내가 유지되는 경우 실제 목적지가 확인된 QR을 제공하고 인식 가능 여부를 검수한다. 현재 이미지를 작동하는 QR로 재사용하지 않는다.

### 40.6. 유의사항 Accordion

- standard/basic/medium/expanded=true, 1360 × 156. 38장의 128px 참조와 같은 원형이지만 불릿이 3행이라 **28px 더 높다**.
- Title Area: (280,914), 1360 × 56, padding 16 0, gap 8. info 24 × 24는 (280,930), “유의사항”은 (312,932), KBFG Text Bold 14/20 #444444다. 오른쪽 chevron-up은 (1616,930), 24 × 24다.
- Expand Area: (280,970), 1360 × 100, padding 8 0 16 0. Slot-contents는 (280,978), 1360 × 76, gap 8이다.
- TextList 불릿 3행은 y=978/1006/1034, 높이 20, KBFG Text Light 14/20 #1C1C1C다. 총 20 × 3 + 8 × 2 = 76, Accordion은 56 + 8 + 76 + 16 = 156이다.
- 원본의 Star CMS 수수료·이체 50건/10억·Master/Sub 출금권한 문구는 가입 화면에 삽입된 샘플로 기록한다. 이를 가입 정책이나 이체 서비스의 공통 업무 규칙으로 확정하지 않는다.

### 40.7. 원형 키와 보존 이미지

아래는 사고신고 파일에서 관측한 main component key다. 지정 디자인 시스템의 실제 원형·변형·토큰과 대조하여 재사용한다.

| 컴포넌트 | main component key |
| --- | --- |
| GNB / Channel — biz | `a1805a20b85dea4155db23d9ff5bd2ece9a61386` |
| GNB — login=false, expand=false, container=1440 | `a7b4d9d08237dfb5560835ebae09f8f55267fb96` |
| Title / Page — left | `366007b354df25708d9dce4a7788c2b44e30dba3` |
| TextButton — primary large | `40636a4670dba28b4c3c126689c13c2ce7c3b80d` |
| line-chevron-right — 24 | `c583635d46aec2de5f463e4e4551034b4da5a7c5` |
| Title / Group — left | `99d19cfa876f2805be637934f717ffd2763720ca` |
| status-circleCheck — 16 | `e9020e86e5b488d8d972d0b7a1f33acf22611daf` |
| Divider / Horizontal — secondary, 1px | `b154a5e09047df6dcbf02775b74e664260c48b01` |
| TextList — star/12/depth=1 | `e437d68fb6da9daedafa27c4814efc94866b67e0` |
| Banner / Card — minimalBanner | `a584878a0ddad355531a2b54e17f24b8312b1e59` |
| Accordion — standard/basic/medium/expanded | `d14342b496bd3aa5d2e707cf26a183daf5d401ce` |
| TextList — bullet/14/depth=1 | `5e484496e22e7e84c91c23bddfe11d1b4a13f35b` |

원본 삭제에 대비해 0.5배 PNG(960 × 735)를 저장소에 보존했다. 임시 표시도 출처 확인을 위해 이미지에는 그대로 남겼으며, 신규 제작물에서는 위 교체 지침을 따른다.

![비대면 가입 안내 — 카드형 구성 스타일 오버라이드](assets/design-rules/non-face-to-face-joining-cards.png)

### 40.8. 재현 검수

1. Header 157, BODY 961, Footer 시작 y=1118, 본문 Container 3개와 직접 자식 Accordion 구조를 확인한다.
2. Grid 2열·gap 24, 카드 668 × 391, 테두리·padding·실제 내부 602 × 325와 TextButton 22/31 오버라이드를 확인한다.
3. 준비물 체크 3행·Divider·별표 안내, 배너 1360 × 102와 96px 이미지의 실제 배치를 확인한다.
4. 본문에서 누락 폰트는 0이었다. 실제 생성에서도 KBFG Text, 잘림·겹침과 필요 시 문장 증가에 따른 높이 변경을 한 번 검수한다.
5. dummy·임시 자산 제거, 실제 준비물·가입 요건·버튼 목적·QR, 지정 Footer 인스턴스를 기획과 대조한다. 검수 통과 후 불필요한 재검수는 생략한다.
