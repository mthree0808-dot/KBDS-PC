# 작업 시작 — 필요한 규칙만 읽기

사용자 최신 지시와 [디자인 원문](../design-rules.md)이 기준이다. 이 MD 링크만 받아도 아래 순서를 스스로 따른다.

## 필수값

- 화면명: ID 미정 `화면ID_화면명`, 확정 후 `실제ID_화면명`.
- 실제 Auto Layout·최신 KBDS 인스턴스 사용. 원형 계층 유지, 사용자 레이어 명명은 12장.
- 일반 화면 `## HEADER` / `## BODY` / `## FOOTER`, Popup은 Header / Body / Footer.
- 1920 화면 BODY: 중앙 1440 Fixed 직접값, padding 상하48·좌우40. LNB형 Container 1=316·LNB Fill, gap32, Container 2=1012 Fill.
- GNB / Channel 안 GNB도 가로 Fill. Footer는 실제 지정 원형 `bb4b7042c4ccc5742c5d51c3f5460ffec409ab63`.
- 0과 BODY 1440은 변수 없는 직접값. 나머지 적용 대상 수치는 역할별 변수·스타일. Clip content를 임의로 켜지 않는다.
- Table 텍스트는 Slot 안 Table 전용 Item / Slot(title/content, onlyNumber). 숫자 표시(전화번호 기호·마스킹 포함)는 Pretendard, 영문·국문 포함 문자열은 KBFG Text. 헤더 Medium·본문 Light 14/20과 family 변수까지 확인한다.
- 고객정보조회: 제목+2열 Table 4개, 라벨180+값832, 제목→표20·섹션48. 예전 Card/Data Block 구성은 적용하지 않는다. 별도 박스 유형은 60장 역할 판정.
- 기획 문구·순서·강조·마스킹·선택·비활성 상태 보존. 이어지는 기획은 한 화면으로 합치고 기획용 표시는 제외한다.

## 실행

1. 이 공통 지침을 한 번 읽고 가장 좁은 유형을 선택한다. 모르는 유형은 추정하지 않고 원문을 추가 확인한다.
2. 변경 영역을 한 번 확인하고 검증 자산·코드를 재사용한다. 독립 조회·import는 묶는다. 원형 import·사용은 같은 Figma 호출 안에서 한다.
3. 필수 스킬은 준수하되 같은 본문을 중복 출력하지 않는다. 도구 결과·파일 전체는 실행 환경에 보관하고 필요한 ID·건수·오류만 모델에 전달한다.
4. 변경 부분과 영향을 받는 부모를 검수한다. 수치·변수·원형·문구·서체·구조 및 실제 렌더링은 필수다. 통과 후 변경 없으면 반복하지 않는다.
5. 화면당3분 목표. 초과 시 원인·남은 작업을 알린다. 별도 보고서는 생략한다.

## 선택 조회

`node scripts/read-rules.mjs`는 이 공통 지침, 명시한 유형은 해당 절만 출력한다. 공통 지침도 필요할 때만 `--with-common`을 붙인다. 기존 `--no-common`도 지원한다.

| 작업 | 유형/명령 | 원문 |
| --- | --- | --- |
| Table 전체·고객정보조회 | `table` | 63·65 |
| Table Slot만 변경 | `table-slots` | 65.1·65.3 |
| 서체만 변경 | `typography` | 65.2 |
| 박스 / 명명 | `boxes` / `naming` | 60 / 12 |
| 2열 골격 / 변수 예외 | `layout` / `variables` | 61 |
| Footer / 제작·복구 | `footer` / `workflow` | 13 / 62 |
| 조회·출력 절약 | `efficiency` | 66 |
| 특정 절 / 줄 범위 | `section 65.2` / `ranges typography` | 지정 범위 |
| 자산 / 토큰 키만 | `assets tableItemContent` / `tokens fontNumeric` | 선택 키 |

다른 유형은 `list`와 [색인](../knowledge/rule-index.json)으로 찾는다. [보조 코드](../templates/kbds-pc-runtime.js)는 필요한 함수만 확인하거나 실행 환경에서 로드한다. applyText는 서체 분류·로드·family/weight 연결을 재사용한다. audit은 오류 총수와 최대20개 예시·생략 건수를 반환하므로 생략 오류는 추가 확인한다. ranges를 원격 조회에 쓰려면 원문 버전이 같은지 확인한다.

이 설정은 조회·출력·재작업을 줄이는 절차다. 자동 화면 컴파일러·계정 사용량 상한·절감률을 보장하지 않는다.
