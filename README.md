# 실패 일기장

## 실패 일기장 프로젝트 소개

- 자신이 도전했다 실패했던 이야기들을 일기로 작성해보고 되돌아볼 수 있도록 하는 서비스
- 프로토타입 배포 URL (https://growth-diary-ai.lovable.app)


## 사용자 정의

- 보다 간편하게 실패 회고를 진행하고 싶은 사용자
- 실패를 토대로 다양한 발전 방향을 고려해보고 싶은 사용자
- 실패에 대한 부정적인 감정을 컨트롤하고 싶은 사용자


## 페르소나 정의

### 정도윤
- **직업**: IT 개발자
- **나이**: 28세
- **상황**: 신입 입사 후 바쁜 일상 속에서 많은 실수와 실패를 겪고 있음
- **목표**: 빠르고 간편하게 실패 회고를 하며 스스로를 발전시키고 싶음

### 류선진
- **직업**: 영업직
- **나이**: 35세
- **상황**: 성과 부진으로 승진 실패, 조급한 마음
- **목표**: 실패를 해결할 다양한 발전 방향을 모색해보고 싶음

### 윤대한
- **직업**: 취준생
- **나이**: 25세
- **상황**: 여러 번의 취업 실패로 인해 의욕 저하와 무기력 상태
- **목표**: 실패로 인한 부정적인 감정을 정리하고 싶음

## 사용자 시나리오 작성

### 1. 신입 IT개발자 정도윤의 빠르고 간편한 실패 회고

1. 오늘의 실패 일기 작성 버튼 클릭
2. 실패 제목과 실패 내용을 간단하게 작성
3. AI와의 대화 시작 버튼 클릭 (문제해결형 AI 선택)
4. AI와의 대화를 통해 실패 사유, 느낀점, 앞으로의 발전 방향을 고민
5. 대화 종료 버튼 클릭시, AI가 대화 내용을 자동으로 정리해서 실패 일기를 작성
6. 정리된 실패 일기를 보고 리마인드를 하면 실패 회고 종료

### 2. 영업직 류선진의 실패에 대한 다양한 발전 방향 모색하기

1. 오늘의 실패 일기 작성 버튼 클릭
2. 실패 제목과 실패 내용을 간단하게 작성
3. AI와의 대화 시작 버튼 클릭 (문제해결형 AI 선택)
4. AI와의 대화를 통해 자신이 생각하지 못한 다양한 발전 방향을 모색
5. 대화 종료 버튼 클릭시, AI가 대화 내용을 자동으로 정리해서 최종적으로 정한 발전 방향을 실패 일기에 기록
6. 실패 일기에 기록된 발전 방향을 리마인드하며 실패 회고 종료

### 3. 취준생 윤대한의 감정 컨트롤을 위한 실패 일기 작성

1. 오늘의 실패 일기 작성 버튼 클릭
2. 실패 제목과 실패 내용을 간단하게 작성
3. AI와의 대화 시작 버튼 클릭 (공감형 AI 선택)
4. AI와의 대화를 통해 실패 사유와 느낀점 등을 적어보며 자신의 감정을 정리
5. 대화 종료 버튼 클릭시, AI가 대화 내용을 자동으로 정리해서 실패 일기를 작성
6. 작성된 실패 일기를 보며 감정을 갈무리

### 4. 취준생 윤대한의 감정 컨트롤을 위한 실패 공유

1. 다른 사람의 실패 일기 읽기 버튼 클릭
2. 공개 설정된 다른 사람들의 실패 일기 리스트가 출력
3. 하나를 선택해 다른 사람들의 실패 일기를 읽고 응원글을 남김
4. 마찬가지로 자신의 실패 일기에 대해서도 다른 사람이 응원글을 남김
5. 자신의 실패 일기에 남겨진 응원글을 읽으며 위로를 얻음

## 사용자 스토리와 인수조건

### 1. 정도윤 - 실패 일기 작성

- **사용자 스토리**
    - <사용자>: 수많은 실수와 실패를 겪고 있는 신입 IT 개발자로써,
    - <목적>: 빠르고 간편하게 실패 회고를 하기 위해,
    - <기능>: AI 대화를 활용한 실패일기를 작성하며 실패 회고를 진행한다.

- **인수 조건**
    - Given: 웹서비스 접속
    - When: 실패일기 작성 버튼 클릭
    - Then: AI와의 대화를 통한 실패 일기를 작성하며 회고를 진행한다.

### 2. 류선진 - 실패 일기 작성

- **사용자 스토리**
  - <사용자>: 성과 부진으로 승진 실패한 영업직으로써,
  - <목적>: 실패를 토대로 다양한 발전 방향을 모색하기 위해,
  - <기능>: AI와의 대화를 활용해 다양한 발전 방향을 모색하고 정리한다.

- **인수 조건**
  - Given: 웹서비스 접속
  - When: 실패일기 작성 버튼 클릭
  - Then: AI와의 대화를 통해 다양한 발전 방향을 모색하고 정리한다.

### 3. 윤대한 - 실패 일기 작성

- **사용자 스토리**
    - <사용자>: 많은 취업 실패로 무기력해진 취준생으로써,
    - <목적>: 실패에 대한 부정적인 감정을 컨트롤하기 위해,
    - <기능>: AI와의 대화를 활용해 실패에 대한 자신의 감정을 정리해본다.

- **인수 조건**
    - Given: 웹서비스 접속
    - When: 실패일기 작성 버튼 클릭
    - Then: AI와의 대화를 통해 실패에 대한 자신의 감정을 정리한다.

### 4. 윤대한 - 실패 공유

- **사용자 스토리**
  - <사용자>: 많은 취업 실패로 무기력해진 취준생으로써,
  - <목적>: 실패에 대한 부정적인 감정을 컨트롤하기 위해,
  - <기능>: 자신의 실패일기를 공유하며 응원을 받는다.

- **인수 조건**
  - Given: 웹서비스 접속
  - When: 이전에 작성한 실패일기 열람
  - Then: 다른 사람이 남겨둔 응원글을 읽는다.

## 핵심 가치 제안

- 간편한 실패 회고 
    - 효과적인 발전을 위해서는 항상 실패를 회고하고 피드백해야한다. 하지만 시간과 에너지가 부족해 실패 회고가 힘든 경우가 많다. 
    - 현재 서비스를 사용하면 AI를 통해 실패 회고과 결과 정리를 자동으로 진행해주기 때문에 보다 간단하고 편하게 실패 회고를 진행할 수 있다.
- 다양한 발전 방향
    - 스스로 피드백을 할때 발전 방향이 보이지 않는 경우가 많다.
    - 현재 서비스를 사용하면 AI와의 대화 과정을 통해 생각하지 못한 다양한 발전 방향을 고려해볼 수 있다.
- 실패에 대한 감정 컨트롤 지원
    - AI와 대화 하면서 실패에 대한 자신의 느낀점들을 적어보며 실패에 대한 부정적인 감정을 정리해 나갈 수 있다.
    - 다른 사람과 실패를 공유하고 서로 응원글을 주고받으며 실패를 이겨낼 힘을 얻을 수 있다. 

## 핵심 기능

- **실패 일기 작성**
    - 실패제목, 실패내용을 간단하게 작성
    - AI와의 대화를 통해 실패이유, 느낀점, 앞으로의 발전 방향을 고민
    - 대화가 종료되면 지금까지의 대화를 기반으로 AI가 실패일기를 작성 

- **다른 사람의 실패 일기 열람**
    - 공개 상태의 다른 사람들의 실패 일기 리스트가 출력
    - 하나를 선택하면 해당 실패일기가 출력됨
    - 출력된 실패일기에 응원글 작성 가능

