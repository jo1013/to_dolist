package main

import (
	"github.com/astaxie/beego"
	"github.com/jo1013/to_dolist/beego/database"
	_ "github.com/jo1013/to_dolist/beego/routers"
)

func init() {
	beego.BConfig.CopyRequestBody = true
	beego.BConfig.WebConfig.AutoRender = false
}

func main() {
	database.Init()
	beego.Run()
}
