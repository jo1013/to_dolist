package routers

import (
	"yourapp/controllers" // 컨트롤러 패키지 경로를 수정하세요

	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/api/tasks", &controllers.TaskController{}, "get:ListTasks")
	beego.Router("/api/task", &controllers.TaskController{}, "post:AddTask")
	beego.Router("/api/task/:id", &controllers.TaskController{}, "get:GetTask;put:UpdateTask;delete:DeleteTask")
}
