# 베이스 이미지
FROM node:14

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package.json package-lock.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 서버 실행
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
