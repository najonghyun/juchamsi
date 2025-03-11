# 🚘 주참시(주차장 참견 시스템 — JUCHAMSI) &nbsp; <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>

#### 실시간 채팅과 주차 관리 기능을 통해 빌라 주민 간의 겹주차 문제를 효과적으로 완화할 수 있는 서비스입니다.

### (closed)

---

### 웹 및 웹앱 / 팀 프로젝트 (SSAFY)

### 2023.07.04 ~ 2023.08.18 (6주)

<br>

> **회원가입 플로우를 휴대폰 인증 → 사용자 정보 입력 → 빌라 정보 등록의 3단계로 구성하여 UX를 최적화한 집주인 웹 회원가입 및 로그인 페이지 개발**

> **등록 차량 및 주차 현황을 실시간으로 확인할 수 있도록 구현한 집주인 웹 메인 페이지(입주민 관리 및 주차 관리) 개발**

> **WebSocket과 Stomp 프로토콜 기반의 실시간 채팅 시스템 구현을 통해 입주민 간 원활한 커뮤니케이션이 가능한 대화방 기능 구현**

---

<br>

### 💻 Overview


|                 관리자 로그인                |                 관리자 메인페이지             |      
| :-----------------------------------------: | :-----------------------------------------: |
| ![Image](https://github.com/user-attachments/assets/4e295059-1f37-4d3d-ab4c-b8ec577afc0e) | ![Image](https://github.com/user-attachments/assets/1d540b15-4392-48e2-89aa-ca04432248c0)

|                 메인화면                |                 출차 시간 등록                |                내 주차 현황 1               |                내 주차 현황 2               |  
| :-----------------------------------------: | :-----------------------------------------: | :---------------------------------------: | :---------------------------------------: |
| <img src="https://github.com/najonghyun/juchamsi/assets/102370959/1537c6d0-cf09-451b-aee4-70ba8046348e" width="100%" height="100%"> |<img src="https://github.com/najonghyun/juchamsi/assets/102370959/c964c254-f904-46bc-a165-f79641920acb" width="90%" height="90%"> | <img src="https://github.com/najonghyun/juchamsi/assets/102370959/818d21ee-3443-4c9f-bbe1-61e61f4e88c1" width="100%" height="100%"> | <img src="https://github.com/najonghyun/juchamsi/assets/102370959/16eb32f6-cb26-41de-8577-3506da5308dd" width="100%" height="100%">

|                 마이페이지                |                 시스템 채팅방                |                사용자간 채팅방               |                알람               |
| :-----------------------------------------: | :-----------------------------------------: | :---------------------------------------: | :---------------------------------------: |
|<img src="https://github.com/najonghyun/juchamsi/assets/102370959/6dff9f9b-a040-47df-8012-f2ff06f6f8bb" width="100%" height="100%"> | <img src="https://github.com/najonghyun/juchamsi/assets/102370959/381ca5b6-1900-47b3-8c5c-2edb81d61e6e" width="100%" height="100%"> |   <img src="https://github.com/najonghyun/juchamsi/assets/102370959/87829ea5-b214-4dc7-9f7f-05a36b43fc36" width="100%" height="100%"> |  <img src="https://github.com/najonghyun/juchamsi/assets/102370959/53fb1ccb-7c09-4aa7-a1bc-58c733a107ed" width="100%" height="100%">


---

<br>

## 🔗 프로젝트 개요

### 💡 기획 배경

 길을 가다 보면 주변의 빌라 1층 주차장에는 많은 세대 수에 비해 적은 주차장을 보유 하고 있는 것을 흔히 볼 수 있다. 따라서, 대부분의 빌라 주차장은 앞 차가 나와야만 뒷 차가 나올 수 있는 겹주차 형식을 띄고 있다.

 이에 따라, 겹주차 상황으로 인해 빌라 주민 간의 싸움과 갈등이 다수 발생하였고, 작은 사건에 그치지 않고 폭력, 유혈 사태를 일으키는 결과를 초래하였음을 알게 되었다.

 그래서 우리 프로젝트는 겹주차 상황에서 발생하는 여러 가지 **빌라 주민 간 주차 분쟁 상황을 완화**시키고자 이 서비스를 고안하였다.

<br>

### 👩‍👩‍👧‍👧 팀원 소개

**김세훈** : `팀장` , `IoT` : 입출차 자동화 알고리즘, HW 설계 및 제작, 외부차량 감지 알고리즘

**나종현** : `FrontEnd` : 집주인 페이지, 모바일 채팅방 구현

**소수현** : `BackEnd` : 관리자, 집주인 회원 API, 채팅방 API, 입출차 API, 인증번호 발송, 모바일 디자인

**유호재** : `Infra` , `BackEnd` : Docker, 서버 배포

**이진하** : `BackEnd` : 세입자 회원 API, Redis, FCM, 빌라 API, 마일리지 API, 웹 디자인

**임철성** : `FrontEnd` : PWA, 주차 관리 페이지, 마이페이지(마일리지 + 회원관리) 구현, 앱 구현

<br>

## 🖇️ 주요 기능

### 📝 출차 시간 등록

- 사용자가 주차를 하게 되면 ‘주차가 되었습니다.’ 하는 알람이 온다.
- 알람이 와 사용자가 앱을 열게 되면 출차 시간을 등록하는 모달이 뜨게 된다. (만약, 출차 시간을 입력하지 않을 시에는 다른 기능을 사용하지 못하게 된다.)
    - 출차 시간을 등록하면 마일리지가 적립된다.
- 출차 시간은 날짜와 시간을 선택하고 완료 버튼을 누르면 저장이 된다.
- 이후, 메인 화면에서 내가 주차한 곳과 해당 주차장의 다른 사용자 정보가 표시되어 보여진다.
- 최초 등록 이후에는 내 주차 현황 페이지에서 출차 시간을 변경할 수 있으며 겹주차 발생시 해당 페이지에서 겹주차 차량에 대한 정보 및 기능(겹주차 출차 시간 확인,겹주차 차량 연락처 확인,대화방 생성)을 사용 할 수 있다

### 👥 대화방

- 겹주차 상황이 발생하면, 앞 차주와 뒷 차주 사이에 대화방을 생성할 수 있는 버튼이 활성화된다.
- 대화방에 참여하는 두 인원 중 한 명이라도 버튼을 누르면, 대화방이 생성되고 서비스 이용이 가능하다.
    - 대화방 생성시 양쪽 유저에게 대화방 생성 버튼은 사라진다.
- 출차 시간 전 미리 차 위치를 바꿔야 할 경우 연락할 수 있는 통로로써 기능한다.
- 출차 시간이 지나거나 겹주차 상황이 해결(차량 출차)되면 자동으로 대화방이 삭제되어 불필요한 대화를 막을 수 있다.

### 🔒 개인정보 보호

- 집주인 페이지를 두어 같은 빌라 내의 세입자들을 관리할 수 있다.
- 모든 세입자는 회원가입과 회원 정보 수정 후, 관리자의 승인이 있어야만 서비스를 이용할 수 있다.
    - 외부 인원 유입 및 가짜 회원 정보로 서비스를 이용하는 것을 방지
- 세입자 차량이 아닌 외부 차량이 주차되었을 때, 사운드 모듈을 통해 경고음을 울린다.

<br>

## ⚒️ 주요 기술

### 🎲 자동 입출차 시스템

- BLE 기술을 이용한 비콘으로 주차장 위치를 특정하도록 알고리즘을 설계했다.
- 주차장 바닥에 설치된 Ground Module은 초음파 센서 값이 30cm 이하가 되면 broadcasting을 시작한다. (자신의 mac 주소와 초음파 센서의 값 전송)
- 차량 내부에 설치된 Car Module은 broadcasting된 값을 수신하여 빈도수를 계산하고, 주차장 위치를 특정하여 백엔드 서버와 Sound Module로 입차 요청을 보낸다. (알림 시스템을 위해 Sound Module 사용)
- 백엔드 서버는 입차 요청을 수신하고, 연결된 유저의 기기로 푸시 알림을 전송한다. (FCM 푸시 알림 기능 사용)

### 🎲 푸시 알림 시스템

- FCM (Firebase Console Messaging) 기능을 사용해 구현했다.
- 백엔드 서버와 프론트엔드 서버 사이에 클라우드 메시징 서버를 둠으로써, 푸시 알림 서버를 낮은 부하로 구현한다.
- 사용자는 알림 권한을 허용하고, 토큰을 발급한 후 백엔드 서버로 보내 따로 저장해 둔다.
- 푸시 알림을 보내야 하는 상황이 오면, 저장된 토큰 값을 이용해 메시지를 보내고 싶은 사용자를 특정한다.
- 해당 토큰으로 푸시 알림을 요청하면, 클라우드 메시징 서버는 요청을 수신하고 프론트엔드 서버에 적절한 동작을 수행한다.

### 🎲 외부 차량 경고음 시스템

- 주차당 바닥에 설치된 Ground Module은 초음파 센서 값이 30cm 이하가 되면 broadcasting을 시작한다. (자신의 mac 주소와 초음파 센서의 값 전송)
- 주차장 가장자리에 설치된 Sound Module은 broadcasting된 값을 수신하여 빈도수를 계산한다.
    - 만약 Car Module로부터 입차 요청이 들어오지 않을 경우, 해당 칸에는 외부 차량이 주차한 것으로 간주한다.
- 일정 빈도수를 넘으면 사이렌을 울려 외부 차량이 주차되었음을 알린다.

### 🎲 대화방 시스템

- WebSocket을 활용하여 기존의 단방향 HTTP 프로토콜과 호환되어 양방향 통신을 제공한 실시간 채팅방을 구현하였다.
- 접속까지는 HTTP 프로토콜을 이용하고, 그 이후 통신은 자체적인 WebSocket 프로토콜로 통신하게 된다.
- Stomp를 활용하여 메세징 전송을 효율적으로 하였다. WebSocket위에서 동작하는 프로토콜로써 클라이언트와 서버가 전송할 메세지의 유형, 형식, 내용들을 정의하는 매커니즘을 사용해 채팅방을 고도화하였다.
- Stomp를 활용할 때 채팅방 생성은 pub/sub 구현을 위한 Topic이 생성이 되고, Topic 구독을 통해서 채팅방에 입장이 가능하게 된다.
- 위의 해당 Topic으로 메세지를 송신(pub), 메세지를 수신(sub)하게 되면 채팅방에서 메세지를 송수신이 가능해진다.

<br>

## 🏹 시스템 아키텍처

<img src="https://github.com/najonghyun/juchamsi/assets/102370959/e8e4fd62-b094-4fd4-b809-3dc431843baf" width="50%" height="50%">

<br>
<br>

## ⚒️ 개발 및 협업 환경

### **BackEnd**

- Spring Boot
- Spring Security
- Spring Data JPA
- QueryDSL
- Flask
- JAVA
- PYTHON
- GRADLE
- INTELLIJ IDEA
- MySQL
- REDIS
- FIREBASE

### IoT

- Raspberry Pi
- arduino

### **FrontEnd**

- React
- Redux-toolkit
- Mui-material
- Dayjs
- Stompjs
- Chatscope(chat-ui-kit-react)
- Chatscope(chat-ui-kit-styles)
- Firebase
- PWA

### Infra

- Amazon EC2
- Nginx
- Docker

### Cooperation & Communication

- GitLab
- Jira
- MatterMost
- Notion
- Discord

<br>

|                 🖥️ 화면 설계서                |                 ⚙️ ERD             |      
| :-----------------------------------------: | :-----------------------------------------: |
 | <img src="https://github.com/najonghyun/juchamsi/assets/102370959/2432e562-4720-48f4-b003-9b1d925018d6" width="100%" height="100%"> | <img src="https://github.com/najonghyun/juchamsi/assets/102370959/6f0c2230-2a78-4550-85d4-90827ec7e1d9" width="100%" height="100%"> | 

