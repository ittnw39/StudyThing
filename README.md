# 스터띵 (StudyThing)

## 1. 프로젝트 소개

스터띵(StudyThing)은 명지대학교 학생들의 스터디 그룹 매칭 및 활동 지원을 위한 웹 애플리케이션으로, 교내 SW 경진대회에 SW개발 부문에 참가한 프로젝트입니다. 사용자는 스터디 그룹을 생성하거나 참여할 수 있으며, 스터디 관련 메모, 파일 공유, 강의 정보 등을 관리할 수 있습니다.

## 2. 주요 기능

### 2.1. 사용자 관리 (User Domain)

*   **회원 가입:** 신규 사용자 등록 (이메일, 비밀번호, 닉네임 등)
    *   API Endpoint: `POST /users/register`
*   **로그인:**
    *   API Endpoint (로그인): `POST /users/login`
*   **사용자 정보 조회:**
    *   전체 사용자 목록 조회: `GET /users`
    *   특정 사용자 정보 조회 (ID 기반): `GET /users/{id}`
*   **사용자 정보 수정:** 기존 사용자 정보 업데이트
    *   API Endpoint: `PUT /users/{id}`
*   **회원 탈퇴:** 사용자 계정 삭제
    *   API Endpoint: `DELETE /users/{id}`

### 2.2. 스터디 그룹 관리 (StudyGroup Domain)

*   **스터디 그룹 생성:**
    *   API Endpoint: `POST /study/create`
    *   요청 파라미터: `leaderId` (Long), `courseId` (Long), 요청 바디: `StudyGroup` 정보
*   **스터디 그룹 참여:**
    *   API Endpoint: `POST /study/join`
    *   요청 파라미터: `userId` (Long), `studyGroupId` (Long)
*   **스터디 그룹 조회:**
    *   전체 스터디 그룹 목록: `GET /study`
    *   ID 기반 특정 스터디 그룹 조회: `GET /study/{id}`
    *   이름 기반 스터디 그룹 검색: `GET /study/search?name={keyword}`
    *   강의 ID 기반 스터디 그룹 조회: `GET /study/course/{courseId}`
    *   강의 이름 기반 스터디 그룹 검색: `GET /study/course/search?name={keyword}`
    *   사용자 ID 기반 참여 스터디 그룹 조회: `GET /study/user/{userId}`
*   **스터디 그룹 정보 수정:**
    *   API Endpoint: `PUT /study/{id}`
    *   요청 바디: `StudyGroup` 상세 정보
*   **스터디 그룹 삭제:**
    *   API Endpoint: `DELETE /study/{id}`
*   **스터디 그룹 멤버 조회:**
    *   API Endpoint: `GET /study/members/{groupId}`
*   **스터디 목표 관리 (`/study-goals`):**
    *   목표 생성: `POST /study-goals` (요청 바디: `StudyGoalDTO`)
    *   그룹별 목표 조회: `GET /study-goals/{groupId}`
    *   목표 완료 상태 수정: `PUT /study-goals/{goalId}/completion` (요청 바디: `{"completed": true/false}`)
    *   목표 삭제: `DELETE /study-goals/{goalId}`

### 2.3. 메모 관리 (Memo Domain)

*   **메모 생성:**
    *   API Endpoint: `POST /memos/create`
    *   요청 파라미터: `userId` (Long), `studyGroupId` (Long), `content` (String)
*   **메모 조회:**
    *   스터디 그룹별 메모 목록 조회: `GET /memos/group/{groupId}`
*   **메모 수정:**
    *   API Endpoint: `PUT /memos/update/{memoId}`
    *   요청 파라미터: `userId` (Long), `content` (String)
*   **메모 삭제:**
    *   API Endpoint: `DELETE /memos/delete/{memoId}`
    *   요청 파라미터: `userId` (Long)

### 2.4. 파일 관리 (File Domain) (AWS S3 연동)

*   **파일 업로드:**
    *   API Endpoint: `POST /files/upload`
    *   요청 파트: `file` (MultipartFile), `FileRequestDto` (userId, groupId 등)
*   **파일 조회/목록:**
    *   스터디 그룹별 파일 목록: `GET /files/group/{groupId}`
    *   사용자별 파일 목록: `GET /files/users/{userId}`
    *   전체 파일 목록 (S3 버킷): `GET /files/list`
*   **파일 다운로드:**
    *   API Endpoint: `GET /files/download/{fileKey}`
    *   요청 파라미터 (선택): `downloadFileName` (String)
*   **파일 삭제:**
    *   API Endpoint: `DELETE /files/delete/{fileKey}` (S3 Object Key 기반)
*   **Presigned URL 생성 (업로드용):**
    *   API Endpoint: `GET /files/presigned-url/{fileName}`
*   **(참고) 테스트 엔드포인트:** `GET /files/test`

### 2.5. 강의 정보 및 시간표 관리 (Course Domain)

*   **강의 정보 관리 (`/courses`):**
    *   강의 검색: `GET /courses/search?query={keyword}&type={id|professor|name}`
    *   강의 생성: `POST /courses` (요청 바디: `Course` 정보)
    *   ID 기반 강의 조회: `GET /courses/{id}`
    *   전체 강의 목록 조회: `GET /courses`
    *   강의 정보 수정: `PUT /courses/{id}` (요청 바디: `Course` 상세 정보)
    *   강의 삭제: `DELETE /courses/{id}`
    *   사용자 수강 강의(스케줄) 조회: `GET /courses/user/{userId}`
*   **사용자 시간표 관리 (`/user-schedule`):**
    *   시간표에 강의 추가: `POST /user-schedule` (요청 바디: `{"userId": Long, "courseIds": [Long, ...]}`)
    *   사용자별 시간표 조회: `GET /user-schedule/{userId}`

## 3. 기술 스택

### 3.1. 백엔드 (Backend)

*   **언어 (Language):** Java 22
*   **프레임워크 (Framework):** Spring Boot 3.3.1
    *   **Spring Web:** RESTful API 및 웹 요청 처리
    *   **Spring Data JPA:** 데이터 영속성 및 ORM (Object-Relational Mapping)
*   **데이터베이스 (Database):** MySQL
*   **데이터베이스 연동:** `mysql-connector-j` (JDBC 드라이버)
*   **파일 스토리지 (File Storage):** AWS S3 (Amazon Simple Storage Service)
    *   AWS SDK: `aws-java-sdk-s3`
    *   Spring Cloud AWS: `spring-cloud-starter-aws` (S3 연동 간소화)
*   **빌드 도구 (Build Tool):** Gradle
*   **유틸리티 (Utility):** Lombok (코드 간소화)

### 3.2. 프론트엔드 (Frontend)

*   **템플릿 엔진 (Template Engine):** Thymeleaf
    *   서버 사이드에서 동적 HTML 생성을 담당하며, Spring Boot와 통합되어 사용됩니다.
*   **스타일링 (Styling):**
    *   **CSS3:** 직접 작성된 CSS 파일들을 통해 UI 스타일링 (`globals.css` 및 각 페이지/기능별 CSS 파일).
    *   반응형 웹 디자인을 위한 별도 CSS 파일 존재 (예: `*_pc.css`).
*   **클라이언트 스크립트 (Client-side Scripting):**
    *   **JavaScript (ES6+):** Vanilla JS 기반으로 각 페이지/기능별 동적 로직 구현.
    *   인증, 스터디 그룹 관리, 시간표 생성 등 다양한 기능별 스크립트 파일 존재.
    *   모듈화된 스크립트 사용 가능성 ( `js/modules/`, `js/component/` 폴더 확인).
*   **UI 라이브러리/프레임워크:**
    *   아이콘 표시에 Font Awesome (CDN 방식) 사용. 그 외 주요 UI 구성은 프로젝트 자체 CSS와 JavaScript로 구현.

### 3.3. 서버 환경

*   **운영체제 (Target OS):** Windows Server 2019 Standard
*   **기타 배포 환경 (Considered):** Jetson Nano (ROS2), Raspberry Pi

## 4. 설치 및 실행 방법

### 4.1. 사전 요구 사항

*   Java 22 (JDK) 설치
*   Gradle 설치 (또는 프로젝트 내 Gradle Wrapper 사용)
*   MySQL 데이터베이스 서버 실행 및 `application.properties` (또는 `application.yml`) 설정
    *   데이터베이스 스키마 생성 (필요시 SQL 스크립트 제공)
*   AWS S3 버킷 생성 및 자격 증명 설정 (`application.properties` 또는 AWS 설정 파일)

### 4.2. 빌드 및 실행

1.  **프로젝트 클론:**
    ```bash
    git clone https://gitlab.com/joy8232028/study_match.git
    cd study_match/demo
    ```

2.  **애플리케이션 설정:**
    *   `src/main/resources/application.properties` (또는 `application.yml`) 파일을 열어 데이터베이스 연결 정보(URL, username, password) 및 AWS S3 관련 정보(access-key, secret-key, bucket-name, region 등)를 자신의 환경에 맞게 수정합니다.

3.  **애플리케이션 빌드:**
    ```bash
    ./gradlew build
    ```
    (Windows의 경우: `gradlew.bat build`)

4.  **애플리케이션 실행:**
    ```bash
    java -jar build/libs/demo-0.0.1-SNAPSHOT.jar
    ```
    (또는 Spring Boot Gradle 플러그인을 통해 실행: `./gradlew bootRun`)

5.  웹 브라우저에서 `http://localhost:8080` (기본 포트)으로 접속합니다.

## 5. 프로젝트 구조 (demo 폴더 기준)

```
demo/
├── .gradle/           # Gradle Wrapper 파일
├── build/             # 빌드 결과물 (JAR 파일 등)
├── gradle/            # Gradle Wrapper 설정
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── Study_Match/ # Java 소스 코드 루트 패키지
│   │   │       ├── config/      # Spring 설정 (WebConfig 등)
│   │   │       ├── course/      # 강의 관련 기능
│   │   │       ├── file/        # 파일 관리 기능 (S3 연동)
│   │   │       ├── HomeController/ # 기본 컨트롤러
│   │   │       ├── memo/        # 메모 관련 기능
│   │   │       ├── studyGroup/  # 스터디 그룹 관련 기능
│   │   │       ├── user/        # 사용자 관련 기능
│   │   │       └── StudyMatchApplication.java # Spring Boot 메인 클래스
│   │   └── resources/
│   │       ├── static/      # 정적 리소스 (CSS, JS, 이미지 등)
│   │       ├── templates/   # Thymeleaf 템플릿 파일
│   │       └── application.properties # 애플리케이션 설정 파일
│   └── test/
│       └── java/            # 테스트 코드
├── .gitignore         # Git 무시 파일 목록
├── build.gradle       # Gradle 빌드 스크립트
├── gradlew            # Gradle Wrapper (Linux/Mac)
├── gradlew.bat        # Gradle Wrapper (Windows)
└── settings.gradle    # Gradle 프로젝트 설정
```

## 6. 기여 방법

본 프로젝트는 교내 SW 경진대회 출품을 목표로 개발되었으며, 지속적인 개선과 함께 향후 기능 확장도 고려하고 있습니다. 프로젝트의 코드 구조, 사용된 기술, 구현된 기능에 대한 다양한 의견이나 개선을 위한 제안은 언제나 환영합니다.

*   **버그 리포트 및 기능 제안:** GitHub 이슈 트래커를 통해 상세 내용을 공유해주시면 감사하겠습니다.
*   **코드 스타일 및 개선 아이디어:** 프로젝트의 가독성 및 유지보수성 향상을 위한 아이디어가 있다면 자유롭게 제안해주세요.

## 7. 라이선스

본 프로젝트는 명지대학교 SW 경진대회 개발 부문 출품작으로, 학습 및 포트폴리오 목적으로 개발되었습니다. 모든 코드 및 산출물의 권리는 원작자에게 있습니다.

