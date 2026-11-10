# 작업 시작 — 필요한 규칙만 읽기

이 문서는 공통 필수값과 읽기 경로의 요약이다. 디자인 원문은 [design-rules.md](../design-rules.md)이며 사용자 최신 지시와 원문의 최신 적용 규칙이 우선한다. 이 요약만으로 미지원 유형을 추정해 만들지 않는다.

## 매 작업의 기본값

- 화면명: ID 미정 `화면ID_화면명`, 확정 후 `실제ID_화면명`.
- 실제 Auto Layout과 최신 KBDS 원형을 사용한다. 내부 원형 이름을 유지하며 반복·혼합 그룹은 12장에 따라 명명한다.
- `## HEADER` / `## BODY` / `## FOOTER`. Popup은 Header / Body / Footer.
- 기본 1920 화면의 BODY는 중앙 1440 Fixed 직접값, padding 상하48·좌우40. LNB형은 Container 1=316·안쪽 LNB Fill, gap32, Container 2=1012 Fill.
- GNB / Channel 내부 GNB도 가로 Fill. Footer는 지정 원형 `bb4b7042c4ccc5742c5d51c3f5460ffec409ab63`의 실제 인스턴스.
- 0은 변수 없이 0. BODY 너비 1440도 변수 없음. 나머지 적용 대상 수치는 간격·패딩·radius·테두리·타이포그래피·고정 치수의 실제 변수/스타일을 확인한다.
- Clip content를 임의로 켜지 않는다. 새 프레임의 기본값도 false로 명시한다.
- Table의 텍스트는 Slot 안에 실제 Item / Slot(label/data)을 사용한다. 숫자 표시(전화번호의 기호·마스킹 포함)는 Pretendard, 영문·국문 포함 문자열은 KBFG Text이며 family 변수를 연결한다. 자세한 구조·서체 검수는 65장.
- 고객정보조회는 제목+2열 Table 4개, 라벨180+값832, 제목→표20·섹션48. 현재 조회형에 예전 Card/Data Block 구성을 다시 적용하지 않는다.
- 박스가 필요한 별도 유형은 60장으로 Card / Surface·Data Block·Text Box 역할을 판정한다. 다른 유형에 조회 화면의 Table 구성을 일괄 확대하지 않는다.
- 기획의 문구·순서·강조·마스킹·입력·선택·비활성 상태를 보존한다. 이어지는 기획 프레임은 한 화면으로 합치고 기획용 표시는 제외한다.

## 짧은 실행 순서

1. 원본 내용·대상 위치를 필요한 범위에서 한 번 확인한다. 기본 정보가 같으면 같은 호출 묶음의 기존 확인 결과를 쓴다.
2. 아래 유형을 선택해 추가 규칙만 읽고, 검증 템플릿에서 변경 영역만 조립한다.
3. 원형 import·적용은 같은 Figma 호출에서 수행한다. 임시 컴포넌트 노드 ID를 다음 호출에 재사용하지 않는다.
4. 한 화면씩 저장하고 자동 검사·서체 확인·실제 렌더링을 수행한다. 오류가 있으면 해당 부분만 고친다.
5. 이미 통과한 항목은 변경이 없으면 다시 조회·캡처하지 않는다. 목표는 화면당3분, 초과 시 원인과 남은 작업을 알린다.

## 추가로 읽을 범위

| 작업 | 로컬 명령 | 원문 |
| --- | --- | --- |
| 기본 시작 | `node scripts/read-rules.mjs common` | 이 파일 |
| 고객정보조회·Table | `node scripts/read-rules.mjs table` | 63·65장 |
| 박스 역할 판정 | `node scripts/read-rules.mjs boxes` | 60장 |
| 레이어 정리 | `node scripts/read-rules.mjs naming` | 12장 |
| 2열 화면 골격 | `node scripts/read-rules.mjs layout` | 61.2·61.3 |
| 변수·0값 예외 | `node scripts/read-rules.mjs variables` | 61.1·61.7·61.8 |
| Footer | `node scripts/read-rules.mjs footer` | 13장 |
| 제작·복구 절차 점검 | `node scripts/read-rules.mjs workflow` | 62장 |
| 다른 패턴 | `node scripts/read-rules.mjs list` 후 `section 54 55` 등 | 해당 장만 |

CLI 출력은 이 공통 지침과 선택한 절이다. 같은 작업에서 공통 지침을 이미 읽었다면 `--no-common`을 붙여 중복 출력을 줄인다. 링크만으로 작업하면 이 표에 따라 원문의 해당 제목 범위만 조회한다. 코드가 필요할 때만 [제작 보조 스크립트](../templates/kbds-pc-runtime.js)를 읽는다. 자산 키만 필요하면 `assets <이름...>` 또는 `tokens <이름...>` 명령으로 해당 항목만 출력한다.

## 지원 범위

이 설정은 필요한 문서·키를 선택하고 기존 보조 코드와 검수를 재사용하게 하는 공통 진입점이다. 모든 화면을 자동 생성하는 완성형 컴파일러나 토큰 사용량 상한 설정은 아니다. 필요한 규칙을 생략하지 않으면서 불필요한 읽기·새 코드 작성·재작업을 줄이고, 실제 개선량은 작업별로 확인한다.
