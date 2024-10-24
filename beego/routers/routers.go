// routers/router.go
package routers

import (
	"todoapp/controllers"

	"github.com/astaxie/beego"

	"github.com/jo1013/to_dolist/beego/controllers"
	"github.com/jo1013/to_dolist/beego/database"
)

func Init() {
	beego.Router("/api/todos", &controllers.TodoController{}, "get:GetAll;post:Post")
}

func main() {
	database.Init()
	routers.Init()
	beego.Run()
}
