# KBDS-PC 공유 작업 시작

개인화 설정에 디자인 규칙을 복사할 필요 없이, 같은 저장소의 최신 지침과 코드를 함께 사용합니다. 공식 사용 방식은 [Codex의 AGENTS.md 안내](https://learn.chatgpt.com/docs/agent-configuration/agents-md)를 참고합니다.

## 저장소를 작업 폴더로 사용하는 경우

1. 이 저장소를 내려받아 Codex의 작업 폴더로 엽니다.
2. 루트의 [AGENTS.md](AGENTS.md)와 [작업 시작 지침](docs/task-guide.md)을 따릅니다.
3. 상세 규칙은 원문 전체 대신 작업에 해당하는 절만 읽습니다. `node scripts/read-rules.mjs table` 등으로 선택할 수 있습니다. Node.js 18 이상이며 외부 패키지 설치가 필요 없습니다.

## GitHub 링크만 공유하는 경우

기존 [design-rules.md](design-rules.md) 링크만 공유하면 됩니다. 이 문서를 전달받은 작업자는 상단 안내에서 [짧은 작업 지침](docs/task-guide.md)을 스스로 읽고, 작업 유형에 필요한 규칙을 선택합니다. 사용자가 정형 시작 문구를 덧붙이거나 매번 같은 지시를 반복하도록 요구하지 않습니다.

이 방식은 전달받은 MD의 시작 지침을 따르는 절차입니다. 원격 AGENTS.md의 자동 탐색 여부는 작업 환경에 따라 다르므로, MD 자체의 시작 안내를 진입점으로 사용합니다.

개인별 모델·추론 강도·전역 지침 변경은 이 공통 설정의 필수 조건이 아닙니다. 각 작업자가 편집하려는 Figma/GitHub의 연결과 접근 권한은 해당 계정에서 필요합니다. 새 작업을 시작할 때 최신 저장소를 사용합니다.

## 파일 역할

- [AGENTS.md](AGENTS.md): 짧은 프로젝트 실행 지침.
- [docs/task-guide.md](docs/task-guide.md): 공통 필수값과 유형별 읽기 경로.
- [design-rules.md](design-rules.md): 기존 주소를 유지하는 상세 원문·패턴 근거.
- [knowledge/rule-index.json](knowledge/rule-index.json): 규칙 절을 찾는 작은 색인. 원문을 복제하지 않습니다.
- [scripts/read-rules.mjs](scripts/read-rules.mjs): 필요한 절·자산 키만 출력하는 로컬 읽기 도구.
- [templates/kbds-pc-runtime.js](templates/kbds-pc-runtime.js): 기존 제작 보조 함수와 검증한 키.

보고서는 요청이 있을 때만 만듭니다. 이 설정은 읽기·재조회·재작성 낭비를 줄이는 운영 방식이며, 모든 화면의 자동 제작이나 일정한 토큰 절감률을 보장하는 설정은 아닙니다.

선택 조회 코드·색인을 변경하면 `node --test test/read-rules.test.mjs`로 절 선택·코드 블록 제외·누락 감지·자산 검색 범위를 검사합니다.
