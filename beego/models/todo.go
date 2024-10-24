// models/todo.go
package models

import (
	"github.com/astaxie/beego/orm"
)

type Todo struct {
	Id          int    `json:"id" orm:"auto"`
	Title       string `json:"title" orm:"size(100)"`
	Description string `json:"description" orm:"type(text)"`
	Completed   bool   `json:"completed" orm:"default(false)"`
}

func init() {
	orm.RegisterModel(new(Todo))
}
