# Go 환경 이미지를 사용합니다.
FROM golang:1.22-alpine

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# CGO를 활성화하고 필요한 패키지(gcc, musl-dev, git)를 설치합니다.
ENV CGO_ENABLED=1
RUN apk add --no-cache gcc musl-dev git

# app 폴더 안에 있는 go.mod 파일을 복사합니다.
COPY app/go.mod app/go.sum ./

# 필요한 모듈을 다운로드하고 go.sum 파일을 업데이트합니다.
RUN go mod download

# 소스 코드 전체를 복사합니다. app 폴더 내의 모든 파일과 폴더를 컨테이너의 /app 디렉토리로 복사합니다.
COPY app/ ./
COPY main.go .

# 애플리케이션 빌드
RUN go mod tidy
RUN go build -o main .

# 서버 실행
CMD ["./main"]
