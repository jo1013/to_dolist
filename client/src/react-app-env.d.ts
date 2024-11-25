/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_URL: string;
      // 필요한 다른 환경변수들도 여기에 추가
    }
  }