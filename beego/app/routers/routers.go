// routers/routers.go
package routers

import (
	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &MainController{})
}
