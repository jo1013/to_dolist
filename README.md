
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