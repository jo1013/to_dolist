# # Build stage
# FROM golang:1.22-alpine AS builder

# # 필요한 패키지를 설치합니다.
# RUN apk add --no-cache git gcc musl-dev

# # 작업 디렉토리를 설정합니다.
# WORKDIR /app

# # 소스 코드를 복사합니다.
# COPY . .

# # go.mod 파일이 없다면 초기화합니다.
# RUN if [ ! -f go.mod ]; then go mod init github.com/jo1013/to_dolist/beego; fi

# # 의존성을 다운로드하고 정리합니다.
# RUN go mod tidy

# # 애플리케이션을 빌드합니다.
# RUN CGO_ENABLED=1 go build -o main .

# # Final stage
# FROM alpine:latest

# WORKDIR /root/

# # 빌드된 실행 파일을 복사합니다.
# COPY --from=builder /app/main .

# # 실행 권한을 부여합니다.
# RUN chmod +x main
# RUN go build -o main .
# EXPOSE 8080
# # 서버 실행
# CMD ["./main"]

# Build stage
FROM golang:1.22-alpine AS builder

# 필요한 패키지를 설치합니다.
RUN apk add --no-cache git gcc musl-dev

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# 소스 코드를 복사합니다.
COPY . .

# go.mod 파일이 없다면 초기화합니다.
RUN if [ ! -f go.mod ]; then go mod init github.com/jo1013/to_dolist/beego; fi

# 의존성을 다운로드하고 정리합니다.
RUN go mod tidy

# 애플리케이션을 빌드합니다.
RUN CGO_ENABLED=1 go build -o main .

# Final stage
FROM alpine:latest

WORKDIR /root/

# 빌드된 실행 파일을 복사합니다.
COPY --from=builder /app/main .

# 실행 권한을 부여합니다.
RUN chmod +x ./main

EXPOSE 8080

# 서버 실행
CMD ["./main"]