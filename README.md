# Cuther - 날씨 정보 애플리케이션
![Image](https://github.com/user-attachments/assets/55b423cb-5ced-4a09-bcee-3a697681ed42)
## 프로젝트 개요

React Native와 TypeScript를 활용하여 개발한 날씨 정보 애플리케이션입니다. 사용자의 현재 위치를 기반으로 실시간 날씨 정보, 특보 등 다양한 날씨 관련 정보와 더불어 Lottie 애니메이션을 통해 체감기온별 캐릭터를 렌더링해 권장되는 옷차림을 제공하고 있습니다.

## 기술 스택

- **React Native**: 크로스 플랫폼 모바일 앱 개발
- **TypeScript**: 타입 안정성과 개발 생산성 향상
- **React Navigation**: 화면 전환 및 네비게이션 관리
- **React Native Config**: 환경 변수 관리
- **Axios**: HTTP 클라이언트
- **Lottie-react-native**: 애니메이션 렌더링

<img src="https://github.com/user-attachments/assets/ae01e16b-09bf-4aa4-b690-7b7f0beea62e" width="49%"/>
<img src="https://github.com/user-attachments/assets/3d2aa816-602e-4ba5-9891-24940674f387" width="49%"/>

## 주요 기능

### 1. 위치 기반 날씨 정보

- React Native의 Geolocation service와 Open API를 활용한 현재 위치 기반 날씨 정보 제공
- 역지오코딩을 통한 위치 정보 변환
- 체감기온에 따른 Lottie 애니메이션 캐릭터 표시
- 체감기온별 권장 옷차림 정보 제공

### 2. 특보 정보 시스템

- 실시간 특보 정보 수신 및 표시
- 사용자 위치 기반 특보 알림

## 기술적 구현

### 1. 환경 변수 관리

- react-native-config를 활용한 API 키 및 환경 변수 관리

### 2. API 통신

- Axios를 활용한 HTTP 통신
- 에러 핸들링 및 타임아웃 처리
- API 응답 데이터 매핑 및 가공

### 3. UI/UX

- Lottie 애니메이션을 활용한 동적 캐릭터 표시
- 체감기온에 따른 실시간 캐릭터 변경
- 직관적인 날씨 정보 시각화

## 프로젝트 구조

```
src/
├── app/          # 기능별로 묶이지 않는 모듈
├── assets/       # 이미지 관련 파일
├── features/          # 기능별 모듈
│   ├── weather/      # 날씨 관련 기능
│   │   ├── api/      # api 호출 모음
│   │   ├── lib/      # util 함수 모음
│   │   ├── ui/       # UI 컴포넌트
│   │   └── model/    # dtoMapper 등 데이터 관리 모음
│   ├── specialReport/  # 특보 관련 기능
│   └── geoLocation/    # 위치 관련 기능
├── pages/       # 페이지 컴포넌트
├── widgets/     # section 컴포넌트
└── entities/    # 기능별 entity 선언
```

## 실행 영상
<p align="center">
  <img src="https://github.com/user-attachments/assets/57aaa5a5-ffef-47a2-92ff-b99fdd038370" width="30%" />
</p>
