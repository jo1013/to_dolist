package controllers

import (
	"encoding/json"

	"github.com/beego/beego/v2/server/web"
)

type MainController struct {
	web.Controller
}

type Todo struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
}

func (c *MainController) GetTodos() {
	// 실제 데이터베이스 조회 로직으로 대체해야 합니다
	todos := []Todo{
		{ID: 1, Title: "First Todo", Done: false},
	}
	c.Data["json"] = todos
	c.ServeJSON()
}

func (c *MainController) PostTodo() {
	var todo Todo
	json.Unmarshal(c.Ctx.Input.RequestBody, &todo)
	// 실제 데이터베이스 저장 로직으로 대체해야 합니다
	todo.ID = 2 // 예시 ID
	c.Data["json"] = todo
	c.ServeJSON()
}

func (c *MainController) DeleteTodo() {
	// 실제 데이터베이스 삭제 로직으로 대체해야 합니다
	c.Data["json"] = map[string]interface{}{"success": true}
	c.ServeJSON()
}
