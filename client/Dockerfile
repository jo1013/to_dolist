# 베이스 이미지 설정
FROM node:18

# 작업 디렉터리 설정
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package.json ./



RUN npm install
RUN npm install --save-dev typescript @types/react @types/react-dom

RUN npm install typescript@latest ajv@^8 --save-dev

RUN npm install --legacy-peer-deps
RUN npm install --save-dev typescript @types/react @types/react-dom --legacy-peer-deps
RUN npm install typescript@4.9.5 ajv@^8 --save-dev --legacy-peer-deps
RUN npm install @mui/material @emotion/react @emotion/styled @mui/icons-material --legacy-peer-deps

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 서버 실행
CMD ["npm", "start"]