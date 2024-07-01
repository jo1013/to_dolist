
# To-Do List Application

This To-Do List application is built using the Beego framework with Docker, providing a simple API to manage to-do tasks.

## Project Structure

The project has the following structure:

```
.
├── Dockerfile
├── main.go
└── routers
    └── routers.go
```

- **Dockerfile**: Contains all the commands needed to assemble the Docker image.
- **main.go**: The entry point of the application that sets up the Beego web server.
- **routers/routers.go**: Defines the routes and associated controllers for the application.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

- Docker
- Go (if you want to run without Docker)

### Running with Docker

1. **Build the Docker Image**
   Navigate to the root directory of the project and run:
   ```bash
   docker build -t todoapp .
   ```

2. **Run the Container**
   After the image is built, you can run it using:
   ```bash
   docker run -p 8080:8080 todoapp
   ```

   This command starts the application and makes it accessible at `http://localhost:8080`.

### Development

- To add new routes or modify the application, edit the `routers.go` and `main.go` files as needed.
- Rebuild the Docker image and restart the container to see the changes.

## API Endpoints

- `GET /api/tasks`: Retrieves a list of tasks.
- `POST /api/task`: Adds a new task.
- `GET /api/task/:id`: Retrieves a task by ID.
- `PUT /api/task/:id`: Updates a task.
- `DELETE /api/task/:id`: Deletes a task.

## Contributing

Contributions to this project are welcome. Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## 사용 방법

Docker 컨테이너를 실행하여 잔액 조회를 시작합니다. 프로젝트 디렉토리 내에서 다음 명령어를 실행하세요:
```bash
docker run -v "$(pwd)/app":/app golang:1.22-alpine sh -c "cd /app && go mod tidy && GO111MODULE=on go clean -modcache && go build -o main . && ./main"
```
-----------------------------------------------------------------------------------------------------------------------------------------------------------


# To-Do List 애플리케이션

이 To-Do List 애플리케이션은 Beego 프레임워크와 Docker를 사용하여 빌드되었으며, 할 일(Task)을 관리할 수 있는 간단한 API를 제공합니다.

## 프로젝트 구조

프로젝트는 다음과 같은 구조를 가지고 있습니다:

```
.
├── Dockerfile
├── main.go
└── routers
    └── routers.go
```

- **Dockerfile**: Docker 이미지를 구성하는 데 필요한 모든 명령어가 포함되어 있습니다.
- **main.go**: Beego 웹 서버를 설정하는 애플리케이션의 진입점입니다.
- **routers/routers.go**: 애플리케이션의 라우트 및 관련 컨트롤러를 정의합니다.

## 시작하기

이 프로젝트를 시작하려면 다음 단계를 따르세요:

### 전제 조건

- Docker
- Go (Docker 없이 실행하려는 경우)

### Docker로 실행하기

1. **Docker 이미지 빌드**
   프로젝트의 루트 디렉토리로 이동하여 다음 명령어를 실행합니다:
   ```bash
   docker build -t todoapp .
   ```

2. **컨테이너 실행**
   이미지가 빌드된 후, 다음 명령어를 사용하여 컨테이너를 실행할 수 있습니다:
   ```bash
   docker run -p 8080:8080 todoapp
   ```

   이 명령어는 애플리케이션을 시작하고 `http://localhost:8080`에서 접근할 수 있게 합니다.

### 개발

- 새로운 라우트를 추가하거나 애플리케이션을 수정하려면 `routers.go`와 `main.go` 파일을 편집하세요.
- Docker 이미지를 다시 빌드하고 컨테이너를 재시작하여 변경 사항을 반영하세요.

## API 엔드포인트

- `GET /api/tasks`: 할 일 목록을 가져옵니다.
- `POST /api/task`: 새로운 할 일을 추가합니다.
- `GET /api/task/:id`: ID로 할 일을 가져옵니다.
- `PUT /api/task/:id`: 할 일을 업데이트합니다.
- `DELETE /api/task/:id`: 할 일을 삭제합니다.

## 기여

이 프로젝트에 대한 기여를 환영합니다. 리포지토리를 포크하고 풀 리퀘스트를 제출해 주세요.

## 라이선스

이 프로젝트는 MIT 라이선스에 따라 라이선스가 부여됩니다 - 자세한 내용은 LICENSE 파일을 참조하세요.

## 사용 방법

Docker 컨테이너를 실행하여 애플리케이션을 시작합니다. 프로젝트 디렉토리 내에서 다음 명령어를 실행하세요:
```bash
docker run -v "$(pwd)/app":/app golang:1.22-alpine sh -c "cd /app && go mod tidy && GO111MODULE=on go clean -modcache && go build -o main . && ./main"
```

이렇게 하면 애플리케이션이 빌드되고 실행됩니다.