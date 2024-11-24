// beego/routers/routers.go
package routers

import (
	"github.com/beego/beego/v2/server/web"
	"github.com/jo1013/to_dolist/beego/controllers"
)

func init() {
	web.Router("/api/todos", &controllers.TodoController{}, "get:GetAll;post:Post")
	web.Router("/api/todos/:id", &controllers.TodoController{}, "get:GetOne;put:Put;delete:Delete")
}
