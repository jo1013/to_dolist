//beego/main.go

package main

import (
	"github.com/beego/beego/v2/server/web"
	"github.com/beego/beego/v2/server/web/context"
	"github.com/jo1013/to_dolist/beego/database"
	_ "github.com/jo1013/to_dolist/beego/routers"
)

func init() {
	web.BConfig.CopyRequestBody = true
	web.BConfig.WebConfig.AutoRender = false

	// CORS 설정
	web.InsertFilter("*", web.BeforeRouter, func(ctx *context.Context) {
		ctx.Output.Header("Access-Control-Allow-Origin", "http://210.96.118.168:3005")
		ctx.Output.Header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
		ctx.Output.Header("Access-Control-Allow-Headers", "Origin,Content-Type,Accept,Authorization")
		ctx.Output.Header("Access-Control-Allow-Credentials", "true")

		if ctx.Input.Method() == "OPTIONS" {
			ctx.Output.SetStatus(200)
			ctx.ResponseWriter.WriteHeader(200)
			return
		}
	})
}

func main() {
	if err := database.Init(); err != nil {
		panic(err)
	}
	web.Run()
}
