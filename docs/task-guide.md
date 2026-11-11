# 작업 시작 — 필요한 규칙만 읽기

사용자 최신 지시와 [디자인 원문](../design-rules.md)이 기준이다. 이 MD 링크만 받아도 아래 순서를 스스로 따른다.

## 필수값

- 화면명: ID 미정 `화면ID_화면명`, 확정 후 `실제ID_화면명`.
- 실제 Auto Layout·최신 KBDS 인스턴스 사용. 원형 계층 유지, 사용자 레이어 명명은 12장.
- 일반 화면 `## HEADER` / `## BODY` / `## FOOTER`, Popup은 Header / Body / Footer.
- 1920 화면 BODY: 중앙 1440 Fixed 직접값, padding 상하48·좌우40. LNB형 Container 1=316·LNB Fill, gap32, Container 2=1012 Fill.
- GNB / Channel 안 GNB도 가로 Fill. Footer는 실제 지정 원형 `bb4b7042c4ccc5742c5d51c3f5460ffec409ab63`.
- 프레임 수치0과 BODY1440은 변수 없는 직접값. 연결된 정식 TextStyle의 상속0 자간은 유지한다(65.4). 나머지 적용 대상 수치는 역할별 변수·스타일. Clip content를 임의로 켜지 않는다.
- 모든 Table / Header는 Align left(가로 MIN·세로 CENTER), 모든 Table / Cell의 높이는 항상 Fill(layoutSizingVertical=FILL). 행 높이를 채우며 내부 입력·텍스트의 Hug는 유지한다(65.5).
- Table 텍스트는 Slot 안 Table 전용 Item / Slot(title/content, onlyNumber). 숫자 표시(전화번호 기호·마스킹 포함)는 Pretendard, 영문·국문 포함 문자열은 KBFG Text. 헤더 Medium·본문 Light 14/20과 실제 textStyleId·범위별 스타일·개별 변수까지 확인한다.
- 고객정보조회: 제목+2열 Table 4개, 라벨180+값832, 제목→표20·섹션48. 예전 Card/Data Block 구성은 적용하지 않는다. 별도 박스 유형은 60장 역할 판정.
- 기획 문구·순서·강조·마스킹·선택·비활성 상태 보존. 이어지는 기획은 한 화면으로 합치고 기획용 표시는 제외한다.

## 실행

공통 운영 원칙은 [AGENTS.md의 조회·제작·검수 효율](../AGENTS.md#조회제작검수-효율)을 기준으로 한다. 아래는 작업 유형을 고르는 순서다.

1. 로컬 저장소 작업은 적용된 AGENTS.md를 따르고 아래 표에서 필요한 유형만 선택한다. 이미 읽은 지침을 다시 출력하지 않는다.
2. GitHub MD 링크만 받은 경우 위 운영 원칙을 한 번 확인한다. 원격 AGENTS.md가 자동 적용된다고 가정하지 않는다. 이후 필요한 디자인 절만 읽는다.
3. 검증된 자산·제작 스크립트에 화면별 데이터를 전달하고 제작과 검수를 함께 수행한다. 실패한 항목과 영향받는 부모만 재검사한다.
4. 작업 묶음 완료 후 확정 규칙을 MD에 반영한다. 새 채팅은 사용자가 선택하며 MD 링크·대상 화면·변경 요구로 이어간다.

## 선택 조회

`node scripts/read-rules.mjs`는 이 공통 지침, 명시한 유형은 해당 절만 출력한다. 공통 지침도 필요할 때만 `--with-common`을 붙인다. 기존 `--no-common`도 지원한다.

| 작업 | 유형/명령 | 원문 |
| --- | --- | --- |
| Table 전체·고객정보조회 | `table` | 63·65 |
| Table Slot만 변경 | `table-slots` | 65.1·65.3·65.4·65.5 |
| 서체·텍스트 스타일 | `typography` | 65.2·65.4 |
| 고객정보수정 전체 | `customer-edit` | 62.3·62.5·65.5·67 |
| 알려드립니다 / 초기화·전체 초기화 | `notice` / `input-reset` | 67.1·67.3 / 67.2·67.3 |
| 박스 / 명명 | `boxes` / `naming` | 60 / 12 |
| 2열 골격 / 변수 예외 | `layout` / `variables` | 61·65.5 / 61·65.4 |
| Footer / 제작·복구 | `footer` / `workflow` | 13 / 62 |
| 조회·출력 절약 | `efficiency` | 66 |
| 특정 절 / 줄 범위 | `section 65.2` / `ranges typography` | 지정 범위 |
| 자산 / 토큰 키만 | `assets tableItemContent` / `tokens fontNumeric` | 선택 키 |

다른 유형은 `list`와 [색인](../knowledge/rule-index.json)으로 찾는다. [보조 코드](../templates/kbds-pc-runtime.js)는 필요한 함수만 확인하거나 실행 환경에서 로드한다. applyText는 올바른 정식 TextStyle을 연결해 문자를 적용한다. 개별 변수만 연결하고 스타일이 해제된 상태는 실패다. audit은 오류 총수와 최대20개 예시·생략 건수를 반환하므로 생략 오류는 추가 확인한다. ranges를 원격 조회에 쓰려면 원문 버전이 같은지 확인한다.

이 설정은 조회·출력·재작업을 줄이는 절차다. 자동 화면 컴파일러·계정 사용량 상한·절감률을 보장하지 않는다.
