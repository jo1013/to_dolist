# 베이스 이미지 설정
FROM node:14

# 작업 디렉터리 설정
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package.json ./
RUN npm install



RUN npm install
RUN npm install react-router-dom@6
RUN npm install typescript@latest ajv@^8 --save-dev
RUN npm install @mui/material @emotion/react @emotion/styled
RUN npm install date-fns
RUN npm install jwt-decode


# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 서버 실행
CMD ["npm", "start"]