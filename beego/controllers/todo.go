// controllers/todo.go
package controllers

import (
	"encoding/json"

	"github.com/jo1013/to_dolist/beego/models"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

type TodoController struct {
	beego.Controller
}

func (c *TodoController) GetAll() {
	o := orm.NewOrm()
	var todos []*models.Todo

	_, err := o.QueryTable("todo").All(&todos)
	if err != nil {
		c.Data["json"] = map[string]interface{}{
			"error": err.Error(),
		}
	} else {
		c.Data["json"] = todos
	}
	c.ServeJSON()
}

func (c *TodoController) Post() {
	var todo models.Todo
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &todo)
	if err != nil {
		c.Data["json"] = map[string]interface{}{
			"error": err.Error(),
		}
		c.ServeJSON()
		return
	}

	o := orm.NewOrm()
	_, err = o.Insert(&todo)
	if err != nil {
		c.Data["json"] = map[string]interface{}{
			"error": err.Error(),
		}
	} else {
		c.Data["json"] = todo
	}
	c.ServeJSON()
}
