/*
to_dolist/beego/routers/routers.go
*/
package routers

import (
	"github.com/astaxie/beego"
	"github.com/jo1013/to_dolist/beego/controllers"
)

func init() {
	beego.Router("/", &controllers.MainController{})
}
