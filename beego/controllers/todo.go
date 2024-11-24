// beego/controllers/todo.go
package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"strconv"

	"github.com/beego/beego/v2/client/orm" // orm도 v2로 변경
	"github.com/jo1013/to_dolist/beego/models"
)

type TodoController struct {
	BaseController // beego.Controller 대신 BaseController 상속
}

// GetAll retrieves all todos
func (c *TodoController) GetAll() {
	var todos []models.Todo
	o := orm.NewOrm()
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

// GetOne retrieves a single todo
func (c *TodoController) GetOne() {
	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.Atoi(idStr)

	todo := models.Todo{Id: id}
	o := orm.NewOrm()
	err := o.Read(&todo)

	if err == orm.ErrNoRows {
		c.Data["json"] = map[string]interface{}{
			"error": "Todo not found",
		}
	} else if err != nil {
		c.Data["json"] = map[string]interface{}{
			"error": err.Error(),
		}
	} else {
		c.Data["json"] = todo
	}
	c.ServeJSON()
}

// Post creates a new todo

func (c *TodoController) Post() {
	// 요청 바디 직접 읽기
	body, err := ioutil.ReadAll(c.Ctx.Request.Body)
	if err != nil {
		fmt.Printf("Error reading body: %v\n", err)
		c.Data["json"] = map[string]interface{}{
			"error": "Failed to read request body: " + err.Error(),
		}
		c.ServeJSON()
		return
	}

	fmt.Printf("Raw body: %s\n", string(body))

	// JSON 파싱
	var todo models.Todo
	err = json.Unmarshal(body, &todo)
	if err != nil {
		fmt.Printf("Error parsing JSON: %v\n", err)
		c.Data["json"] = map[string]interface{}{
			"error":         "Failed to parse JSON: " + err.Error(),
			"received_body": string(body),
		}
		c.ServeJSON()
		return
	}

	// 유효성 검사
	if todo.Title == "" {
		c.Data["json"] = map[string]interface{}{
			"error": "Title is required",
		}
		c.ServeJSON()
		return
	}

	// 데이터베이스에 저장
	o := orm.NewOrm()
	id, err := o.Insert(&todo)
	if err != nil {
		c.Data["json"] = map[string]interface{}{
			"error": "Failed to create todo: " + err.Error(),
		}
	} else {
		todo.Id = int(id)
		c.Data["json"] = todo
	}
	c.ServeJSON()
}

// Put updates an existing todo
func (c *TodoController) Put() {
	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.Atoi(idStr)

	var todo models.Todo
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &todo)
	if err != nil {
		c.Data["json"] = map[string]interface{}{
			"error": "Failed to parse JSON: " + err.Error(),
		}
		c.ServeJSON()
		return
	}

	todo.Id = id
	o := orm.NewOrm()
	if num, err := o.Update(&todo); err != nil {
		c.Data["json"] = map[string]interface{}{
			"error": "Failed to update todo: " + err.Error(),
		}
	} else if num == 0 {
		c.Data["json"] = map[string]interface{}{
			"error": "Todo not found",
		}
	} else {
		c.Data["json"] = todo
	}
	c.ServeJSON()
}

// Delete removes a todo
func (c *TodoController) Delete() {
	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.Atoi(idStr)

	todo := models.Todo{Id: id}
	o := orm.NewOrm()
	if num, err := o.Delete(&todo); err != nil {
		c.Data["json"] = map[string]interface{}{
			"error": "Failed to delete todo: " + err.Error(),
		}
	} else if num == 0 {
		c.Data["json"] = map[string]interface{}{
			"error": "Todo not found",
		}
	} else {
		c.Data["json"] = map[string]interface{}{
			"message": "Todo deleted successfully",
		}
	}
	c.ServeJSON()
}
