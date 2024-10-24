package routers

import (
	"github.com/astaxie/beego"
	"github.com/jo1013/to_dolist/beego/controllers"
)

func init() { // Init() 대신 init() 함수 사용
	beego.Router("/api/todos", &controllers.TodoController{}, "get:GetAll;post:Post")
	beego.Router("/api/todos/:id", &controllers.TodoController{}, "get:GetOne;put:Put;delete:Delete")
}
