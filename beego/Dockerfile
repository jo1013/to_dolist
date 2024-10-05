# Go 환경 이미지를 사용합니다.
FROM golang:1.22-alpine

# 필요한 패키지를 설치합니다.
RUN apk add --no-cache git gcc musl-dev

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# 소스 코드를 복사합니다.
COPY . .

# go.mod 파일이 없다면 초기화합니다.
RUN if [ ! -f go.mod ]; then go mod init github.com/jo1013/to_dolist; fi

# 의존성을 다운로드하고 정리합니다.
RUN go mod tidy

# 애플리케이션을 빌드합니다.
RUN go mod download
RUN go build -o main .

# CGO를 활성화합니다.
ENV CGO_ENABLED=1

# 서버 실행
CMD ["./main"]