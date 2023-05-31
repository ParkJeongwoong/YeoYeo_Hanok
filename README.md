# yeoyeo

## Getting Start

```bash
yarn install
```

```bash
yarn start
```



## 폴더구조

```
yeoyeo
│   README.md
│   ... 
└───public 
└───src
    └───components
    └───pages
    └───styles
    └───utils
    └───(hooks)
    └───(api)
```



## Rule

* 본 프로젝트의 lint rule은 airbnb 룰을 따릅니다.
* 중요 참고사항으로 다음과 같습니다.
  * 함수형 컴포넌트 선언 시 function 키워드 사용 (arrow function x)
  * arrow function은 익명 함수 컴포넌트 생성시에 사용합니다.
  * `import React from 'react'`를 사용하지 않습니다. (전역으로 설정해둠)
  * (작업하며 추가)
  * 기타 사항은 해당 에러에 나오는 링크를 따라가주세요



## Page List

| 메인 페이지                                                  | https://yeoyeo.co.kr                      |
| ------------------------------------------------------------ | ----------------------------------------- |
| 인트로 페이지(머리글)                                        | https://yeoyeo.co.kr/intro                |
| 서비스 페이지(어메니티, 편의시설, 제공환경)                  | https://yeoyeo.co.kr/service              |
| 상세 방 디테일(방 2개에 대한 디테일)                         | https://yeoyeo.co.kr/room                 |
| 예약 페이지 (방, 날짜 선택 → 동의, 세부 사항 입력 → 결제 모듈 새 창 띄우기) | https://yeoyeo.co.kr/reservation          |
| 예약 페이지 - 결제 완료                                      | https://yeoyeo.co.kr/reservation/complete |
| 404 Page                                                     | /* → / redirect                           |
| 관리자 페이지 - 예약 상태 확인(예약/환불/가격 변경)          | https://yeoyeo.co.kr/admin                |
| 관리자 페이지 - 로그인                                       | https://yeoyeo.co.kr/admin/login          |
