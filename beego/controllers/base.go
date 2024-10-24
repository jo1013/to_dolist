package controllers

import (
	"github.com/astaxie/beego"
)

type BaseController struct {
	beego.Controller
}

func (c *BaseController) Prepare() {
	c.Ctx.Output.Header("Access-Control-Allow-Origin", "http://localhost:3000")
	c.Ctx.Output.Header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
	c.Ctx.Output.Header("Access-Control-Allow-Headers", "Origin,Content-Type")
	c.Ctx.Output.Header("Access-Control-Allow-Credentials", "true")

	if c.Ctx.Request.Method == "OPTIONS" {
		c.Ctx.Output.SetStatus(200)
		c.StopRun()
	}
}
