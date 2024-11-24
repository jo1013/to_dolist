package controllers

import (
	"github.com/beego/beego/v2/server/web"
)

type BaseController struct {
	web.Controller // web.beego.Controller가 아닌 web.Controller 사용
}

func (c *BaseController) Prepare() {
	c.Ctx.Output.Header("Access-Control-Allow-Origin", "http://localhost:3005")
	c.Ctx.Output.Header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
	c.Ctx.Output.Header("Access-Control-Allow-Headers", "Origin,Content-Type")
	c.Ctx.Output.Header("Access-Control-Allow-Credentials", "true")

	if c.Ctx.Request.Method == "OPTIONS" {
		c.Ctx.Output.SetStatus(200)
		c.StopRun()
	}
}
